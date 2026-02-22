import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../widgets/Header";
import HomePage from "../pages/HomePage/index.jsx";
import SearchPage from "../pages/SearchPage/index.jsx";
import FavouritesPage from "../pages/FavouritesPage/index.jsx";
import MovieDetailsPage from "../pages/MovieDetailsPage/index.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </>
  );
}
