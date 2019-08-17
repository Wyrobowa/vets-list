/* eslint-disable */
const starRating = () => {
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
};

export default starRating;
