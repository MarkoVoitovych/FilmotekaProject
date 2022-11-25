import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';

import { set, get, remove, clear } from './javascript/localStorageUse';
import { refs } from './javascript/refs';
import { renderMarkup } from './javascript/renderMarkup';
import { ThemoviedbAPI } from './javascript/themoviedbAPI';
import './javascript/footerModal';

const themoviedbAPI = new ThemoviedbAPI();

try {
  startPage();
} catch (error) {
  console.log(error);
}

async function startPage() {
  const trendMovies = await themoviedbAPI.fetchFavouritesMovies();
  const markup = trendMovies.results.map(renderMarkup).join('');
  refs.gallery.innerHTML = markup;
}

startPage();
