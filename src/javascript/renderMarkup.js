export function renderMarkup(data, genres) {
  const {
    id,
    genre_ids,
    poster_path,
    original_title,
    release_date,
    vote_average,
  } = data;
  const posterPath = data.poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : `https://astoriamuseums.org/wp-content/uploads/2020/10/OFM-poster-not-available.png`;
  const releaseYear = new Date(Date.parse(release_date)).getFullYear();

  return `<li class="gallery__item movie-card" data-id="${id}">
                  <div class="movie-card__poster-thumb">
                    <img src="${posterPath}"
                        class="movie-card__poster"
                        alt="${original_title}"
                                            />
                  </div>
                  <div class="movie-card__wrap">
                      <h2 class="movie-info-title"> ${original_title}</h2>
                      <div class="movie-info-list">
                      <p class="info-item-genre">${genres}</p>
                        <span class="info-item-slash"> | </span>
                        <p class="info-item-year">${releaseYear}</p>
                      </div>
                  </div>
            </li>`;
}
