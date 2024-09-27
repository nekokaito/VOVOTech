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


const modal = document.getElementById("cartModal");

// Function to open the modal
const openModal = () => {
  modal.classList.add("show");
  updateGrandTotal(); 
};


const closeModal = (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
};

const exitModal = () => {
  modal.classList.remove("show");
};

window.addEventListener("click", closeModal);
