import React, { createContext, useState, useContext } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (movie) => {
    if (!favourites.find((m) => m.id === movie.id)) {
      setFavourites([...favourites, movie]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((m) => m.id !== id));
  };

  const toggle = (movie) => {
    if (favourites.some((m) => m.id === movie.id)) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
    }
  };

  // ОПТИМИЗАЦИЯ 9: isFavourite использует .some() при каждом вызове, что O(n).
  // При большом количестве избранного это может быть медленно.
  // Рекомендуется использовать Set для хранения ID:
  // const [favouritesSet, setFavouritesSet] = useState(new Set());
  // Тогда проверка будет O(1): favouritesSet.has(id)

  const isFavourite = (id) => favourites.some((m) => m.id === id);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        toggle,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
