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
