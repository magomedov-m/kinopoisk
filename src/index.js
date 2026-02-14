import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { FavouritesProvider } from "./features/favourites/context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <FavouritesProvider>
      <App />
    </FavouritesProvider>
  </BrowserRouter>
);