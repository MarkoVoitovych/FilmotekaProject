import axios from 'axios';
import { set } from './localStorageUse';
import { gallery, library } from './refs';

// const gallery = document.querySelector('.gallery');

const getMovieGenres = async () => {
  const { data } = await axios.get(
    `/genre/movie/list?api_key=663bd5fd8d905b7ce2d57e9867d3492e`
  );
  return data;
};

async function getGenres() {
  const genres = await getMovieGenres().then(({ genres }) => genres);
  return { genres };
}

export function renderMarkup(data) {
  getGenres().then(({ genres }) => {
    //add genres to localStorage
    set('genresList', genres);

    if (data.results) {
      data.results.forEach(film => {
        const { genre_ids, release_date } = film;

        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1, 'Other');
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          film.genre_names = genre_ids.join(', ');

          if (release_date === 0 || release_date === undefined)
            release_date = '';

          if (film.release_date) {
            film.release_date = release_date.slice(0, 4);
          }
        });
      });
    }
    const markupList = createListMarkup(data.results);
    if (gallery) {
      gallery.innerHTML = markupList;
    }
  });
}

function createListMarkup(data) {
  if (data) {
    return data
      .map(({ id, poster_path, genre_ids, original_title, release_date }) => {
        return `<li class="gallery__item" >        
                <div class="movie-card" id="${id}">
                  <div class="movie-card__poster-container"> ${
                    poster_path
                      ? `<img src="https://image.tmdb.org/t/p/w300${poster_path}"`
                      : `<img src="https://astoriamuseums.org/wp-content/uploads/2020/10/OFM-poster-not-available.png"`
                  }
                        class="movie-card__poster"
                        alt="${original_title}"
                        loading="lazy"
                    />
                  </div>
                  <div class="movie-card__thumb">
                      <h2 class="movie-info-title"> ${original_title}</h2>
                      <div class="movie-info-list">
                        <p class="info-item">${genre_ids}</p>  
                        <span class="info-item-slash"> | </span>  
                        <p class="info-item-year">${release_date?.slice(
                          0,
                          4
                        )}</p>
                      </div>
                  </div>
                </div>
            </li>`;
      })
      .join('');
  }
}

export function renderLibraryMarkup(data) {
  getGenres().then(({ genres }) => {
    set('genresList', genres);

    if (data.results) {
      data.results.forEach(film => {
        const { genre_ids, release_date } = film;
        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1, 'Other');
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          film.genre_names = genre_ids.join(', ');
          if (film.release_date) {
            film.release_date = release_date.slice(0, 4);
          }
        });
      });
    }
    const markupLibraryList = createLibraryMarkup(data.results);
    if (library) {
      library.innerHTML = markupLibraryList;
    }
  });
}

function createLibraryMarkup(data) {
  if (data) {
    return data
      .map(
        ({
          id,
          poster_path,
          genre_ids,
          original_title,
          release_date,
          vote_average,
        }) => {
          return `<li class="gallery__item" >        
                <div class="movie-card" id="${id}">
                  <div class="movie-card__poster-container"> ${
                    poster_path
                      ? `<img src="https://image.tmdb.org/t/p/w300${poster_path}"`
                      : `<img src="https://astoriamuseums.org/wp-content/uploads/2020/10/OFM-poster-not-available.png"`
                  }
                        class="movie-card__poster"
                        alt="${original_title}"
                        loading="lazy"
                    />
                  </div>
                  <div class="movie-card__thumb">
                      <h2 class="movie-info-title"> ${original_title}</h2>
                      <div class="movie-info-list">
                        <p class="info-item">${genre_ids}</p>  
                        <span class="info-item-slash"> | </span>  
                        <p class="info-item-year">${release_date?.slice(
                          0,
                          4
                        )}</p>
                        <p class="info-item-vote">${vote_average.toFixed(1)}</p>
                      </div>
                  </div>
                </div>
            </li>`;
        }
      )
      .join('');
  }
}
