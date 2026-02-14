import React, { useState } from "react";
import Categories from "../../widgets/Categories";
import MovieGrid from "../../widgets/MovieGrid";

const allCategories = [
  "триллер","криминал","драма","боевик","фантастика",
  "мелодрама","детектив","ужасы","мультфильмы","приключения","фэнтези"
];

export default function HomePage({ onAddToFavourites }) {
  const [selectedCategory, setSelectedCategory] = useState("криминал");

  return (
    <div>
      <Categories
        categories={allCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <MovieGrid category={selectedCategory} onAddToFavourites={onAddToFavourites} />
    </div>
  );
}