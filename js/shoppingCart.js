let cart = document.getElementById('cart');
let subtotalElement = document.getElementById('subtotal');
let vatElement = document.getElementById('vat');
let totalElement = document.getElementById('total');

function toggleCart() {
    cart.style.right = cart.style.right === '0px' ? '-350px' : '0px';
}

function openCart() {
    cart.style.right = '0px';
}

function closeCart() {
    cart.style.right = '-350px';
}


function addToCart(productName, price) {
    openCart();

    let existingItem = findCartItem(productName);

    if (existingItem) {
        existingItem.quantity++;
        updateCartItem(existingItem);
    } else {
        let listItem = document.createElement('li');
        listItem.className = 'cartItem';

        listItem.textContent = productName + ' - €' + price + ' x 1';
        listItem.setAttribute('data-quantity', 1);
        let shoppingList = document.querySelector('.shoppingList');
        shoppingList.appendChild(listItem);
    }

    calculateTotals();
} 


function findCartItem(productName) {
    let existingItems = document.querySelectorAll('.cartItem');

    for (let i = 0; i < existingItems.length; i++) {
        if (existingItems[i].textContent.includes(productName)) {
            return {
                element: existingItems[i],
                quantity: parseInt(existingItems[i].getAttribute('data-quantity'))
            };
        }
    }

    return null;
}

function updateCartItem(existingItem) {
    existingItem.element.textContent = existingItem.element.textContent.replace(/x \d+$/, 'x ' + existingItem.quantity);
    existingItem.element.setAttribute('data-quantity', existingItem.quantity);

    calculateTotals();
}

function calculateTotals() {
    let items = document.querySelectorAll('.cartItem');
    let subtotal = 0;

    for (let i = 0; i < items.length; i++) {
        let priceMatch = items[i].textContent.match(/€([\d.]+)/);
        if (priceMatch) {
            let price = parseFloat(priceMatch[1]);
            let quantity = parseInt(items[i].getAttribute('data-quantity'));
            subtotal += price * quantity;
        }
    }

    let vat = subtotal * 0.21;
    let total = subtotal + vat;
    subtotalElement.textContent = '€' + subtotal.toFixed(2);
    vatElement.textContent = '€' + vat.toFixed(2);
    totalElement.textContent = '€' + total.toFixed(2);
}

function clearCart() {
    let shoppingList = document.querySelector('.shoppingList');
    shoppingList.innerHTML = ''; 
    calculateTotals();
}