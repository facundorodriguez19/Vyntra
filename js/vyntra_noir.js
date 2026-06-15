const menuButton = document.querySelector('.nav-ham');
const mobileMenu = document.querySelector('.mob');
const cartButtons = document.querySelectorAll('.nav-cta');
const cartCounts = document.querySelectorAll('.cart-count');
const scrollProgress = document.createElement('div');
const productModal = document.createElement('div');
const cartDrawer = document.createElement('div');
const ORDER_EMAIL = 'facundo.rodriguez.pro@gmail.com';
const CART_STORAGE_KEY = 'vyntra-cart-v1';
let cart = [];
let activeModalProduct = null;
let lastFocusedElement = null;

scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

cartDrawer.className = 'cart-drawer';
cartDrawer.setAttribute('aria-hidden', 'true');
cartDrawer.innerHTML = `
  <div class="cart-backdrop" data-cart-close></div>
  <aside class="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
    <button class="cart-close" type="button" aria-label="Cerrar carrito" data-cart-close>×</button>
    <div class="cart-head">
      <span class="sec-tag">Pedido por email</span>
      <h2 id="cart-title">Carrito</h2>
      <p>Completá tus datos y se abrirá un email con el pedido listo para enviar. VYNTRA coordina después por WhatsApp.</p>
    </div>
    <div class="cart-items"></div>
    <p class="cart-empty">Tu carrito está vacío.</p>
    <div class="cart-summary">
      <span>Total</span>
      <strong class="cart-total">$0</strong>
    </div>
    <form class="cart-form">
      <label>Nombre<input type="text" name="name" placeholder="Tu nombre" required></label>
      <label>WhatsApp<input type="tel" name="whatsapp" placeholder="+54 9 11 1234 5678" required></label>
      <label>Email<input type="email" name="email" placeholder="tu@email.com" required></label>
      <label>Mensaje<textarea name="message" rows="4" placeholder="Talle, color, ciudad o aclaración del pedido"></textarea></label>
      <p class="cart-status" role="status" aria-live="polite"></p>
      <button class="btn-outline-g cart-submit" type="submit">Enviar pedido por email</button>
    </form>
  </aside>
`;
document.body.appendChild(cartDrawer);

productModal.className = 'product-modal';
productModal.setAttribute('aria-hidden', 'true');
productModal.innerHTML = `
  <div class="product-modal-backdrop" data-modal-close></div>
  <div class="product-modal-panel" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
    <button class="product-modal-close" type="button" aria-label="Cerrar detalle" data-modal-close>×</button>
    <div class="product-modal-image"><img alt=""></div>
    <div class="product-modal-body">
      <span class="product-modal-kicker"></span>
      <h2 class="product-modal-title" id="product-modal-title"></h2>
      <p class="product-modal-desc"></p>
      <div class="product-modal-price"></div>
      <button class="btn-outline-g modal-add" type="button">Agregar al carrito</button>
    </div>
  </div>
`;
document.body.appendChild(productModal);

const modalImage = productModal.querySelector('.product-modal-image img');
const modalKicker = productModal.querySelector('.product-modal-kicker');
const modalTitle = productModal.querySelector('.product-modal-title');
const modalDesc = productModal.querySelector('.product-modal-desc');
const modalPrice = productModal.querySelector('.product-modal-price');
const modalAdd = productModal.querySelector('.modal-add');
const modalOptions = document.createElement('div');
const cartItemsEl = cartDrawer.querySelector('.cart-items');
const cartEmptyEl = cartDrawer.querySelector('.cart-empty');
const cartTotalEl = cartDrawer.querySelector('.cart-total');
const cartForm = cartDrawer.querySelector('.cart-form');
const cartStatusEl = cartDrawer.querySelector('.cart-status');

modalOptions.className = 'product-modal-options';
modalPrice.insertAdjacentElement('afterend', modalOptions);

menuButton?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mob a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const parsePrice = (priceText) => {
  const value = Number(String(priceText || '').replace(/[^\d]/g, ''));
  return Number.isFinite(value) ? value : 0;
};

const formatPrice = (value) => `$${Number(value || 0).toLocaleString('es-AR')}`;

const escapeHTML = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const PRODUCT_VARIANTS = [
  {
    match: /not your average|indigo/i,
    images: ['images/WhatsApp Image 2026-05-29 at 10.07.05.jpeg', 'images/WhatsApp Image 2026-05-29 at 10.07.05 (1).jpeg', 'images/WhatsApp Image 2026-05-29 at 10.07.06 (1).jpeg'],
    colors: [{ name: 'Indigo', value: '#24364f' }, { name: 'Blanco', value: '#ebe6dc' }, { name: 'Grafito', value: '#2d2d2d' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    match: /camisa|blanca|silent power blanco/i,
    images: ['images/WhatsApp Image 2026-05-29 at 10.07.05 (1).jpeg', 'images/WhatsApp Image 2026-05-29 at 10.07.06 (2).jpeg', 'images/WhatsApp Image 2026-05-29 at 10.07.07.jpeg'],
    colors: [{ name: 'Blanco', value: '#ebe6dc' }, { name: 'Indigo', value: '#24364f' }, { name: 'Pizarra', value: '#6d6b67' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    match: /signature|grey/i,
    images: ['images/WhatsApp Image 2026-05-29 at 10.07.07.jpeg', 'images/WhatsApp Image 2026-05-29 at 10.07.06.jpeg', 'images/WhatsApp Image 2026-05-29 at 10.07.06 (3).jpeg'],
    colors: [{ name: 'Grey', value: '#6f6b65' }, { name: 'Negro', value: '#101010' }, { name: 'Arena', value: '#bfa06a' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    match: /hoodie|silent power/i,
    images: ['images/vytra_hero.png', 'images/vytra_hero_generic.png', 'images/WhatsApp Image 2026-05-29 at 10.07.06 (3).jpeg'],
    colors: [{ name: 'Negro', value: '#0c0c0c' }, { name: 'Dorado', value: '#BFA06A' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    match: /dije|cadena|llavero/i,
    colors: [{ name: 'Gold', value: '#BFA06A' }, { name: 'Noir', value: '#111111' }],
    sizes: ['OS']
  },
  {
    match: /perfume/i,
    colors: [{ name: 'Solar', value: '#d5b169' }, { name: 'Intenso', value: '#2a211d' }],
    sizes: ['50ML', '100ML']
  },
  {
    match: /tote|kit/i,
    colors: [{ name: 'Noir', value: '#111111' }, { name: 'Natural', value: '#d6c7ad' }],
    sizes: ['OS']
  }
];

const getEnhancement = (title) => PRODUCT_VARIANTS.find((entry) => entry.match.test(title || '')) || {
  colors: [{ name: 'Noir', value: '#111111' }, { name: 'Gold', value: '#BFA06A' }],
  sizes: ['OS']
};

const variantSuffix = (product) => [product.selectedColor, product.selectedSize].filter(Boolean).join(' / ');

const productId = (title) => String(title || 'producto')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const loadCart = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const saveCart = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

const cartQuantity = () => cart.reduce((sum, item) => sum + item.quantity, 0);
const cartTotal = () => cart.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);

const setCartStatus = (message = '', tone = '') => {
  if (!cartStatusEl) return;
  cartStatusEl.textContent = message;
  cartStatusEl.dataset.tone = tone;
};

const updateCartCount = () => {
  const quantity = cartQuantity();
  cartCounts.forEach((count) => {
    count.textContent = String(quantity);
  });
};

const renderCart = () => {
  updateCartCount();
  cartTotalEl.textContent = formatPrice(cartTotal());
  cartEmptyEl.hidden = cart.length > 0;
  cartItemsEl.innerHTML = cart.map((item) => {
    const itemTitle = escapeHTML(item.title);
    return `
    <article class="cart-item" data-cart-id="${escapeHTML(item.id)}">
      <img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}">
      <div class="cart-item-main">
        <span>${escapeHTML(item.kicker)}</span>
        <h3>${itemTitle}</h3>
        ${item.variantLabel ? `<p>${escapeHTML(item.variantLabel)}</p>` : ''}
        <p>${escapeHTML(item.description)}</p>
        <strong>${formatPrice(item.priceValue)}</strong>
      </div>
      <div class="cart-qty">
        <button type="button" aria-label="Restar ${itemTitle}" data-cart-decrease>-</button>
        <span>${item.quantity}</span>
        <button type="button" aria-label="Sumar ${itemTitle}" data-cart-increase>+</button>
        <button class="cart-remove" type="button" data-cart-remove>Quitar</button>
      </div>
    </article>
    `;
  }).join('');
};

const addToCart = (product, options = {}) => {
  const cartProduct = {
    ...product,
    id: [product.id, product.selectedColor, product.selectedSize].filter(Boolean).join('-'),
    variantLabel: variantSuffix(product)
  };
  const existing = cart.find((item) => item.id === cartProduct.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...cartProduct, quantity: 1 });
  }

  saveCart();
  renderCart();
  setCartStatus(`${cartProduct.title} se agregó al pedido.`, 'ok');
  if (options.openCart) openCartDrawer();
};

const updateCartItem = (id, delta) => {
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== id);
  }
  saveCart();
  renderCart();
};

const removeCartItem = (id) => {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
};

function openCartDrawer() {
  lastFocusedElement = document.activeElement;
  cartDrawer.classList.add('is-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  cartDrawer.querySelector('.cart-close')?.focus();
}

function closeCartDrawer() {
  cartDrawer.classList.remove('is-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus?.();
}

const buildOrderEmail = (customer) => {
  const lines = [
    'Nuevo pedido VYNTRA',
    '',
    'Datos del cliente',
    `Nombre: ${customer.name}`,
    `WhatsApp: ${customer.whatsapp}`,
    `Email: ${customer.email}`,
    customer.message ? `Mensaje: ${customer.message}` : 'Mensaje: -',
    '',
    'Productos'
  ];

  cart.forEach((item) => {
    lines.push(`- ${item.quantity} x ${item.title} | ${formatPrice(item.priceValue)} c/u | Subtotal ${formatPrice(item.priceValue * item.quantity)}`);
    if (item.variantLabel) lines.push(`  Variante: ${item.variantLabel}`);
    if (item.description) lines.push(`  ${item.description}`);
  });

  lines.push('', `Total: ${formatPrice(cartTotal())}`, '', 'Responder al cliente por WhatsApp para coordinar pago, talle, color, envío o retiro.');
  return lines.join('\n');
};

cart = loadCart();
renderCart();

const getProductData = (card, image) => {
  const title = card.querySelector('.catalog-body h3, .prod-name, .kit-name, .feature-panel h2, .feature-panel h3, .ed-h2')?.textContent?.trim() || image.alt || 'Producto VYNTRA';
  const description = card.querySelector('.catalog-body p, .prod-desc, .kit-items, .feature-panel p, .ed-body')?.textContent?.trim() || 'Pieza seleccionada de la colección VYNTRA.';
  const price = card.querySelector('.catalog-bottom span, .prod-price, .kit-price, .feature-price, .ed-price')?.textContent?.trim() || '';
  const kicker = card.querySelector('.catalog-kicker, .prod-tag, .kit-season, .sec-tag, .ed-overline')?.textContent?.trim() || 'Detalle de producto';
  const enhancement = getEnhancement(title);
  const selectedColor = card.dataset.selectedColor || enhancement.colors?.[0]?.name || '';
  const selectedSize = card.dataset.selectedSize || enhancement.sizes?.[0] || '';
  return {
    id: productId(title),
    title,
    description,
    price,
    priceValue: parsePrice(price),
    kicker,
    src: image.currentSrc || image.src,
    alt: image.alt || title,
    colors: enhancement.colors || [],
    sizes: enhancement.sizes || [],
    selectedColor,
    selectedSize
  };
};

const renderChoiceButton = (value, activeValue, className, extra = '') => `
  <button class="${className}${value === activeValue ? ' is-active' : ''}" type="button" ${extra}>${escapeHTML(value)}</button>
`;

const renderModalOptions = (data) => {
  modalOptions.innerHTML = '';

  if (data.colors?.length) {
    const swatches = data.colors.map((color) => `
      <button class="product-swatch${color.name === data.selectedColor ? ' is-active' : ''}" type="button" aria-label="${escapeHTML(color.name)}" data-modal-color="${escapeHTML(color.name)}" style="--swatch:${escapeHTML(color.value)}"></button>
    `).join('');
    modalOptions.insertAdjacentHTML('beforeend', `
      <div class="product-modal-option">
        <span class="product-modal-option-label">Color: ${escapeHTML(data.selectedColor)}</span>
        <div class="product-swatches">${swatches}</div>
      </div>
    `);
  }

  if (data.sizes?.length) {
    const sizes = data.sizes.map((size) => renderChoiceButton(size, data.selectedSize, 'product-size', `data-modal-size="${escapeHTML(size)}"`)).join('');
    modalOptions.insertAdjacentHTML('beforeend', `
      <div class="product-modal-option">
        <span class="product-modal-option-label">Talle: ${escapeHTML(data.selectedSize)}</span>
        <div class="product-sizes">${sizes}</div>
      </div>
    `);
  }
};

const openProductModal = (data) => {
  lastFocusedElement = document.activeElement;
  activeModalProduct = data;
  modalImage.src = data.src;
  modalImage.alt = data.alt;
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
  modalPrice.textContent = data.price;
  modalPrice.hidden = !data.price;
  renderModalOptions(data);
  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  productModal.querySelector('.product-modal-close')?.focus();
};

modalOptions.addEventListener('click', (event) => {
  if (!activeModalProduct) return;

  const colorButton = event.target.closest('[data-modal-color]');
  const sizeButton = event.target.closest('[data-modal-size]');
  if (!colorButton && !sizeButton) return;

  if (colorButton) activeModalProduct.selectedColor = colorButton.dataset.modalColor;
  if (sizeButton) activeModalProduct.selectedSize = sizeButton.dataset.modalSize;
  renderModalOptions(activeModalProduct);
});

const closeProductModal = () => {
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  activeModalProduct = null;
  lastFocusedElement?.focus?.();
};

const setCardImage = (imageWrap, image, src, altImage) => {
  image.src = src;
  if (altImage) altImage.src = src;
};

const enhanceProductCard = (imageWrap) => {
  const image = imageWrap.querySelector('img');
  const card = imageWrap.closest('.catalog-card, .prod, .kit');
  if (!image || !card || imageWrap.dataset.enhancedProduct === 'true') return;

  imageWrap.dataset.enhancedProduct = 'true';
  imageWrap.classList.add('has-quick-view');

  const data = getProductData(card, image);
  const enhancement = getEnhancement(data.title);
  card.dataset.selectedColor = data.selectedColor;
  card.dataset.selectedSize = data.selectedSize;

  let altImage = imageWrap.querySelector('.product-alt-image');
  const alternateSrc = enhancement.images?.find((src) => src !== image.getAttribute('src'));
  if (alternateSrc) {
    altImage = document.createElement('img');
    altImage.className = 'product-alt-image';
    altImage.src = alternateSrc;
    altImage.alt = image.alt;
    imageWrap.appendChild(altImage);
    imageWrap.classList.add('has-alt-image');
  }

  const quickView = document.createElement('button');
  quickView.className = 'quick-view-btn';
  quickView.type = 'button';
  quickView.textContent = 'Quick View';
  imageWrap.appendChild(quickView);

  const body = card.querySelector('.catalog-body, .prod-body, .kit-body');
  const target = card.querySelector('.catalog-bottom, .prod-bottom, .kit-price');
  if (body && target && !body.querySelector('.product-card-meta')) {
    const meta = document.createElement('div');
    meta.className = 'product-card-meta';
    const swatches = (enhancement.colors || []).slice(0, 4).map((color, index) => `
      <button class="product-swatch${index === 0 ? ' is-active' : ''}" type="button" aria-label="${escapeHTML(color.name)}" data-card-color="${escapeHTML(color.name)}" data-card-image="${escapeHTML(enhancement.images?.[index] || image.getAttribute('src'))}" style="--swatch:${escapeHTML(color.value)}"></button>
    `).join('');
    const sizes = (enhancement.sizes || []).slice(0, 4).map((size, index) => renderChoiceButton(size, index === 0 ? size : '', 'product-size', `data-card-size="${escapeHTML(size)}"`)).join('');
    meta.innerHTML = `<div class="product-swatches">${swatches}</div><div class="product-sizes">${sizes}</div>`;
    body.insertBefore(meta, target);
  }

  card.addEventListener('click', (event) => {
    const swatch = event.target.closest('[data-card-color]');
    const size = event.target.closest('[data-card-size]');
    if (!swatch && !size) return;

    event.preventDefault();
    event.stopPropagation();

    if (swatch) {
      card.dataset.selectedColor = swatch.dataset.cardColor;
      swatch.parentElement.querySelectorAll('.product-swatch').forEach((button) => button.classList.toggle('is-active', button === swatch));
      if (swatch.dataset.cardImage) setCardImage(imageWrap, image, swatch.dataset.cardImage, altImage);
    }

    if (size) {
      card.dataset.selectedSize = size.dataset.cardSize;
      size.parentElement.querySelectorAll('.product-size').forEach((button) => button.classList.toggle('is-active', button === size));
    }
  });

  quickView.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    openProductModal(getProductData(card, image));
  });
};

document.querySelectorAll('.catalog-img, .prod-img, .kit-img').forEach((imageWrap) => {
  enhanceProductCard(imageWrap);
  const image = imageWrap.querySelector('img');
  const card = imageWrap.closest('.catalog-card, .prod, .kit, .feature-panel');
  if (!image || !card) return;

  imageWrap.setAttribute('role', 'button');
  imageWrap.setAttribute('tabindex', '0');
  imageWrap.setAttribute('aria-label', `Ver detalle de ${image.alt || 'producto'}`);

  const open = () => openProductModal(getProductData(card, image));
  imageWrap.addEventListener('click', open);
  imageWrap.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    open();
  });
});

productModal.querySelectorAll('[data-modal-close]').forEach((element) => {
  element.addEventListener('click', closeProductModal);
});

modalAdd?.addEventListener('click', () => {
  if (!activeModalProduct) return;
  addToCart(activeModalProduct);
  closeProductModal();
  openCartDrawer();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && productModal.classList.contains('is-open')) {
    closeProductModal();
  }
  if (event.key === 'Escape' && cartDrawer.classList.contains('is-open')) {
    closeCartDrawer();
  }
});

cartButtons.forEach((button) => {
  button.addEventListener('click', openCartDrawer);
});

cartDrawer.querySelectorAll('[data-cart-close]').forEach((element) => {
  element.addEventListener('click', closeCartDrawer);
});

cartDrawer.addEventListener('click', (event) => {
  const item = event.target.closest('.cart-item');
  if (!item) return;

  const id = item.dataset.cartId;
  if (event.target.closest('[data-cart-increase]')) updateCartItem(id, 1);
  if (event.target.closest('[data-cart-decrease]')) updateCartItem(id, -1);
  if (event.target.closest('[data-cart-remove]')) removeCartItem(id);
});

cartForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!cart.length) {
    cartEmptyEl.hidden = false;
    setCartStatus('Agregá al menos un producto antes de enviar el pedido.', 'error');
    return;
  }

  const formData = new FormData(cartForm);
  const customer = {
    name: String(formData.get('name') || '').trim(),
    whatsapp: String(formData.get('whatsapp') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    message: String(formData.get('message') || '').trim()
  };

  if (!customer.name || !customer.whatsapp || !customer.email) {
    setCartStatus('Completá nombre, WhatsApp y email para enviar el pedido.', 'error');
    cartForm.reportValidity();
    return;
  }

  const subject = `Pedido VYNTRA - ${customer.name}`;
  const body = buildOrderEmail(customer);
  const emailUrl = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setCartStatus(`Se abrió el email dirigido a ${ORDER_EMAIL}.`, 'ok');
  window.location.href = emailUrl;
});

document.querySelectorAll('.contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get('nombre') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const topic = String(formData.get('consulta') || '').trim();
    const message = String(formData.get('mensaje') || '').trim();

    if (!name || !email) {
      form.reportValidity();
      return;
    }

    const subject = `Consulta VYNTRA - ${topic || name}`;
    const body = [
      'Nueva consulta VYNTRA',
      '',
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Consulta: ${topic || '-'}`,
      '',
      'Mensaje:',
      message || '-',
      '',
      'Responder al cliente para coordinar por email o WhatsApp si lo informa en el mensaje.'
    ].join('\n');

    window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

document.querySelectorAll('a[href*="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const url = new URL(link.href, window.location.href);
    const samePage = url.pathname === window.location.pathname && url.hash;
    if (!samePage) return;

    const target = document.querySelector(url.hash);
    if (!target) return;

    event.preventDefault();
    mobileMenu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', url.hash);
  });
});

window.addEventListener('load', () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('.catalog-toolbar').forEach((toolbar) => {
  const filters = toolbar.querySelectorAll('[data-filter]');
  const grid = toolbar.nextElementSibling;
  if (!filters.length || !grid?.classList.contains('catalog-grid')) return;

  const cards = grid.querySelectorAll('.catalog-card');
  filters.forEach((filter) => {
    filter.setAttribute('aria-pressed', filter.classList.contains('active') ? 'true' : 'false');

    filter.addEventListener('click', () => {
      const value = filter.dataset.filter;
      filters.forEach((button) => {
        const isActive = button === filter;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach((card, index) => {
        const categories = (card.dataset.category || '').split(/\s+/);
        const shouldShow = value === 'all' || categories.includes(value);
        card.classList.toggle('is-hidden', !shouldShow);
        card.classList.remove('filter-enter');

        if (shouldShow) {
          card.style.animationDelay = `${Math.min(index, 5) * 45}ms`;
          requestAnimationFrame(() => card.classList.add('filter-enter'));
        }
      });
    });
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealSelectors = [
  '.prod',
  '.strip-item',
  '.brand-copy',
  '.brand-image',
  '.sec-head',
  '.lb-card',
  '.editorial-img',
  '.editorial-info',
  '.process-grid article',
  '.kit',
  '.service-card',
  '.contact-band',
  '.page-hero-content',
  '.catalog-toolbar',
  '.catalog-card',
  '.feature-panel',
  '.season-story',
  '.drop-grid article',
  '.contact-info article',
  '.contact-form',
  'footer'
];

const revealItems = [...new Set(revealSelectors.flatMap((selector) => [...document.querySelectorAll(selector)]))];

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  revealItems.forEach((item, index) => {
    item.classList.add('reveal-item');
    if (item.classList.contains('editorial-img') || item.classList.contains('brand-image')) item.classList.add('reveal-left');
    if (item.classList.contains('editorial-info') || item.classList.contains('brand-copy')) item.classList.add('reveal-right');
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const motionSections = document.querySelectorAll('.hero, .page-hero');
let parallaxTicking = false;

const updateScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
};

const updateParallax = () => {
  updateScrollProgress();
  if (reducedMotion) return;

  const viewportHeight = window.innerHeight || 1;
  motionSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewportHeight) return;

    const progress = ((viewportHeight - rect.top) / (viewportHeight + rect.height)) - 0.5;
    const image = section.querySelector('.hero-bg img, .page-hero-bg img');
    const content = section.querySelector('.hero-content, .page-hero-content');

    image?.style.setProperty('--parallax-y', `${progress * 56}px`);
    content?.style.setProperty('--content-y', `${progress * -24}px`);
  });
};

const requestParallax = () => {
  if (parallaxTicking) return;
  parallaxTicking = true;
  requestAnimationFrame(() => {
    updateParallax();
    parallaxTicking = false;
  });
};

window.addEventListener('scroll', requestParallax, { passive: true });
window.addEventListener('resize', requestParallax);
updateParallax();

document.querySelectorAll('.ed-opt').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.ed-opt').forEach((option) => option.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelectorAll('.prod-add').forEach((button) => {
  if (button.classList.contains('modal-add')) return;

  button.addEventListener('click', () => {
    const card = button.closest('.catalog-card, .prod, .kit, .feature-panel, .editorial');
    const image = card?.querySelector('img');
    if (!card || !image) return;
    addToCart(getProductData(card, image), { openCart: true });
  });
});
