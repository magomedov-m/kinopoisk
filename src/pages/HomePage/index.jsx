import { useState } from "react";
import Header from "../../widgets/Header";
import Categories from "../../widgets/Categories";
import MovieGrid from "../../widgets/MovieGrid";

export default function HomePage() {
  const [genre, setGenre] = useState("криминал");

  return (
    <>
      <Header />
      <Categories value={genre} onChange={setGenre} />
      <MovieGrid genre={genre} />
    </>
  );
}