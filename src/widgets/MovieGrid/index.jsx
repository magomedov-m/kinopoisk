import React, { useEffect, useState } from "react";
import { fetchMoviesByCategory } from "../../shared/api/kinopoisk";
import MovieCard from "../../entities/movie/MovieCard";
import Loader from "../../shared/ui/Loader";
import EmptyState from "../../shared/ui/EmptyState";

// ОПТИМИЗАЦИЯ 1: useEffect с пустым массивом зависимостей [] отсутствует, что правильно.
// Однако, fetchMovies создаётся при каждом рендере. Следует обернуть в useCallback:
// const fetchMovies = useCallback(async () => { ... }, [category]);
// Также рекомендуется добавить useMemo для мемоизации результатов, если они используются повторно.

export default function MovieGrid({ category, onAddToFavourites }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMoviesByCategory(category);
        setMovies(data.movies || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category]);

  if (loading) return <Loader />;
  if (!movies.length) return <EmptyState text="Фильмы не найдены 😕" />;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onAddToFavourites={onAddToFavourites}
        />
      ))}
    </div>
  );
}
