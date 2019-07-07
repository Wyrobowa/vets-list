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
    item.addEventListener('click', function(event) {
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
} ());
