/* eslint-disable */
let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
  let i;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  if (slides.length > 0) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex-1].style.display = 'block'; 
  }

  if (dots.length > 0) {
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    dots[slideIndex-1].className += ' active';
  }
}

function gallerySliderInit() {
  const prev = document.querySelector('.prev');
  if (prev) {
    prev.addEventListener('click', function (event) {
      showSlides(slideIndex += -1);
    });
  }
  const next = document.querySelector('.next');
  if (next) {
    next.addEventListener('click', function (event) {
      showSlides(slideIndex += 1);
    });
  }
  const dots = document.querySelectorAll('.dot');
  if (dots) {
    dots.forEach(dot => {
      dot.addEventListener('click', function (event) {
        const slideNumber = event.target.getAttribute('data-slide');
        showSlides(slideIndex = slideNumber);
      });
    });
  }
}

export default gallerySliderInit;
