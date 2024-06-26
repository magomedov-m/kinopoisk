import React from "react";
import { useState, useEffect } from "react";
import Items from "./Items";

export default function Movies(props) {
  const API_LINK = `https://api.kinopoisk.dev/v1.4/movie?year=2021&genres.name=криминал`;
  
  const headers = {
    "X-API-KEY": "1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT",
  };

  const [arrFilms, setArrFilms] = useState([]);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(API_LINK, {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP статус: ${response.status}`);
      }

      const movies = await response.json();
      setArrFilms(movies.docs);
    } catch (error) {
      alert(`Упс... Возникла ошибка: ${error}`);
    }
  };
  useEffect(() => {
    searchMovies();
  }, []);

  return <Items arrFilms={arrFilms} onAdd={props.onAdd} />;
}
