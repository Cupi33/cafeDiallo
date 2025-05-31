document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.getElementById('cart-button');
  const cartModal = document.getElementById('cart-modal');
  const closeModal = document.getElementById('close-modal');
  const closeButton = document.getElementById('close-button');
  const proceedButton = document.getElementById('proceed-button');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  const products = document.querySelectorAll('.product-card');
  let cart = {};

  products.forEach(card => {
    const name = card.querySelector('h3').textContent;
    const price = parseFloat(card.querySelector('p').textContent.replace('RM', ''));
    const qtySpan = card.querySelector('.quantity');
    let quantity = 0;

    card.querySelector('.increase').addEventListener('click', () => {
      quantity++;
      qtySpan.textContent = quantity;
      cart[name] = { price, quantity };
      updateCartCount();
    });

    card.querySelector('.decrease').addEventListener('click', () => {
      if (quantity > 0) {
        quantity--;
        qtySpan.textContent = quantity;
        if (quantity === 0) {
          delete cart[name];
        } else {
          cart[name].quantity = quantity;
        }
        updateCartCount();
      }
    });
  });

  function updateCartCount() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  cartButton.addEventListener('click', () => {
    cartItems.innerHTML = '';
    let total = 0;
    for (const item in cart) {
      const li = document.createElement('li');
      li.textContent = `${item} × ${cart[item].quantity} = RM${(cart[item].price * cart[item].quantity).toFixed(2)}`;
      cartItems.appendChild(li);
      total += cart[item].price * cart[item].quantity;
    }
    cartTotal.textContent = `Total: RM${total.toFixed(2)}`;
    cartModal.style.display = 'block';
  });

  closeModal.onclick = closeButton.onclick = () => {
    cartModal.style.display = 'none';
  };

proceedButton.onclick = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'checkOrder.html';
  cartModal.style.display = 'none';
};

  window.onclick = function(event) {
    if (event.target == cartModal) {
      cartModal.style.display = 'none';
    }
  };
});
