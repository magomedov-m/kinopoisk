import { FaHeart } from "react-icons/fa";
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
      <div className="favourites-page__header">
        <h1 className="favourites-page__title">
          <FaHeart /> Избранное
        </h1>
        <p className="favourites-page__count">{favourites.length} фильмов</p>
      </div>
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
