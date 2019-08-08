/* eslint-disable */
const axios = require('axios');
const dompurify = require('dompurify');

const searchResultsHTML = (vets) => {
  return vets.map(vet => {
    return `
      <a href="/vet/${vet.slug}" class="search__result">
        <strong>${vet.name}</strong>
        <p>${vet.location.address}</p>
      </a>
    `
  }).join('');
};

const typeAhead = (search) => {
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResult = search.querySelector('.search__results');

  searchInput.addEventListener('input', function(event) {
    if (!event.target.value) {
      searchResult.style.display = 'none';
      return;
    }

    searchResult.style.display = 'block';

    axios
      .get(`/search?q=${event.target.value}`)
      .then(res => {
        if (res.data.length) {
          searchResult.innerHTML = dompurify.sanitize(searchResultsHTML(res.data));
          return;
        }

        searchResult.innerHTML = dompurify.sanitize(`<div class="search__result">No results for: <strong>${event.target.value}</strong> found!</div>`);
      })
      .catch(err => {
        console.log(err);
      });
  });

  searchInput.addEventListener('keyup', function(event) {
    if (![38, 40, 13].includes(event.keyCode)) return;

    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;

    if (event.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (event.keyCode === 40) {
      next = items[0];
    } else if (event.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
    } else if (event.keyCode === 38) {
      next = items[items.length - 1];
    } else if (event.keyCode === 13 && current) {
      window.location = current.href;
      return;
    }

    if (current) {
      current.classList.remove(activeClass);
    }

    next.classList.add(activeClass);
  });
};

export default typeAhead;
