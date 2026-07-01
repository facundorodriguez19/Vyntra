// ==========================================
// 1. PRODUCTOS DE LA TIENDA
// ==========================================
// Lista con todos los productos disponibles. Cada uno tiene ID, nombre, precio y foto.
const products = [
  {
    id: 1,
    name: "Remera Signature Indigo",
    category: "Ropa",
    price: 109990,
    image: "../images/products/signature-back-indigo-front.jpg",
    description: "Remera premium con estampa trasera y calce relajado."
  },
  {
    id: 2,
    name: "Hoodie Silent Power",
    category: "Abrigos",
    price: 154990,
    image: "../images/products/hoodie-silent-power-front.jpg",
    description: "Buzo pesado con capucha, interior suave y logo frontal."
  },
  {
    id: 3,
    name: "Camisa Oversized Blanca",
    category: "Ropa",
    price: 129990,
    image: "../images/products/camisa-oversized-blanca-front.jpg",
    description: "Camisa amplia de tela liviana para looks urbanos."
  },
  {
    id: 4,
    name: "Perfume Intenso",
    category: "Accesorios",
    price: 89990,
    image: "../images/products/perfume-intenso-front.jpg",
    description: "Fragancia fuerte, moderna y pensada para todos los dias."
  },
  {
    id: 5,
    name: "Dije Pegasus",
    category: "Accesorios",
    price: 49990,
    image: "../images/products/dije-pegasus-front.jpg",
    description: "Dije metalico con terminacion pulida y cadena fina."
  },
  {
    id: 6,
    name: "Tote Drop",
    category: "Bolsos",
    price: 39990,
    image: "../images/products/tote-drop-front.jpg",
    description: "Bolso de tela resistente con grafica de temporada."
  },
  {
    id: 7,
    name: "Not Your Average",
    category: "Ropa",
    price: 109990,
    image: "../images/products/not-average-indigo-front.jpg",
    description: "Remera indigo con mensaje central y corte clasico."
  },
  {
    id: 8,
    name: "Cadena Silent",
    category: "Accesorios",
    price: 59990,
    image: "../images/products/cadena-silent-front.jpg",
    description: "Cadena minimalista para completar cualquier outfit."
  },
  {
    id: 9,
    name: "Signature Grey",
    category: "Ropa",
    price: 99990,
    image: "../images/products/signature-grey-front.jpg",
    description: "Remera signature en tono gris pizarra con fit relajado."
  }
];

// ==========================================
// 2. REFERENCIAS A ELEMENTOS DEL HTML
// ==========================================
// Guardamos los botones, divs y modales del HTML en variables para poder usarlos más fácil
const productList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const subtotal = document.querySelector("#subtotal");
const total = document.querySelector("#total");
const openCartButton = document.querySelector("#open-cart");
const closeCartButton = document.querySelector("#close-cart");
const cartDrawer = document.querySelector("#cart-drawer");
const cartOverlay = document.querySelector("#cart-overlay");
const checkoutButton = document.querySelector("#checkout-button");
const checkoutModal = document.querySelector("#checkout-modal");
const closeModalButton = document.querySelector("#close-modal");
const checkoutForm = document.querySelector("#checkout-form");
const toast = document.querySelector("#toast");

// ==========================================
// 3. ESTADO DEL CARRITO (MEMORIA)
// ==========================================
// Cargamos lo que haya guardado en el navegador. Si no hay nada, arranca como una lista vacía.
let cart = JSON.parse(localStorage.getItem("vyntraMiniCart")) || [];

// ==========================================
// 4. FUNCIONES AUXILIARES
// ==========================================

// Para darle formato de pesos a los números (por ejemplo, 100000 pasa a ser $100.000)
const formatPrice = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
};

// Guarda el carrito en el disco/memoria del navegador para que no se pierda al actualizar
const saveCart = () => {
  localStorage.setItem("vyntraMiniCart", JSON.stringify(cart));
};

// Muestra el cartel flotante (Toast) abajo a la derecha por unos segundos y después lo saca
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");

  setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600); // 2.6 segundos en pantalla
};

// ==========================================
// 5. RENDERIZADO (DIBUJAR EN PANTALLA)
// ==========================================

// Dibuja las tarjetas de los productos en la tienda principal
const renderProducts = () => {
  // Cortamos para mostrar solo los primeros 8 de la lista
  productList.innerHTML = products.slice(0, 8).map((product) => {
    return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <span>${product.category}</span>
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <div class="product-bottom">
            <strong>${formatPrice(product.price)}</strong>
            <button type="button" data-add="${product.id}">Agregar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
};

// Dibuja los productos que agregamos dentro del carrito lateral
const renderCart = () => {
  // Calculamos la cantidad total de prendas y el precio final sumado
  const amount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Ponemos los números actualizados en el botón del carrito y los totales
  cartCount.textContent = amount;
  subtotal.textContent = formatPrice(cartTotal);
  total.textContent = formatPrice(cartTotal);

  // Si el carrito está vacío, mostramos un texto que lo avise
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Todavía no agregaste productos.</p>`;
    return;
  }

  // Si tiene cosas, las dibujamos una por una con sus botones para sumar, restar o borrar
  cartItems.innerHTML = cart.map((item) => {
    return `
      <article class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${formatPrice(item.price)} x ${item.quantity}</p>
          <div class="cart-actions">
            <button class="quantity-button" type="button" data-decrease="${item.id}">-</button>
            <strong>${item.quantity}</strong>
            <button class="quantity-button" type="button" data-increase="${item.id}">+</button>
            <button class="remove-button" type="button" data-remove="${item.id}">Quitar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
};

// ==========================================
// 6. ACCIONES DEL CARRITO
// ==========================================

// Para meter un producto al carrito
const addToCart = (productId) => {
  const product = products.find((item) => item.id === productId);
  const existingProduct = cart.find((item) => item.id === productId);

  if (!product) return;

  if (existingProduct) {
    // Si ya estaba, le suma 1 a la cantidad
    existingProduct.quantity += 1;
  } else {
    // Si es nuevo, lo agrega a la lista con cantidad inicial de 1
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();       // Guarda en memoria
  renderCart();     // Redibuja el carrito
  openCart();       // Abre el panel lateral automáticamente
  showToast(`${product.name} agregado al carrito.`); // Muestra el cartelito
};

// Sumar o restar cantidad con los botones "+" y "-"
const changeQuantity = (productId, action) => {
  cart = cart.map((item) => {
    if (item.id !== productId) return item;

    // Si tocaste "+", sumamos. Si no, restamos.
    const quantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
    return { ...item, quantity };
  }).filter((item) => item.quantity > 0); // Si la cantidad llega a 0, se borra automáticamente de la lista

  saveCart();
  renderCart();
};

// Botón "Quitar" para borrar el producto directamente del carrito
const removeProduct = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
  showToast("Producto eliminado del carrito.");
};

// ==========================================
// 7. ABRIR Y CERRAR ELEMENTOS (INTERFAZ)
// ==========================================

// Abre el carrito lateral
const openCart = () => {
  cartDrawer.classList.add("is-open");
  cartOverlay.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open"); // Bloquea el scroll del fondo
};

// Cierra el carrito lateral
const closeCart = () => {
  cartDrawer.classList.remove("is-open");
  cartOverlay.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open"); // Devuelve el scroll
};

// Abre la ventanita (Modal) para poner los datos de compra
const openCheckout = () => {
  if (cart.length === 0) {
    showToast("Agrega al menos un producto para comprar.");
    return;
  }

  closeCart(); // Cierra el carrito antes de abrir el checkout
  checkoutModal.classList.add("is-open");
  checkoutModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

// Cierra el modal de checkout
const closeCheckout = () => {
  checkoutModal.classList.remove("is-open");
  checkoutModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

// ==========================================
// 8. EVENTOS Y ESCUCHADORES (LISTENERS)
// ==========================================

// Detecta clics en cualquier botón de la página que tenga "data-add" para agregar al carrito
document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (!addButton) return;

  addToCart(Number(addButton.dataset.add));
});

// Controla los clics dentro del carrito para sumar, restar o quitar prendas
cartItems.addEventListener("click", (event) => {
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");
  const removeButton = event.target.closest("[data-remove]");

  if (increaseButton) changeQuantity(Number(increaseButton.dataset.increase), "increase");
  if (decreaseButton) changeQuantity(Number(decreaseButton.dataset.decrease), "decrease");
  if (removeButton) removeProduct(Number(removeButton.dataset.remove));
});

// Eventos para abrir y cerrar el carrito
openCartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart); // Cierra si hacés clic en el fondo gris del carrito
checkoutButton.addEventListener("click", openCheckout);
closeModalButton.addEventListener("click", closeCheckout);

// Cierra el checkout si hacés clic fuera del recuadro blanco de datos
checkoutModal.addEventListener("click", (event) => {
  if (event.target === checkoutModal) closeCheckout();
});

// Cuando le das a "Confirmar compra" en el formulario
checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evitamos que la página se recargue sola

  const customerName = document.querySelector("#customer-name").value.trim();
  cart = []; // Vaciamos el carrito
  saveCart(); // Guardamos el carrito vacío en memoria
  renderCart(); // Redibujamos para que se vea vacío
  checkoutForm.reset(); // Limpia los inputs del formulario
  closeCheckout(); // Cierra el modal
  showToast(`Gracias ${customerName}. Tu compra ficticia fue confirmada.`);
});

// Cerrar todo rápido si el usuario aprieta la tecla Escape
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  closeCart();
  closeCheckout();
});

// ==========================================
// 9. INICIO
// ==========================================
// Dibujamos todo por primera vez al entrar a la página
renderProducts();
renderCart();
