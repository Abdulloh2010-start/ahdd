let productContainer = document.getElementById('productContainer');
let cartItems = document.getElementById('cartItems');
let totalPriceElement = document.getElementById('totalPrice');
let cart = [];

function loadProducts() {
    fetch('https://fakestoreapi.com/products?limit=10')
        .then(res => res.json())
        .then(data => displayProducts(data));
}

function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.slice(0, 50)}...</p>
            <p class="price">$${product.price}</p>
            <button class="buy-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Sotib Olish</button>
        `;
        productContainer.appendChild(card);
    });

    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function () {
            let id = this.getAttribute('data-id');
            let title = this.getAttribute('data-title');
            let price = parseFloat(this.getAttribute('data-price'));
            addToCart(id, title, price);
        });
    });
}

function addToCart(id, title, price) {
    cart.push({ id, title, price });
    updateCart();
    showNotification();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.title} - $${item.price}`;
        cartItems.appendChild(li);
    });
    totalPriceElement.innerHTML = `Total: $${total}`;
}

function showNotification() {
    let notification = document.getElementById('notification');
    notification.style.display = 'flex';
    setTimeout(() => {
        notification.style.bottom = '20px';
    }, 10);
}

function closeNotification() {
    let notification = document.getElementById('notification');
    notification.style.bottom = '-100px';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 500);
}

loadProducts();