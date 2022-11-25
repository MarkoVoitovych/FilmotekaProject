import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';

import { set, get, remove, clear } from './javascript/localStorageUse';
import { refs } from './javascript/refs';
import { renderMarkup } from './javascript/renderMarkup';
import { ThemoviedbAPI } from './javascript/themoviedbAPI';

const themoviedbAPI = new ThemoviedbAPI();
async function fetch() {
  const data1 = await themoviedbAPI.fetchFavouritesMovies();
  //   const data2 = await themoviedbAPI.fetchMovieById();
  const data3 = await themoviedbAPI.fetchMoviesByQuery();
  console.log(data1);
  //   console.log(data2);
  console.log(data3);
}
try {
  fetch();
} catch (error) {
  console.log(error);
}
