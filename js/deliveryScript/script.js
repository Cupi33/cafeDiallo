document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.getElementById('cart-count');

  // The cart will hold { id: { name, quantity } }
  const cart = {};

  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const increaseBtn = card.querySelector('.increase');
    const decreaseBtn = card.querySelector('.decrease');
    const quantityDisplay = card.querySelector('.quantity');

    const id = card.getAttribute('data-id');
    const name = card.querySelector('h3').textContent;

    increaseBtn.addEventListener('click', () => {
      let qty = parseInt(quantityDisplay.textContent);
      qty++;
      quantityDisplay.textContent = qty;

      // Update the cart
      cart[id] = {
        name: name,
        quantity: qty
      };

      updateCartCount();
    });

    decreaseBtn.addEventListener('click', () => {
      let qty = parseInt(quantityDisplay.textContent);
      if (qty > 0) {
        qty--;
        quantityDisplay.textContent = qty;

        if (qty === 0) {
          delete cart[id]; // Remove item from cart
        } else {
          cart[id] = {
            name: name,
            quantity: qty
          };
        }

        updateCartCount();
      }
    });
  });

  function updateCartCount() {
    let total = 0;
    for (let itemId in cart) {
      total += cart[itemId].quantity;
    }
    cartCount.textContent = total;
  }

  // OPTIONAL: for debugging
  document.getElementById('cart-button').addEventListener('click', () => {
    console.log('Cart content:', cart);
  });
});
