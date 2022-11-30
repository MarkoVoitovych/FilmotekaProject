import BigPicture from 'bigpicture';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from './javascript/refs';
import { renderMarkup } from './javascript/renderMarkup';
import { ThemoviedbAPI } from './javascript/themoviedbAPI';
import { getItems } from './javascript/movie-modal';
import { spinnerPlay, spinnerStop } from './javascript/spiner';
import { callfooterModal } from './javascript/footerModal';
import { scrollFunction } from './javascript/scroll';
import { renderGenres } from './javascript/renderGenres';
import './javascript/movie-modal';

export const themoviedbAPI = new ThemoviedbAPI();
const pagination = new Pagination(refs.paginationContainer, refs.paginOptions);
const page = pagination.getCurrentPage();
export let allProducts = null;

try {
  spinnerPlay();
  startPage();
  refs.footerLink.addEventListener("click", callfooterModal);
  window.addEventListener('scroll', scrollFunction);
} catch (error) {
  console.log(error);
} finally {
  spinnerStop();
}

refs.formEl.addEventListener('submit', onSearchFormSubmit);
pagination.on('beforeMove', loadMoreFavouritesMovies);

async function startPage() {
  const genresIds = await themoviedbAPI.fetchGenres();
  const trendMovies = await themoviedbAPI.fetchFavouritesMovies(page);

  pagination.reset(trendMovies.total_results);

  const markup = trendMovies.results
    .map(movie => {
      const genres = renderGenres(movie)
      return renderMarkup(movie, genres);
    })
    .join('');
  refs.gallery.innerHTML = markup;
  allProducts = [...getItems()];
}

async function onSearchFormSubmit(event) {
  event.preventDefault();
  themoviedbAPI.query = event.target.elements.search.value;

  
  try {
    spinnerPlay()
    const searchMovies = await themoviedbAPI.fetchMoviesByQuery(page);
    
    const markup = searchMovies.results.map(movie => {
      const genres = renderGenres(movie)
      return renderMarkup(movie, genres);
    }).join('');

    pagination.off('beforeMove', loadMoreFavouritesMovies);
    pagination.off('beforeMove', loadMoreMoviesByQuery);
    pagination.on('beforeMove', loadMoreMoviesByQuery);
    pagination.reset(searchMovies.total_results);

    refs.gallery.innerHTML = markup;
    allProducts = [...getItems()];

    if (searchMovies.results.length === 0) {
      refs.formEl.insertAdjacentHTML("afterend", `<div class="input-error">
       Search result not successful. Enter the correct movie and name  
      </div>`)
      refs.paginationContainer.style.display = 'none';
    } else {
      refs.paginationContainer.style.display = 'block';
    }
  } catch (err) {
    
    console.log(err);
  } finally {
    spinnerStop()
  }
  event.target.reset();
};

//  -------------------  PAGINATION  --------------------

async function loadMoreFavouritesMovies(event) {

  const currentPage = event.page;
  try {
    spinnerPlay()
    const genresIds = await themoviedbAPI.fetchGenres();
    const trendMovies = await themoviedbAPI.fetchFavouritesMovies(currentPage);

    const markup = trendMovies.results
      .map(movie => {
        const genres = renderGenres(movie)
        return renderMarkup(movie, genres);
      })
      .join('');
    refs.gallery.innerHTML = markup;
    allProducts = [...getItems()];
  } catch (error) {
    console.log(error);
  } finally {
    spinnerStop();
  }
};

async function loadMoreMoviesByQuery(event) {
  const currentPage = event.page;
  try {
    spinnerPlay();
    const searchMovies = await themoviedbAPI.fetchMoviesByQuery(currentPage);
    const markup = searchMovies.results.map(movie => {
      const genres = renderGenres(movie)
      return renderMarkup(movie, genres);
    }).join('');
    refs.gallery.innerHTML = markup;
    allProducts = [...getItems()];
  } catch (error) {
    console.log(error);
  } finally {
    spinnerStop();
  }
};

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



// EMPTY GALLERY
// const main = document.querySelector('.main-container--gallery');

// export default function getWatched() {
//   const fromLSWatched = localStorage.getItem('watched');

//   // clearMain();
//   if (fromLSWatched === '[]' || fromLS === null) {
//     clearMain();
//     main?.classList.add('.perspective');
//     return refs.main.insertAdjacentHTML(
//       'afterbegin',
//       `<h1 class="js-title-queue preserve">Your list is empty...</h1>
//       <img src="./images/movie.png" alt="cinema" />
//       <div class="cloak__wrapper preserve">
//         <div class="cloak__container preserve">
//           <div class="cloak preserve"></div>
//         </div>
//       </div>`
//     );
//   }
//   main?.classList.remove('.perspective');
//   // clearMain();
//   const arrayFilms = JSON.parse(fromLSWatched);
//   arrayFilms.reverse();
//   renderMarkup(arrayFilms);
// }

// function clearMain() {
//   main.innerHTML = ' ';
// }
