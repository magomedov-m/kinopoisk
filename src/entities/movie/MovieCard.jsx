import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavourites } from "../../features/favourites/context";

export default function MovieCard({ movie }) {
  const { toggle, isFavourite } = useFavourites();
  const fav = isFavourite(movie.id);

  return (
    <div className="movieCard">
      <img src={movie.poster?.previewUrl} alt="" />

      <button onClick={() => toggle(movie)}>
        {fav ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>

      <h3>{movie.alternativeName}</h3>
      <span>{movie.year}</span>
      <div>imdb {movie.rating?.imdb}</div>
    </div>
  );
}