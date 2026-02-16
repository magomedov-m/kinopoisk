import { MdDelete } from "react-icons/md";
import { useFavourites } from "../../features/favourites/context";

export default function MovieFavouriteCard({ movie }) {
  const { removeFromFavourites } = useFavourites();

  return (
    <div className="movieCard">
      <img src={movie.poster?.previewUrl} alt="" />
      <h3>{movie.alternativeName}</h3>

      <button onClick={() => removeFromFavourites(movie.id)}>
        <MdDelete />
      </button>
    </div>
  );
}