import { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [items, setItems] = useState([]);

  const add = (movie) => {
    setItems((prev) => (prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]));
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((m) => m.id !== id));
  };

  const toggle = (movie) => {
    items.some((m) => m.id === movie.id) ? remove(movie.id) : add(movie);
  };

  const isFavourite = (id) => items.some((m) => m.id === id);

  return (
    <FavouritesContext.Provider value={{ items, add, remove, toggle, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);