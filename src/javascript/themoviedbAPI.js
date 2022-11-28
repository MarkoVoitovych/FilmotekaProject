import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class ThemoviedbAPI {
  #API_KEY = '663bd5fd8d905b7ce2d57e9867d3492e';
  #page = 1;
  #perPage = 20;
  #totalMovies = 0;
  #query = '';
  genres = [];

  constructor() {
    this.WATCH_KEY = 'Watched';
    this.QUEUE_KEY = 'Queue';
  }
  async fetchFavouritesMovies() {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
    });

    const { data } = await axios.get('/trending/movie/week', { params });
    return data;
  }

  async fetchMoviesByQuery() {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      query: this.#query,
      page: this.#page,
    });

    const { data } = await axios.get('/search/movie', { params });
    return data;
  }

  async fetchMovieById(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
    });
    return await fetch(
      `https://api.themoviedb.org/3/movie/${id}?${params}`
    ).then(response => {
      if (!response.ok) {
        throw new Error('Oops, there is no movie with that name');
      }
      return response.json();
    });
  }

  async fetchTrailerById(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
    });
    return await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?${params}`
    ).then(response => {
      if (!response.ok) {
        throw new Error('Oops, there is no movie with that name');
      }
      return response.json();
    });
  }

  async fetchGenres() {
    const params = new URLSearchParams({
      api_key: '663bd5fd8d905b7ce2d57e9867d3492e',
    });
    const allGenres = await axios.get('/genre/movie/list', { params });
    this.genres = allGenres.data.genres;

    return allGenres;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  setTotal(totalMovies) {
    this.#totalMovies = totalMovies;
  }

  hasMorePages() {
    return this.#page < Math.ceil(this.#totalMovies / this.#perPage);
  }
}
