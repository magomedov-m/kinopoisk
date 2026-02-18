import React, { useState } from "react";
import Categories from "../../widgets/Categories";
import MovieGrid from "../../widgets/MovieGrid";

const allCategories = [
  "триллер",
  "криминал",
  "драма",
  "боевик",
  "фантастика",
  "мелодрама",
  "детектив",
  "ужасы",
  "мультфильмы",
  "приключения",
  "фэнтези",
];

export default function HomePage({ onAddToFavourites }) {
  const [selectedCategory, setSelectedCategory] = useState("криминал");

  return (
    <div className="home-page">
      <div className="home-page__categories">
        <Categories
          categories={allCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div className="home-page__grid">
        <MovieGrid
          category={selectedCategory}
          onAddToFavourites={onAddToFavourites}
        />
      </div>
    </div>
  );
}
