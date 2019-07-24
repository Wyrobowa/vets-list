/* eslint-disable */
(function () {
  const tagsList = document.querySelectorAll('.js-removeTag');
  const removeTag = (id) => {
    const nodeElement = document.getElementById(id);

    if (nodeElement) {
      nodeElement.remove();
    }
  };

  tagsList.forEach(function(item) {
    item.addEventListener('click', function (event) {
      const tagId = event.target.getAttribute('data-id');

      fetch('tags/remove', {
        method: 'POST',
        body: JSON.stringify({tagId: tagId}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        removeTag(tagId);
        return response.json;
      });
    });
  });

  // Google Maps

  const googleMaps = () => {
    const input = document.querySelector('#address');
    const autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        document.querySelector('#address').value = place.formatted_address;
        document.querySelector('#lat').value = place.geometry.location.lat();
        document.querySelector('#lng').value = place.geometry.location.lng();
    });
    google.maps.event.addDomListener(window, 'load', googleMaps); 
  }
  
  googleMaps();

  // Gallery

  let slideIndex = 1;
  showSlides(slideIndex);

  const prev = document.querySelector('.prev');
  prev.addEventListener('click', function (event) {
    showSlides(slideIndex += -1);
  });
  const next = document.querySelector('.next');
  next.addEventListener('click', function (event) {
    showSlides(slideIndex += 1);
  });
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
    dot.addEventListener('click', function (event) {
      const slideNumber = event.target.getAttribute('data-slide');
      showSlides(slideIndex = slideNumber);
    });
  });

  function showSlides(n) {
    let i;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex-1].style.display = 'block'; 
    dots[slideIndex-1].className += ' active';
  }
} ());
