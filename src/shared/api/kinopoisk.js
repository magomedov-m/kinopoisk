// const API_KEY = "1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT";
const API_KEY = "PYWN56W-C3GMT96-Q8V88PF-B9QY35K";
const BASE_URL = "https://api.kinopoisk.dev/v1.4/movie";
const SEARCH_URL = "https://api.kinopoisk.dev/v1.4/movie/search";

/**
 * Базовый запрос к API с обработкой ошибок
 */
const fetchFromAPI = async (params = {}, useSearchEndpoint = false) => {
  try {
    // Формируем параметры запроса
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.query) queryParams.append("query", params.query);
    if (params.year) queryParams.append("year", params.year);
    if (params.genreName) queryParams.append("genres.name", params.genreName);
    if (params.type) queryParams.append("type", params.type);
    if (params.ratingKp) queryParams.append("rating.kp", params.ratingKp);
    if (params.ratingImdb) queryParams.append("rating.imdb", params.ratingImdb);
    if (params.votesKp) queryParams.append("votes.kp", params.votesKp);
    if (params.sortField) queryParams.append("sortField", params.sortField);
    if (params.sortType !== undefined) queryParams.append("sortType", params.sortType);

    const baseUrl = useSearchEndpoint ? SEARCH_URL : BASE_URL;
    const url = `${baseUrl}?${queryParams.toString()}`;
    console.log("API URL:", url);

    const response = await fetch(url, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP статус: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка API:", error);
    throw error;
  }
};

/**
 * Оставляем только фильмы с постером
 */
const filterWithPoster = (movies) => {
  return movies?.filter(
    (movie) => movie.poster?.previewUrl || movie.poster?.url
  ) || [];
};

/**
 * Получить фильмы по категории (жанру)
 */
export const fetchMoviesByCategory = async (category, year = 2024, page = 1, limit = 5) => {
  const data = await fetchFromAPI({
    page,
    limit,
    year,
    genreName: category,
    sortField: "rating.kp",
    sortType: -1,
  });

  return {
    movies: filterWithPoster(data.docs),
    total: data.total,
    pages: data.pages,
    page: data.page,
  };
};

/**
 * Поиск фильмов по названию - ИСПОЛЬЗУЕТ ОТДЕЛЬНЫЙ ЭНДПОИНТ
 */
export const searchMovies = async (query, page = 1, limit = 20) => {
  if (!query || query.trim().length < 2) {
    return { movies: [], total: 0, pages: 0, page: 1 };
  }

  // Используем专门的 эндпоинт для поиска
  const data = await fetchFromAPI({
    page,
    limit,
    query: query.trim(),
  }, true); // true = использовать SEARCH_URL

  return {
    movies: filterWithPoster(data.docs),
    total: data.total,
    pages: data.pages,
    page: data.page,
  };
};

/**
 * Расширенный поиск с фильтрами
 */
export const advancedSearch = async (filters = {}, page = 1, limit = 20) => {
  const {
    query = "",
    genre = "",
    yearFrom = "",
    yearTo = "",
    ratingKpFrom = "",
    ratingKpTo = "",
    ratingImdbFrom = "",
    ratingImdbTo = "",
    type = "",
    sortField = "rating.kp",
    sortType = -1,
  } = filters;

  const params = { page, limit, sortField, sortType };

  // Для поиска по названию используем отдельный эндпоинт
  const isNameSearch = query && query.trim().length >= 2;

  if (isNameSearch) {
    params.query = query.trim();
  }

  if (genre) params.genreName = genre;
  if (type) params.type = type;
  if (yearFrom) params.year = yearFrom;
  if (ratingKpFrom) params.ratingKp = `${ratingKpFrom},${ratingKpTo || 10}`;
  if (ratingImdbFrom) params.ratingImdb = `${ratingImdbFrom},${ratingImdbTo || 10}`;

  // Используем поисковый эндпоинт только если есть текстовый запрос
  const data = await fetchFromAPI(params, isNameSearch);

  return {
    movies: filterWithPoster(data.docs),
    total: data.total,
    pages: data.pages,
    page: data.page,
  };
};

/**
 * Получить топ фильмов по рейтингу
 */
export const fetchTopMovies = async (genre = "", page = 1, limit = 20) => {
  const params = {
    page,
    limit,
    sortField: "rating.kp",
    sortType: -1,
  };

  if (genre) params.genreName = genre;

  const data = await fetchFromAPI(params);

  return {
    movies: filterWithPoster(data.docs),
    total: data.total,
    pages: data.pages,
    page: data.page,
  };
};

/**
 * Получить популярные фильмы (по голосам)
 */
export const fetchPopularMovies = async (genre = "", page = 1, limit = 20) => {
  const params = {
    page,
    limit,
    sortField: "votes.kp",
    sortType: -1,
  };

  if (genre) params.genreName = genre;

  const data = await fetchFromAPI(params);

  return {
    movies: filterWithPoster(data.docs),
    total: data.total,
    pages: data.pages,
    page: data.page,
  };
};

/**
 * Получить фильмы по году
 */
export const fetchMoviesByYear = async (year, page = 1, limit = 20) => {
  const data = await fetchFromAPI({
    page,
    limit,
    year,
    sortField: "rating.kp",
    sortType: -1,
  });

  return {
    movies: filterWithPoster(data.docs),
    total: data.total,
    pages: data.pages,
    page: data.page,
  };
};

/**
 * Получить детальную информацию о фильме по ID
 */
export const fetchMovieById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP статус: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении фильма:", error);
    throw error;
  }
};

/**
 * Получить трейлеры/видео фильма
 */
export const fetchMovieVideos = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/videos`, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP статус: ${response.status}`);
    }

    const data = await response.json();
    // Фильтруем только трейлеры
    return data.docs?.filter(
      (video) => video.type === "trailer" || video.type === "teaser"
    ) || [];
  } catch (error) {
    console.error("Ошибка при получении видео:", error);
    return [];
  }
};