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

  return (
    <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export { FavouritesContext };