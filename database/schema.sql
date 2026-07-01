CREATE DATABASE IF NOT EXISTS vyntra
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vyntra;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(160) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(140) NOT NULL,
  slug VARCHAR(160) NOT NULL,
  category VARCHAR(80) NOT NULL DEFAULT 'Ropa',
  description TEXT NULL,
  price DECIMAL(12,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  image_front VARCHAR(255) NULL,
  image_hover VARCHAR(255) NULL,
  status ENUM('active', 'draft', 'archived') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY products_slug_unique (slug),
  KEY products_category_index (category),
  KEY products_status_index (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  public_token VARCHAR(64) NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(160) NOT NULL,
  customer_whatsapp VARCHAR(60) NOT NULL,
  message TEXT NULL,
  total DECIMAL(12,2) NOT NULL DEFAULT 0,
  currency CHAR(3) NOT NULL DEFAULT 'ars',
  payment_status ENUM('unpaid', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'unpaid',
  fulfillment_status ENUM('received', 'preparing', 'packed', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'received',
  stripe_checkout_session_id VARCHAR(255) NULL,
  stripe_payment_intent_id VARCHAR(255) NULL,
  status ENUM('new', 'contacted', 'paid', 'shipped', 'cancelled') NOT NULL DEFAULT 'new',
  paid_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY orders_public_token_unique (public_token),
  UNIQUE KEY orders_stripe_session_unique (stripe_checkout_session_id),
  KEY orders_user_index (user_id),
  KEY orders_created_at_index (created_at),
  CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NULL,
  product_slug VARCHAR(160) NULL,
  product_name VARCHAR(160) NOT NULL,
  variant_label VARCHAR(160) NULL,
  unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  CONSTRAINT order_items_order_fk FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT order_items_product_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_visits (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  session_id VARCHAR(128) NULL,
  page_title VARCHAR(180) NULL,
  path VARCHAR(255) NOT NULL,
  referrer VARCHAR(255) NULL,
  user_agent VARCHAR(255) NULL,
  ip_address VARCHAR(45) NULL,
  visited_date DATE NOT NULL,
  visited_hour TINYINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY site_visits_date_index (visited_date),
  KEY site_visits_hour_index (visited_hour),
  KEY site_visits_user_index (user_id),
  CONSTRAINT site_visits_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO products (name, slug, category, description, price, stock, image_front, image_hover, status) VALUES
('Not Your Average Indigo', 'not-your-average-indigo', 'Ropa', 'Fit oversized, color indigo y frase frontal tonal.', 109990, 12, 'images/products/not-average-indigo-front.jpg', 'images/products/not-average-indigo-hover.jpg', 'active'),
('Camisa Oversized Blanca', 'camisa-oversized-blanca', 'Ropa', 'Logo VYNTRA al frente, caida amplia y tacto premium.', 99990, 18, 'images/products/camisa-oversized-blanca-front.jpg', 'images/products/camisa-oversized-blanca-hover.jpg', 'active'),
('Signature Grey', 'signature-grey', 'Ropa', 'Firma frontal en tono pizarra con corte de hombro bajo.', 99990, 10, 'images/products/signature-grey-front.jpg', 'images/products/signature-grey-hover.jpg', 'active'),
('Silent Power Blanco', 'silent-power-blanco', 'Ropa', 'Grafica dorsal, frente limpio y presencia minimalista.', 104990, 8, 'images/products/silent-power-blanco-front.jpg', 'images/products/silent-power-blanco-hover.jpg', 'active'),
('Signature Back Indigo', 'signature-back-indigo', 'Ropa', 'Firma grande en espalda, edicion limitada de temporada.', 112990, 7, 'images/products/signature-back-indigo-front.jpg', 'images/products/signature-back-indigo-hover.jpg', 'active'),
('Hoodie Silent Power', 'hoodie-silent-power', 'Ropa', 'Hoodie negro con detalles dorados y etiqueta inferior.', 159990, 6, 'images/products/hoodie-silent-power-front.jpg', 'images/products/hoodie-silent-power-hover.jpg', 'active'),
('Dije Pegasus Gold', 'dije-pegasus-gold', 'Accesorios', 'Dije dorado con emblema Pegasus para cadenas finas o kits signature.', 34990, 20, 'images/products/dije-pegasus-front.jpg', 'images/products/dije-pegasus-hover.jpg', 'active'),
('Llavero Signature', 'llavero-signature', 'Accesorios', 'Pieza metalica negra con borde dorado y acabado premium.', 19990, 30, 'images/products/llavero-signature-front.jpg', 'images/products/llavero-signature-hover.jpg', 'active'),
('Perfume Solar', 'perfume-solar', 'Accesorios', 'Notas calidas, limpias y ambaradas para looks claros o de dia.', 49990, 15, 'images/products/perfume-solar-front.jpg', 'images/products/perfume-solar-hover.jpg', 'active'),
('Perfume Intenso', 'perfume-intenso', 'Accesorios', 'Aroma nocturno con salida especiada y fondo amaderado.', 54990, 15, 'images/products/perfume-intenso-front.jpg', 'images/products/perfume-intenso-hover.jpg', 'active'),
('Cadena Silent', 'cadena-silent', 'Accesorios', 'Cadena minimalista en tono oscuro con cierre dorado.', 29990, 24, 'images/products/cadena-silent-front.jpg', 'images/products/cadena-silent-hover.jpg', 'active'),
('Tote Drop', 'tote-drop', 'Accesorios', 'Bolso negro estructurado con emblema dorado y costuras reforzadas.', 39990, 14, 'images/products/tote-drop-front.jpg', 'images/products/tote-drop-hover.jpg', 'active'),
('Kit Indigo', 'kit-indigo', 'Kits', 'Remera Not Your Average, cadena Silent, dije Pegasus y packaging rigido.', 159990, 6, 'images/products/not-average-indigo-front.jpg', 'images/products/not-average-indigo-hover.jpg', 'active'),
('Kit Blanco', 'kit-blanco', 'Kits', 'Camisa blanca, llavero signature y perfume Solar.', 149990, 5, 'images/products/camisa-oversized-blanca-front.jpg', 'images/products/camisa-oversized-blanca-hover.jpg', 'active'),
('Kit Signature', 'kit-signature', 'Kits', 'Remera gris, cadena y perfume Intenso.', 139990, 5, 'images/products/signature-grey-front.jpg', 'images/products/signature-grey-hover.jpg', 'active'),
('Kit Silent Power', 'kit-silent-power', 'Kits', 'Hoodie negro, dije dorado, tote y caja premium.', 189990, 4, 'images/products/hoodie-silent-power-front.jpg', 'images/products/hoodie-silent-power-hover.jpg', 'active')
ON DUPLICATE KEY UPDATE
  category = VALUES(category),
  description = VALUES(description),
  price = VALUES(price),
  stock = VALUES(stock),
  image_front = VALUES(image_front),
  image_hover = VALUES(image_hover),
  status = VALUES(status);
