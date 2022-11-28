import * as basicLightbox from 'basiclightbox';

export function createModalMarkUp(
  {
    id,
    poster,
    title,
    originalTitle,
    genres,
    popularity,
    overview,
    vote_average,
    vote_count,
  },
  stringifiedJSONFilmData
) {
  const instance = basicLightbox.create(
    `
   <div class="lightbox-modal">
   <button
      data-map-close
      class="lightbox-modal__close-btn"
      aria-label="close modal window"
    >&#10005;
    </button>
  <div class="lightbox-modal__img-wrapper">
 <img class="lightbox-modal__image"
  src="${poster}"
  alt="${title}"/>
  <a href="#" class="lightbox-modal__trailer is-hidden">
  <span class="lightbox-modal__trailer-icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
</svg>
  </span>Trailer
  </a>
</div>

<div class="lightbox-modal__data">
<p class="lightbox-modal__title" data-title>${title}</p>

<div class="lightbox-modal__meta">
<div class="lightbox-modal__meta-title">
<ul class="lightbox-modal__meta-title-list">
<li class="lightbox-modal__meta-title-list-item">Vote / Votes</li>
<li class="lightbox-modal__meta-title-list-item">Popularity</li>
<li class="lightbox-modal__meta-title-list-item">Original Title</li>
<li class="lightbox-modal__meta-title-list-item">Genre</li>
</ul>
</div>

<div class="lightbox-modal__meta-value">
<ul class="lightbox-modal__meta-value-list">
<li class="lightbox-modal__meta-value-list-item"><span class="lightbox-modal__meta-value-vote" data-vote>${vote_average}</span><span class="lightbox-modal__meta-value-votes-divider">/</span><span class="lightbox-modal__meta-value-votes" data-votes>${vote_count}</span></li>
<li class="lightbox-modal__meta-value-list-item"><span data-popularity>${popularity}</span></li>
<li class="lightbox-modal__meta-value-list-item"><span class="lightbox-modal__meta-value-title" data-original-title>${originalTitle}</span></li>
<li class="lightbox-modal__meta-value-list-item"><span data-genre>${genres}</span></li>
</ul>
</div>
</div>

<p class="lightbox-modal__description">
<span class="lightbox-modal__description-title">About</span>
${overview}
</p>

<div class="lightbox-modal__buttons">
<button type="button" class="lightbox-modal__watched-button" data-id='${stringifiedJSONFilmData}'>Add to Watched</button>
<button type="button" class="lightbox-modal__queque-button" data-id='${stringifiedJSONFilmData}'>Add to queue</button>
</div>

</div>`,
    {
      onShow: instance => {
        instance.element().querySelector('.lightbox-modal__close-btn').onclick =
          instance.close;
        window.addEventListener('keydown', event => {
          if (event.code === 'Escape' || event.code === 'Space') {
            instance.close();
            window.removeEventListener;
          }
        });
      },
      onClose: instance => { },
    }
  );
  instance.show();
}
