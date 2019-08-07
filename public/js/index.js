/* eslint-disable */
(function () {
  // Tags - removing tags

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
  
  if (document.querySelector('#address')) {
    googleMaps()
  };

  // Gallery - slider

  let slideIndex = 1;
  showSlides(slideIndex);

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

  // Gallery - removing images

  const gallery = document.querySelectorAll('.js-removeGalleryImage');
  const removeImage = (id) => {
    const nodeElement = document.getElementById(id);
    if (nodeElement) {
      nodeElement.remove();
    }
  };

  gallery.forEach(function(item) {
    item.addEventListener('click', function (event) {
      const imageName = event.target.getAttribute('data-id');

      fetch('/vet/:slug/edit/remove', {
        method: 'POST',
        body: JSON.stringify({imageName: imageName}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        removeImage(imageName);
        return response.json;
      });
    });
  });

  // Star rating

  function createFlash() {
    
  }

  if (document.querySelector('.rate')) {
    const allStars = document.querySelectorAll('.star');
  
    allStars.forEach(function(item) {
      item.addEventListener('click', function(event) {
        const starRate = event.target.getAttribute('data-value');
        const vetId = event.target.parentNode.getAttribute('data-vet');
        fetch(window.location.href + '/rate', {
          method: 'POST',
          body: JSON.stringify({ rate: starRate, vet: vetId }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => response.json()
        ).then((data) => {
          document.querySelector(`.stars-inner[data-vet="${vetId}"]`).style.width = `${data.averageRate * 20}%`;
          const flash = document.querySelector(`.message[data-vet="${vetId}"]`);
          if (flash) {
            flash.classList.remove('d-none');
          }
        });
      });
    });

    const flashes = document.querySelectorAll('.message');

    flashes.forEach(function(item) {
      item.addEventListener('click', function(event) {
        const vetId = event.target.getAttribute('data-vet');
        const nodeElement = document.querySelector(`[data-vet="${vetId}"]`);
        if (nodeElement) {
          nodeElement.remove();
        }
      });
    });
  }
} ());
