/* eslint-disable */
const galleryRemoveImages = () => {
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
};

export default galleryRemoveImages;
