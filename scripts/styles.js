// Initial slide index
let currentSlide = 0;

// Function to show the specified slide
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

// Shopping Cart Modal Logic
const cartModal = document.getElementById("cartModal");

const openCartModal = () => {
  cartModal.classList.add("show");
  updateGrandTotal();
};

const closeCartModal = (event) => {
  if (event.target === cartModal) {
    exitCartModal();
  }
};

const exitCartModal = () => {
  cartModal.classList.remove("show");
};

// Success Modal

const openSuccessModal = () => {
  const modal = document.getElementById("my_modal_2");
  modal.classList.add("show");
  
};

const dialogClose = () => {
  const modal = document.getElementById("my_modal_2");
  modal.classList.remove("show");
};

// Checkout Modal Logic
const checkoutModal = document.getElementById("checkout-modal");

const openCheckoutModal = () => {
  exitCartModal(); // Close the cart modal if open
  checkoutModal.classList.add("show");
};

const closeCheckoutModal = (event) => {
  if (event.target === checkoutModal) {
    exitCheckoutModal();
  }
};

const exitCheckoutModal = () => {
  checkoutModal.classList.remove("show");
};

// Function to launch the toast notification
const launchToast = () => {
  const toastElement = document.getElementById("toast");
  toastElement.classList.add("show");

  setTimeout(() => {
    toastElement.classList.remove("show");
  }, 5000);
};

const doneToast = () => {
  const toastElement = document.getElementById("toast-done");
  toastElement.classList.add("show");

  setTimeout(() => {
    toastElement.classList.remove("show");
  }, 5000);
};

// Add event listeners for modals
window.addEventListener("click", closeCartModal);
window.addEventListener("click", closeCheckoutModal);
