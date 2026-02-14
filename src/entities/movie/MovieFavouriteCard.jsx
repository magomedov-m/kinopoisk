import { MdDelete } from "react-icons/md";
import { useFavourites } from "../../features/favourites/context";

export default function MovieFavouriteCard({ movie }) {
  const { remove } = useFavourites();

  return (
    <div className="movieCard">
      <img src={movie.poster?.previewUrl} alt="" />
      <h3>{movie.alternativeName}</h3>

      <button onClick={() => remove(movie.id)}>
        <MdDelete />
      </button>
    </div>
  );
}