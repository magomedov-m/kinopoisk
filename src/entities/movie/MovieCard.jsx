import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavourites } from "../../features/favourites/context";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { toggle, isFavourite } = useFavourites();
  const fav = isFavourite(movie.id);

  const rating = movie.rating?.kp || movie.rating?.imdb;

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movieCard" onClick={handleCardClick}>
      <div className="movieCard__poster">
        {movie.poster?.previewUrl && (
          <img src={movie.poster.previewUrl} alt={movie.name || ""} />
        )}

        {rating && <div className="rating-badge">★ {rating.toFixed(1)}</div>}

        <button
          className={`movieCard__heart ${fav ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggle(movie);
          }}
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

        {movie.genres && movie.genres.length > 0 && (
          <div className="movieCard__genres">
            {movie.genres
              .slice(0, 2)
              .map((g) => g.name)
              .join(", ")}
          </div>
        )}

        {movie.shortDescription && (
          <p className="movieCard__description">{movie.shortDescription}</p>
        )}
      </div>
    </div>
  );
}
