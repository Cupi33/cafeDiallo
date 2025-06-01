document.addEventListener('DOMContentLoaded', () => {
    // Sample order data - in a real app this would come from your backend
    const order = {
        id: 4443,
        status: "preparing",
        items: [
            { name: "Cappuccino", price: 8.50, quantity: 2, status: "ready" },
            { name: "Chocolate Croissant", price: 5.20, quantity: 1, status: "preparing" },
            { name: "Iced Latte", price: 7.00, quantity: 1, status: "preparing" }
        ],
        total: 29.20
    };

    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    
    // Display order items
    order.items.forEach(item => {
        const row = document.createElement('tr');
        const subtotal = item.price * item.quantity;
        
        let statusBadge;
        if (item.status === "ready") {
            statusBadge = `<span class="status-badge ready"><i class="fas fa-check"></i> Ready</span>`;
        } else {
            statusBadge = `<span class="status-badge preparing"><i class="fas fa-utensils"></i> Preparing</span>`;
        }
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>RM${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>RM${subtotal.toFixed(2)}</td>
            <td>${statusBadge}</td>
        `;
        orderItems.appendChild(row);
    });
    
    // Display total
    orderTotal.textContent = `RM${order.total.toFixed(2)}`;
    
    // Button functionality
    document.getElementById('contact-btn').addEventListener('click', () => {
        alert("Calling Café Delight at +6012-345-6789");
    });
    
    document.getElementById('back-btn').addEventListener('click', () => {
        window.location.href = 'home.html';
    });
});
