const menuButton = document.querySelector('.nav-ham');
const mobileMenu = document.querySelector('.mob');
const cartCount = document.querySelector('.cart-count');
const scrollProgress = document.createElement('div');
const productModal = document.createElement('div');
let cartItems = 0;

scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

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
let lastFocusedElement = null;

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

const getProductData = (card, image) => {
  const title = card.querySelector('.catalog-body h3, .prod-name, .kit-name, .feature-panel h2, .feature-panel h3')?.textContent?.trim() || image.alt || 'Producto VYNTRA';
  const description = card.querySelector('.catalog-body p, .prod-desc, .kit-items, .feature-panel p')?.textContent?.trim() || 'Pieza seleccionada de la colección VYNTRA.';
  const price = card.querySelector('.catalog-bottom span, .prod-price, .kit-price, .feature-price')?.textContent?.trim() || '';
  const kicker = card.querySelector('.catalog-kicker, .prod-tag, .kit-season, .sec-tag')?.textContent?.trim() || 'Detalle de producto';
  return {
    title,
    description,
    price,
    kicker,
    src: image.currentSrc || image.src,
    alt: image.alt || title
  };
};

const openProductModal = (data) => {
  lastFocusedElement = document.activeElement;
  modalImage.src = data.src;
  modalImage.alt = data.alt;
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
  modalPrice.textContent = data.price;
  modalPrice.hidden = !data.price;
  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  productModal.querySelector('.product-modal-close')?.focus();
};

const closeProductModal = () => {
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus?.();
};

document.querySelectorAll('.catalog-img, .prod-img, .kit-img').forEach((imageWrap) => {
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
  cartItems += 1;
  if (cartCount) cartCount.textContent = String(cartItems);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && productModal.classList.contains('is-open')) {
    closeProductModal();
  }
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
  button.addEventListener('click', () => {
    cartItems += 1;
    if (cartCount) cartCount.textContent = String(cartItems);
  });
});
