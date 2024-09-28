let currentSlide = 0;

const showSlide = (index) => {
  const carouselInner = document.querySelector(".carousel-inner");
  const slides = document.querySelectorAll(".carousel-item");

  currentSlide =
    index >= slides.length ? 0 : index < 0 ? slides.length - 1 : index;

  const offset = -currentSlide * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;
};

const nextSlide = () => {
  showSlide(++currentSlide);
};

const prevSlide = () => {
  showSlide(--currentSlide);
};

// Shopping cart modal
const cartModal = document.getElementById("cartModal");

// Function to open the Cart modal
const openCartModal = () => {
  cartModal.classList.add("show");
  updateGrandTotal();
};

// Function to close the Cart modal
const closeCartModal = (event) => {
  if (event.target === cartModal) {
    cartModal.classList.remove("show");
  }
};

const exitCartModal = () => {
  cartModal.classList.remove("show");
};

window.addEventListener("click", closeCartModal);

// Checkout modal
const checkoutModal = document.getElementById("checkout-modal");

// Function to open the Checkout modal
const openCheckoutModal = () => {
  // Close the cart modal before opening checkout
  exitCartModal();
  checkoutModal.classList.add("show");
};

// Function to close the Checkout modal
const closeCheckoutModal = (event) => {
  if (event.target === checkoutModal) {
    checkoutModal.classList.remove("show");
  }
};

const exitCheckoutModal = () => {
  checkoutModal.classList.remove("show");
};

window.addEventListener("click", closeCheckoutModal);

const launchToast = () => {
  const x = document.getElementById("toast");
  x.className = "show";
  setTimeout(() => {
    x.className = x.className.replace("show", "");
  }, 5000);
};
