const API_URL = "https://api.kinopoisk.dev/v1.4/movie";

export async function fetchMoviesByGenre(genre) {
  const res = await fetch(`${API_URL}?year=2021&genres.name=${genre}`, {
    headers: {
      "X-API-KEY": process.env.REACT_APP_KINOPOISK_KEY,
    },
  });

  if (!res.ok) throw new Error("Ошибка загрузки");

  const data = await res.json();
  return data.docs;
}