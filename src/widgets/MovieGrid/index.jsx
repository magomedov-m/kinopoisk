import { useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../shared/api/kinopoisk";
import Loader from "../../shared/ui/Loader";
import EmptyState from "../../shared/ui/EmptyState";
import MovieCard from "../../entities/movie/MovieCard";
import MovieFavouriteCard from "../../entities/movie/MovieFavouriteCard";
import { useFavourites } from "../../features/favourites/context";

export default function MovieGrid({ genre, favourites = false }) {
  const { items } = useFavourites();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(!favourites);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favourites) return;

    setLoading(true);
    fetchMoviesByGenre(genre)
      .then(setMovies)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [genre, favourites]);

  if (loading) return <Loader />;
  if (error) return <EmptyState text="Ошибка загрузки 😢" />;

  const data = favourites ? items : movies;

  if (!data.length) return <EmptyState text="Тут пусто 😕" />;

  return (
    <div className="grid">
      {favourites
        ? data.map((m) => <MovieFavouriteCard key={m.id} movie={m} />)
        : data.map((m) => <MovieCard key={m.id} movie={m} />)}
    </div>
  );
}