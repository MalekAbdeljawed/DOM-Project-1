// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    // Données d'exemple pour les articles
    const items = [
        { id: 1, name: 'Article 1', price: 10.00, quantity: 1, img: 'images/article_1.jpg' },
        { id: 2, name: 'Article 2', price: 20.00, quantity: 2, img: 'images/article_2.jpg' },
    ];

    function renderItems() {
        cartItems.innerHTML = '';  // Réinitialiser la liste des articles
        let total = 0;

        items.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}">  <!-- Chemin vers l'image -->
                <div class="item-details">
                    <div>${item.name}</div>
                    <div class="quantity-controls">
                        <button class="decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-id="${item.id}">+</button>
                        <button class="delete" data-id="${item.id}">Delete</button>
                        <span class="heart" data-id="${item.id}">❤️</span>
                    </div>
                </div>
                <div>$${(item.price * item.quantity).toFixed(2)}</div>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        totalPrice.textContent = `$${total.toFixed(2)}`;
    }

    function updateQuantity(id, change) {
        const item = items.find(i => i.id === parseInt(id));
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                items.splice(items.indexOf(item), 1);
            }
            renderItems();
        }
    }

    function toggleLike(id) {
        const heart = document.querySelector(`.heart[data-id="${id}"]`);
        heart.classList.toggle('liked');
    }

    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase')) {
            updateQuantity(e.target.dataset.id, 1);
        } else if (e.target.classList.contains('decrease')) {
            updateQuantity(e.target.dataset.id, -1);
        } else if (e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            const index = items.findIndex(i => i.id === parseInt(id));
            if (index !== -1) {
                items.splice(index, 1);
                renderItems();
            }
        } else if (e.target.classList.contains('heart')) {
            toggleLike(e.target.dataset.id);
        }
    });

    renderItems();
});
