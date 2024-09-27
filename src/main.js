import { fetchImages } from "./js/pixabay-api.js";
import { renderImages, clearGallery, showNotification, showError } from "./js/render-functions.js";
import 'css-loader'; 


const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');
const galleryContainer = document.querySelector('.gallery');

let searchQuery = '';
let currentPage = 1;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.query.value.trim();

  if (!searchQuery) {
    showError('Search query cannot be empty.');
    return;
  }

  currentPage = 1;
  clearGallery();
  fetchAndRenderImages();
});

loadMoreButton.addEventListener('click', () => {
  currentPage += 1;
  fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  try {
    showLoader();
    const data = await fetchImages(searchQuery, currentPage);
    hideLoader();

    if (data.hits.length === 0 && currentPage === 1) {
      showNotification('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderImages(data.hits);

  
    if (data.totalHits > currentPage * data.hits.length) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    hideLoader();
    showError('Failed to load images. Please try again.');
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}











