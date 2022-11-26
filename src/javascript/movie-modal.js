import { refs } from './refs';
import { allProducts } from '/src/index';
import { createModalMarkUp } from './renderMarkup';
import { ThemoviedbAPI } from './themoviedbAPI';
import BigPicture from 'bigpicture';

const movieAPI = new ThemoviedbAPI();

export function getItems() {
  const lightboxedCard = refs.gallery.childNodes;
  const allProducts = [...lightboxedCard];
  lightboxedCard.forEach(item => item.addEventListener('click', openLightbox));
  return allProducts;
}

function getSelectedItem(event, array) {
  const selectedProduct = array.find(
    item => item.dataset.id === event.currentTarget.dataset.id
  );
  return selectedProduct;
}

function openLightbox(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'LI' && event.target.nodeName !== 'IMG') {
    return;
  }
  if (
    event.target.nodeName === 'LI' ||
    event.target.nodeName === 'IMG' ||
    event.target.nodeName === 'H2'
  ) {
    onFilmCardClick(event);
  }
}

async function onFilmCardClick(event) {
  const selectedProduct = await getSelectedItem(event, allProducts);

  const filmId = selectedProduct.dataset.id;

  try {
    movieAPI.fetchMovieById(filmId).then(result => {
      // console.log(result);
      const data = result;
      const posterPath = data.poster_path
        ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
        : `https://astoriamuseums.org/wp-content/uploads/2020/10/OFM-poster-not-available.png`;

      const filmData = {
        id: data.id,
        poster: posterPath,
        title: data.title,
        originalTitle: data.original_title,
        genres: [],
        popularity: data.popularity,
        overview: data.overview,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
      };

      data.genres.forEach(genre => {
        filmData.genres.push(genre.name);
      });
      filmData.genres = filmData.genres.join(', ');

      createModalMarkUp(filmData);

      getTrailer(filmId);

      const addToWatchedBtn = document.querySelector(
        '.lightbox-modal__watched-button'
      );

      const addToQuequeBtn = document.querySelector(
        '.lightbox-modal__queque-button'
      );

      addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
      addToQuequeBtn.addEventListener('click', onAddToQuequeClick);
    });
  } catch {
    er => {
      console.log(er);
    };
  }
}

function getTrailer(filmId) {
  try {
    movieAPI.fetchTrailerById(filmId).then(result => {
      const trailers = result.results;
      if (trailers.length > 0) {
        const trailerBtn = document.querySelector('.lightbox-modal__trailer');
        trailerBtn.classList.remove('is-hidden');
        const officialTrailer = trailers.find(
          el => el.name === 'Official Trailer' || el.name.includes('Official')
        );
        const trailerKey = officialTrailer.key;

        trailerBtn.addEventListener('click', ontrailerBtnClick);

        function ontrailerBtnClick(e) {
          BigPicture({
            el: e.target,
            ytSrc: `${trailerKey}`,
          });
        }
      }
    });
  } catch {
    er => {
      console.log(er);
    };
  }
}

function onAddToWatchedClick(event) {
  event.preventDefault();
  event.target.textContent = 'Added to watched';
  event.target.disabled = true;
}

function onAddToQuequeClick(event) {
  event.preventDefault();
  event.target.textContent = 'Added to queque';
  event.target.disabled = true;
}
