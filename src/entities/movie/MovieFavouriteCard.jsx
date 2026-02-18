import { MdDelete } from "react-icons/md";
import { useFavourites } from "../../features/favourites/context";

export default function MovieFavouriteCard({ movie }) {
  const { removeFromFavourites } = useFavourites();

  return (
    <div className="favCard">
      <img
        src={movie.poster?.previewUrl || movie.poster?.url || ""}
        alt={movie.alternativeName || movie.name || "Фильм"}
      />

      <h3 className="favCard__title">{movie.alternativeName || movie.name}</h3>

      {movie.genres && movie.genres.length > 0 && (
        <p className="favCard__genres">
          {movie.genres.map((g) => g.name).join(", ")}
        </p>
      )}

      {movie.countries && movie.countries.length > 0 && (
        <p className="favCard__countries">
          {movie.countries.map((c) => c.name).join(", ")}
        </p>
      )}

      <button
        className="favCard__delete"
        onClick={() => removeFromFavourites(movie.id)}
      >
        <MdDelete />
      </button>
    </div>
  );
}
