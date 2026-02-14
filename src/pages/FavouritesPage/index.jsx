import Header from "../../widgets/Header";
import MovieGrid from "../../widgets/MovieGrid";

export default function FavouritesPage() {
  return (
    <>
      <Header />
      <h1 style={{ paddingLeft: 20 }}>Избранное</h1>
      <MovieGrid favourites />
    </>
  );
}