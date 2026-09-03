/* ==================================================
   MERCADOMIX - LISTA DE 20 PRODUTOS E LÓGICA
================================================== */

const products = [
    { id: 1, name: "Smartphone Galaxy Pro 256GB", category: "Eletrônicos", price: 2499.90, icon: "📱", rating: 4.8, description: "Smartphone de alta performance com câmera tripla e tela OLED." },
    { id: 2, name: "Fone Bluetooth Noise Cancelling", category: "Eletrônicos", price: 299.90, icon: "🎧", rating: 4.7, description: "Cancelamento de ruído ativo com até 30 horas de bateria." },
    { id: 3, name: "Smart TV LED 50 Polegadas", category: "Eletrônicos", price: 2399.90, icon: "📺", rating: 4.6, description: "Resolução 4K Ultra HD com suporte a comandos de voz acessíveis." },
    { id: 4, name: "Smartwatch Fitness Pro", category: "Eletrônicos", price: 349.90, icon: "⌚", rating: 4.5, description: "Monitoramento de batimentos cardíacos, passos e sono." },
    { id: 5, name: "Caixa de Som Bluetooth", category: "Eletrônicos", price: 199.90, icon: "🔊", rating: 4.4, description: "Resistente à água com graves profundos e bateria duradoura." },
    { id: 6, name: "Liquidificador Turbo 1200W", category: "Casa", price: 179.90, icon: "🥤", rating: 4.6, description: "Jarra de vidro ultra resistente com 12 velocidades." },
    { id: 7, name: "Air Fryer Digital 5L", category: "Casa", price: 399.90, icon: "🍟", rating: 4.8, description: "Fritadeira sem óleo com painel digital intuitivo." },
    { id: 8, name: "Cafeteira Elétrica Premium", category: "Casa", price: 249.90, icon: "☕", rating: 4.5, description: "Prepara café quentinho em minutos com sistema corta-pingos." },
    { id: 9, name: "Aspirador de Pó Vertical", category: "Casa", price: 329.90, icon: "🧹", rating: 4.4, description: "2 em 1: pode ser usado como aspirador portátil ou vertical." },
    { id: 10, name: "Kit Jogo de Cama Casal", category: "Casa", price: 129.90, icon: "🛏️", rating: 4.7, description: "Tecido 100% algodão super macio e hipoalergênico." },
    { id: 11, name: "Tênis Esportivo Masculino", category: "Moda", price: 249.90, icon: "👟", rating: 4.6, description: "Amortecimento de alta resposta para caminhadas e corridas." },
    { id: 12, name: "Bicicleta Urbana Aro 29", category: "Esportes", price: 1199.90, icon: "🚲", rating: 4.8, description: "Quadro leve em alumínio com freios a disco eficientes." },
    { id: 13, name: "Camisa Esportiva Dry Fit", category: "Moda", price: 89.90, icon: "👕", rating: 4.5, description: "Tecido respirável que ajuda na evaporação rápida do suor." },
    { id: 14, name: "Mochila Esportiva 30L", category: "Esportes", price: 149.90, icon: "🎒", rating: 4.4, description: "Divisória para notebook e compartimentos impermeáveis." },
    { id: 15, name: "Perfume Feminino Premium", category: "Beleza", price: 199.90, icon: "🌸", rating: 4.8, description: "Fragrância floral marcante com longa fixação." },
    { id: 16, name: "Kit Cuidados para Cabelo", category: "Beleza", price: 119.90, icon: "💇", rating: 4.6, description: "Shampoo e condicionador para hidratação profunda." },
    { id: 17, name: "Notebook Ultra 15", category: "Informática", price: 3299.90, icon: "💻", rating: 4.8, description: "Processador de última geração com 16GB RAM e SSD 512GB." },
    { id: 18, name: "Teclado Mecânico RGB", category: "Informática", price: 229.90, icon: "⌨️", rating: 4.7, description: "Switches macios, ideal para digitação longa ou jogos." },
    { id: 19, name: "Mouse Gamer RGB", category: "Informática", price: 119.90, icon: "🖱️", rating: 4.6, description: "Sensor óptico de alta precisão com botões configuráveis." },
    { id: 20, name: "Monitor Full HD 24 Polegadas", category: "Informática", price: 799.90, icon: "🖥️", rating: 4.7, description: "Painel IPS com tratamento anti-reflexo e bordas finas." }
];

let cart = JSON.parse(localStorage.getItem("mercadoMixCart")) || [];
let currentProducts = [...products];

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCart();
});

/* --- NAVEGAÇÃO ENTRE PÁGINAS --- */
function showPage(pageName) {
    const pages = ["homePage", "loginPage", "cartPage", "checkoutPage", "successPage"];
    pages.forEach(id => {
        const page = document.getElementById(id);
        if (page) page.classList.add("hidden");
    });

    const targetPage = document.getElementById(pageName + "Page");
    if (targetPage) {
        targetPage.classList.remove("hidden");
    }

    // Gerenciamento de Foco para Acessibilidade
    const mainContent = document.getElementById("conteudo");
    if (mainContent) mainContent.focus();

    if (pageName === 'cart') renderCart();
    if (pageName === 'checkout') renderCheckout();
}

/* --- RENDERIZAÇÃO DE PRODUTOS --- */
function renderProducts(list = currentProducts) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = "";

    list.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image" aria-hidden="true">${product.icon}</div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="card-actions">
                    <button class="secondary-button" onclick="openModal(${product.id})" aria-label="Ver resumo e detalhes de ${product.name}">Ver Resumo</button>
                    <button class="primary-button" onclick="addToCart(${product.id})" aria-label="Adicionar ${product.name} ao carrinho">Adicionar</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    const resultText = document.getElementById("productResultText");
    if (resultText) resultText.textContent = `${list.length} produto(s) exibido(s)`;
}

/* --- RESUMO DO PRODUTO (MODAL ACESSÍVEL) --- */
function openModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <div style="text-align:center; font-size:4rem;" aria-hidden="true">${product.icon}</div>
        <h2>${product.name}</h2>
        <p><strong>Categoria:</strong> ${product.category}</p>
        <p><strong>Avaliação:</strong> ⭐ ${product.rating} / 5.0</p>
        <p><strong>Descrição:</strong> ${product.description}</p>
        <h3 class="product-price" style="margin: 15px 0;">${formatPrice(product.price)}</h3>
        <button class="primary-button full-button" onclick="addToCart(${product.id}); closeModal();">Adicionar ao Carrinho</button>
    `;

    const modal = document.getElementById("productModal");
    if (modal && modal.showModal) {
        modal.showModal();
    }
}

function closeModal() {
    const modal = document.getElementById("productModal");
    if (modal && modal.close) modal.close();
}

/* --- FILTROS E BUSCA --- */
function searchProducts() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    currentProducts = products.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    renderProducts(currentProducts);
    showPage("home");
}

function filterCategory(cat) {
    currentProducts = (cat === "Todos") ? [...products] : products.filter(p => p.category === cat);
    renderProducts(currentProducts);
    showPage("home");
}

function sortProducts() {
    const val = document.getElementById("sortProducts").value;
    if (val === "lowest") currentProducts.sort((a,b) => a.price - b.price);
    else if (val === "highest") currentProducts.sort((a,b) => b.price - a.price);
    else if (val === "name") currentProducts.sort((a,b) => a.name.localeCompare(b.name));
    else currentProducts = [...products];
    renderProducts(currentProducts);
}

/* --- GERENCIAMENTO DO CARRINHO --- */
function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
    } else {
        const prod = products.find(p => p.id === id);
        cart.push({ ...prod, quantity: 1 });
    }
    saveAndRefreshCart();
    showToast("Produto adicionado ao carrinho!");
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveAndRefreshCart();
    renderCart();
}

function saveAndRefreshCart() {
    localStorage.setItem("mercadoMixCart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) cartCountEl.textContent = totalCount;
}

function renderCart() {
    const container = document.getElementById("cartItems");
    if (!container) return;
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        document.getElementById("cartSubtotal").textContent = "R$ 0,00";
        document.getElementById("cartTotal").textContent = "R$ 0,00";
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-title">
                <strong>${item.name}</strong>
                <div>${formatPrice(item.price)} un.</div>
            </div>
            <div class="qty-controls">
                <button onclick="updateQuantity(${item.id}, -1)" aria-label="Diminuir quantidade de ${item.name}">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" aria-label="Aumentar quantidade de ${item.name}">+</button>
            </div>
            <div><strong>${formatPrice(itemTotal)}</strong></div>
        `;
        container.appendChild(cartItem);
    });

    document.getElementById("cartSubtotal").textContent = formatPrice(subtotal);
    document.getElementById("cartTotal").textContent = formatPrice(subtotal);
}

/* --- LOGIN E FINALIZAÇÃO --- */
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    document.getElementById("userNavText").textContent = email.split('@')[0];
    showToast("Login efetuado com sucesso!");
    showPage("home");
}

function renderCheckout() {
    const summaryContainer = document.getElementById("checkoutSummaryList");
    let total = 0;
    summaryContainer.innerHTML = "";

    cart.forEach(i => {
        total += i.price * i.quantity;
        summaryContainer.innerHTML += `<p>${i.quantity}x ${i.name} - ${formatPrice(i.price * i.quantity)}</p>`;
    });

    document.getElementById("checkoutTotal").textContent = formatPrice(total);
}

function processOrder(e) {
    e.preventDefault();
    if(cart.length === 0) {
        showToast("Adicione produtos ao carrinho antes de finalizar!");
        return;
    }
    cart = [];
    saveAndRefreshCart();
    document.getElementById("orderNumber").textContent = "#" + Math.floor(100000 + Math.random() * 900000);
    showPage("success");
}

/* --- UTILITÁRIOS --- */
function formatPrice(val) {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function scrollToProducts() {
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}