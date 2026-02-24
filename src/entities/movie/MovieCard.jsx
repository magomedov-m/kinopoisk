import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavourites } from "../../features/favourites/context";
import { useCallback } from "react";

const MovieCard = React.memo(function MovieCard({ movie }) {
  console.log(movie)
  const navigate = useNavigate();
  const { toggle, isFavourite } = useFavourites();
  const fav = isFavourite(movie.id);

  const rating = movie.rating?.kp || movie.rating?.imdb;

  const handleCardClick = useCallback(() => {
    navigate(`/movie/${movie.id}`);
  }, [navigate, movie.id]);

  const handleToggleFavourite = useCallback(
    (e) => {
      e.stopPropagation();
      toggle(movie);
    },
    [toggle, movie],
  );

  return (
    <div className="movieCard" onClick={handleCardClick}>
      <div className="movieCard__poster">
        {movie.poster?.previewUrl && (
          <img src={movie.poster.previewUrl} alt={movie.name || ""} />
        )}

        {rating && <div className="rating-badge">★ {rating.toFixed(1)}</div>}

        <button
          className={`movieCard__heart ${fav ? "active" : ""}`}
          onClick={handleToggleFavourite}
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
});

export default MovieCard;