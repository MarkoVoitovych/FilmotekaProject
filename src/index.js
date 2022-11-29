import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';

import { set, get, remove, clear } from './javascript/localStorageUse';
import { refs } from './javascript/refs';
import { renderMarkup } from './javascript/renderMarkup';
import { ThemoviedbAPI } from './javascript/themoviedbAPI';

import { getItems } from './javascript/movie-modal';
import BigPicture from 'bigpicture';
import './javascript/movie-modal';
import './javascript/footerModal';

const themoviedbAPI = new ThemoviedbAPI();

try {
  startPage();
} catch (error) {
  console.log(error);
}

export let allProducts = null;

async function startPage() {
  const genresIds = await themoviedbAPI.fetchGenres();
  const trendMovies = await themoviedbAPI.fetchFavouritesMovies();

  const markup = trendMovies.results
    .map(movie => {
      const genresName = [];

      movie.genre_ids.forEach(genre => {
        themoviedbAPI.genres.forEach(item => {
          if (item.id === genre) {
            genresName.push(item.name);
          }
        });
      });
      if (genresName.length > 2) {
        genresName.splice(2, genresName.length - 1, 'Other');
      }
      return renderMarkup(movie, genresName.join(', '));
    })
    .join('');
  refs.gallery.innerHTML = markup;
  allProducts = [...getItems()];
}

//  HEADER

const onSearchFormSubmit = async event => {
  event.preventDefault();
  themoviedbAPI.query = event.target.elements.search.value;
  console.log(refs.formEl.elements.search);

  try {
    const searchMovies = await themoviedbAPI.fetchMoviesByQuery();
    const markup = searchMovies.results
    .map(movie => {
      const genresName = [];

      movie.genre_ids.forEach(genre => {
        themoviedbAPI.genres.forEach(item => {
          if (item.id === genre) {
            genresName.push(item.name);
          }
        });
      });
      if (genresName.length > 2) {
        genresName.splice(2, genresName.length - 1, 'Other');
      }
      return renderMarkup(movie, genresName.join(', '));
    })
    .join('');
    refs.gallery.innerHTML = markup;
    allProducts = [...getItems()];
  } catch (err) {
    refs.formEl.insertAdjacentHTML("afterend", 
    `<div class='input-error'>
    Search result not successful. Enter the correct movie and name 
    </div>`)
  }
  event.target.reset();
};

refs.formEl.addEventListener('submit', onSearchFormSubmit);

// SPINNER

// function spinnerPlay() {
//   document.querySelector('body').classList.add('loading');
// }

// function spinnerStop() {
//   window.setTimeout(function () {
//     document.querySelector('body').classList.remove('loading');
//     document.querySelector('body').classList.add('loaded');
//   }, 1500);
// }

// spinnerPlay();

// window.addEventListener('load', () => {
//   console.log('All resources finished loading!');

//   spinnerStop();
// });

//THEME

// const Theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };

// const THEME_STORAGE_KEY = 'theme';
// const inputRef = document.querySelector('.theme-switch__toggle');

// const load = key => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };

// const save = (key, value) => {
//   try {
//     const serializedState = JSON.stringify(value);
//     localStorage.setItem(key, serializedState);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   }
// };

// const initPage = () => {
//   const savedChecked = load(THEME_STORAGE_KEY);
//   inputRef.checked = savedChecked;
//   document.body.className = savedChecked ? Theme.DARK : Theme.LIGHT;
// };

// initPage();

// const onThemeSwitch = event => {
//   const { checked } = event.target;

//   document.body.className = checked ? Theme.DARK : Theme.LIGHT;
//   save(THEME_STORAGE_KEY, checked);
// };

// inputRef.addEventListener('change', onThemeSwitch);

// // SCROLL

// const btnUp = document.getElementById('to-top-btn');
// const btnUpWrapper = document.querySelector('.btn-up');

// function scrollPage() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

// window.addEventListener('scroll', () => {
//   scrollFunction();
// });

// function scrollFunction() {
//   if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
//     btnUpWrapper.style.display = 'flex';
//   } else {
//     btnUpWrapper.style.display = 'none';
//   }
// }
// btnUp.addEventListener('click', () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// });

// EMPTY GALLERY
const main = document.querySelector('.main-container--gallery');

export default function getWatched() {
  const fromLSWatched = localStorage.getItem('watched');

  // clearMain();
  if (fromLSWatched === '[]' || fromLS === null) {
    clearMain();
    main?.classList.add('.perspective');
    return refs.main.insertAdjacentHTML(
      'afterbegin',
      `<h1 class="js-title-queue preserve">Your list is empty...</h1>
      <img src="./images/movie.png" alt="cinema" />
      <div class="cloak__wrapper preserve">
        <div class="cloak__container preserve">
          <div class="cloak preserve"></div>
        </div>
      </div>`
    );
  }
  main?.classList.remove('.perspective');
  // clearMain();
  const arrayFilms = JSON.parse(fromLSWatched);
  arrayFilms.reverse();
  renderMarkup(arrayFilms);
}

function clearMain() {
  main.innerHTML = ' ';
}
