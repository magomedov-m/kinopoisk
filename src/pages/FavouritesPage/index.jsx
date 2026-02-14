import React from "react";
import { useFavourites } from "../../features/favourites/context";
import MovieFavouriteCard from "../../entities/movie/MovieFavouriteCard.jsx";
import EmptyState from "../../shared/ui/EmptyState.jsx";

export default function FavouritesPage() {
  const context = useFavourites();

  if (!context) return <div>Ошибка: контекст не найден 😢</div>;

  const { favourites, removeFromFavourites } = context;

  if (!favourites || !favourites.length)
    return <EmptyState text="Тут пока что пусто 😕" />;

  return (
    <div className="favourites-page">
      {favourites.map((movie) => (
        <MovieFavouriteCard
          key={movie.id}
          movie={movie}
          onDelete={() => removeFromFavourites(movie.id)}
        />
      ))}
    </div>
  );
}