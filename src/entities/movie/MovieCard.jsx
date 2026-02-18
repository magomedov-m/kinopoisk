import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavourites } from "../../features/favourites/context";

export default function MovieCard({ movie }) {
  const { toggle, isFavourite } = useFavourites();
  const fav = isFavourite(movie.id);

  return (
    <div className="movieCard">
      <div className="movieCard__poster">
        {movie.poster?.previewUrl && (
          <img src={movie.poster.previewUrl} alt={movie.name || ""} />
        )}

        <button
          className={`movieCard__heart ${fav ? "active" : ""}`}
          onClick={() => toggle(movie)}
        >
          {fav ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="movieCard__info">
        <h3 className="movieCard__title">
          {movie.name || movie.alternativeName}
        </h3>

        {movie.year && (
          <div className="movieCard__meta">
            <span>{movie.year}</span>
            {movie.type && <span> • {movie.type}</span>}
          </div>
        )}

        {movie.rating?.imdb && (
          <div className="movieCard__rating">
            IMDb: {movie.rating.imdb}
          </div>
        )}

        {movie.genres && (
          <div className="movieCard__genres">
            {movie.genres.map((g) => g.name).join(", ")}
          </div>
        )}

        {movie.shortDescription && (
          <p className="movieCard__description">
            {movie.shortDescription.slice(0, 100)}...
          </p>
        )}
      </div>
    </div>
  );
}
