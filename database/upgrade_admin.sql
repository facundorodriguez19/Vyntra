USE vyntra;

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_admin TINYINT(1) NOT NULL DEFAULT 0 AFTER password_hash;

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
  public_token VARCHAR(64) NULL,
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
  KEY orders_user_index (user_id),
  KEY orders_created_at_index (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS public_token VARCHAR(64) NULL AFTER user_id,
  ADD COLUMN IF NOT EXISTS currency CHAR(3) NOT NULL DEFAULT 'ars' AFTER total,
  ADD COLUMN IF NOT EXISTS payment_status ENUM('unpaid', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'unpaid' AFTER currency,
  ADD COLUMN IF NOT EXISTS fulfillment_status ENUM('received', 'preparing', 'packed', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'received' AFTER payment_status,
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id VARCHAR(255) NULL AFTER fulfillment_status,
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255) NULL AFTER stripe_checkout_session_id,
  ADD COLUMN IF NOT EXISTS paid_at DATETIME NULL AFTER status,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

UPDATE orders SET public_token = CONCAT('legacy-', id) WHERE public_token IS NULL OR public_token = '';

ALTER TABLE orders
  MODIFY public_token VARCHAR(64) NOT NULL;

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
  KEY order_items_order_index (order_id),
  KEY order_items_product_index (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS product_slug VARCHAR(160) NULL AFTER product_id;

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
  KEY site_visits_user_index (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ejecutar una vez si ya tenes usuario creado y queres hacerlo admin:
-- UPDATE users SET is_admin = 1 WHERE email = 'tu@email.com';
