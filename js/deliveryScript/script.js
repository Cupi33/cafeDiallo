document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartButton = document.getElementById('cart-button');
  const closeModal = document.getElementById('close-modal');
  const closeButton = document.getElementById('close-button');
  const proceedButton = document.getElementById('proceed-button');
  const clearButton = document.getElementById('clear-button');

  // Load existing cart from localStorage or initialize it
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  const productCards = document.querySelectorAll('.product-card');

  // Helper to save and update cart
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    let totalQty = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
  }

  if (clearButton) {
  clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      cart = {};
      localStorage.removeItem('cart');

      // Reset quantities in UI
      document.querySelectorAll('.quantity').forEach(qty => qty.textContent = '0');

      updateCartCount();
      displayCartModal(); // Refresh modal content
    }
  });
}


  // Initialize each product card
  productCards.forEach(card => {
    const increaseBtn = card.querySelector('.increase');
    const decreaseBtn = card.querySelector('.decrease');
    const quantityDisplay = card.querySelector('.quantity');
    const id = card.getAttribute('data-id');
    const name = card.querySelector('h3').textContent;
    const price = parseFloat(card.querySelector('p').textContent.replace('RM', ''));

    // Set quantity from cart if exists
    if (cart[id]) {
      quantityDisplay.textContent = cart[id].quantity;
    }

    increaseBtn.addEventListener('click', () => {
      let qty = parseInt(quantityDisplay.textContent) + 1;
      quantityDisplay.textContent = qty;
      cart[id] = { name, price, quantity: qty };
      saveCart();
    });

    decreaseBtn.addEventListener('click', () => {
      let qty = parseInt(quantityDisplay.textContent);
      if (qty > 0) {
        qty--;
        quantityDisplay.textContent = qty;

        if (qty === 0) {
          delete cart[id];
        } else {
          cart[id] = { name, price, quantity: qty };
        }
        saveCart();
      }
    });
  });

  function displayCartModal() {
    cartItemsList.innerHTML = '';
    let total = 0;

    if (Object.keys(cart).length === 0) {
      cartItemsList.innerHTML = '<li>Your cart is empty</li>';
    } else {
      for (let id in cart) {
        const item = cart[id];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.textContent = `${item.name} × ${item.quantity} = RM${itemTotal.toFixed(2)}`;
        cartItemsList.appendChild(li);
      }
    }

    cartTotal.textContent = `Total: RM${total.toFixed(2)}`;
    cartModal.style.display = 'block';
  }

  cartButton.addEventListener('click', () => {
    displayCartModal();
  });

  closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });

  proceedButton.addEventListener('click', () => {
    alert('Proceeding to checkout!');
    cartModal.style.display = 'none';
  });

  // Show correct total on load
  updateCartCount();
});
