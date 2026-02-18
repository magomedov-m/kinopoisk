import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavourites } from "../../features/favourites/context";

export default function MovieCard({ movie }) {
  const { toggle, isFavourite } = useFavourites();
  const fav = isFavourite(movie.id);
  console.log(movie);

  return (
    <div className="movieCard">
      {movie.poster?.previewUrl && (
        <img src={movie.poster.previewUrl} alt={movie.name || ''} />
      )}
      
      {movie.name && <h2>{movie.name}</h2>}
      
      {movie.alternativeName && <h3>{movie.alternativeName}</h3>}
      
      {movie.description && <p>{movie.description}</p>}
      
      {movie.year && <span>{movie.year}</span>}
      
      {movie.description?.countries && (
        <div>Страны: {movie.description.countries.join(', ')}</div>
      )}
      
      {movie.rating?.imdb && (
        <div>IMDb: {movie.rating.imdb}</div>
      )}
      
      {movie.rating?.kp && (
        <div>КиноПоиск: {movie.rating.kp}</div>
      )}
      
      {movie.genres && (
        <div>Жанры: {movie.genres.map(g => g.name).join(', ')}</div>
      )}
      
      {movie.type && <div>Тип: {movie.type}</div>}
      
      {movie.shortDescription && (
        <p>{movie.shortDescription}</p>
      )}
      
      <button onClick={() => toggle(movie)}>
        {fav ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
    </div>
  );
}
