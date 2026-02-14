const API_KEY = "1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT";
const BASE_URL = "https://api.kinopoisk.dev/v1.4/movie";

export const fetchMoviesByCategory = async (category, year = 2021) => {
  try {
    const response = await fetch(`${BASE_URL}?year=${year}&genres.name=${category}`, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP статус: ${response.status}`);
    }

    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Ошибка при получении фильмов:", error);
    return [];
  }
};