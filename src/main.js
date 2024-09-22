const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');
let page = 1;

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showNotification('Please enter a search query');
    return;
  }

  clearGallery();
  loader.classList.remove('hidden'); 

  try {
    const data = await fetchImages(query, page);

    if (data.hits.length === 0) {
      showNotification('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderImages(data.hits);
  } catch (error) {
    showError('Something went wrong, please try again later.');
  } finally {
    loader.classList.add('hidden');  
  }
}

import { fetchImages } from './pixabay-api';
import { renderImages, clearGallery, showError, showNotification } from './render-functions';


