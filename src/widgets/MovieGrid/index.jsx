import React, { useEffect, useState } from "react";
import { fetchMoviesByCategory } from "../../shared/api/kinopoisk";
import MovieCard from "../../entities/movie/MovieCard";
import Loader from "../../shared/ui/Loader";
import EmptyState from "../../shared/ui/EmptyState";

export default function MovieGrid({ category, onAddToFavourites }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await fetchMoviesByCategory(category);
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, [category]);

  if (loading) return <Loader />;
  if (!movies.length) return <EmptyState text="Фильмы не найдены 😕" />;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onAddToFavourites={onAddToFavourites} />
      ))}
    </div>
  );
}