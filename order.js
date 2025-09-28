```javascript
document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Carousel
  // ===============================
  const images = document.querySelectorAll(".carousel-image");
  const leftArrow = document.querySelector(".carousel-arrow.left");
  const rightArrow = document.querySelector(".carousel-arrow.right");
  const dotsContainer = document.querySelector(".carousel-dots");
  let currentIndex = 0;

  function updateCarousel(index) {
    images.forEach((img, i) => img.classList.toggle("active", i === index));
    document.querySelectorAll(".dot").forEach((dot, i) =>
      dot.classList.toggle("active", i === index)
    );
    currentIndex = index;
  }

  // Create dots dynamically
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => updateCarousel(i));
    dotsContainer.appendChild(dot);
  });

  leftArrow.addEventListener("click", () => {
    let newIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel(newIndex);
  });

  rightArrow.addEventListener("click", () => {
    let newIndex = (currentIndex + 1) % images.length;
    updateCarousel(newIndex);
  });

  // ===============================
  // Variants
  // ===============================
  const variantGroups = document.querySelectorAll(".variant-buttons");
  let selectedPrice = 15; // Default medium

  variantGroups.forEach(group => {
    group.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
        group.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        selectedPrice = parseFloat(e.target.dataset.price);
        document.querySelector(".price").textContent = `RM ${selectedPrice}`;
      }
    });
  });

  // ===============================
  // Cart
  // ===============================
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const miniCart = document.getElementById("mini-cart");
  const cartToggle = document.getElementById("cart-toggle");
  let cart = [];

  function updateCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name} (${item.qty})</span>
        <div class="cart-item-controls">
          <button data-index="${index}" class="decrease">-</button>
          <button data-index="${index}" class="increase">+</button>
          <button data-index="${index}" class="remove">x</button>
        </div>
        <span>RM ${(item.price * item.qty).toFixed(2)}</span>
      `;
      cartItemsEl.appendChild(li);
    });

    cartTotalEl.textContent = total.toFixed(2);
  }

  function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    updateCart();
    miniCart.classList.remove("hidden"); // auto open when item added
  }

  // Main product add button
  document.getElementById("add-to-cart").addEventListener("click", () => {
    addToCart("Signature Latte", selectedPrice);
  });

  // Related product buttons
  document.querySelectorAll(".add-related").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.name, parseFloat(btn.dataset.price));
    });
  });

  // Cart item controls
  cartItemsEl.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.dataset.index;
      if (e.target.classList.contains("increase")) {
        cart[index].qty++;
      } else if (e.target.classList.contains("decrease")) {
        cart[index].qty = Math.max(1, cart[index].qty - 1);
      } else if (e.target.classList.contains("remove")) {
        cart.splice(index, 1);
      }
      updateCart();
    }
  });

  // Cart toggle
  cartToggle.addEventListener("click", () => {
    miniCart.classList.toggle("hidden");
  });
});
```
