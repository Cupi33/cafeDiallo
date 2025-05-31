document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    const cancelOrderBtn = document.getElementById('cancel-order');
    const updateOrderBtn = document.getElementById('update-order');

    let total = 0;

    // Display order items
    for (const id in cart) {
        const item = cart[id];
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>RM${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>RM${subtotal.toFixed(2)}</td>
        `;
        orderItems.appendChild(row);
    }

    orderTotal.textContent = `RM${total.toFixed(2)}`;

    // Cancel Order Button - clears cart and redirects to home
    cancelOrderBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        window.location.href = 'home.html';
    });

    // Update Order Button - keeps cart and redirects to home
    updateOrderBtn.addEventListener('click', () => {
        window.location.href = 'home.html';
    });

    // Make Payment Button (if you want to implement this later)
    // document.getElementById('make-payment').addEventListener('click', () => {
    //     // Payment processing logic would go here
    // });
});