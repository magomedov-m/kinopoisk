import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../widgets/Header";
import HomePage from "../pages/HomePage/index.jsx";
import FavouritesPage from "../pages/FavouritesPage/index.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </>
  );
}