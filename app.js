var swiper = new Swiper(".mySwiper", {
  direction: 'horizontal',
  slidesPerView: 4,
  spaceBetween: 19,
  centerInsufficientSlides: true,
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  }
});