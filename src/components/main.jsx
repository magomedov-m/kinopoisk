import React, { useState, useEffect } from "react"
import Items from "./Items";
import Logo from "./Logo";


function Main(props) {
  const btn = document.querySelectorAll('.btn')
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function() {
      console.log(btn[i].textContent)
    })
  }

  const API_LINK = `https://api.kinopoisk.dev/v1.4/movie?year=2021&genres.name=криминал`;
  const headers = {
    'X-API-KEY': '1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT'
  };

  // const API_TOKEN = 'c032e2d7';
  // const API_URL = `http://www.omdbapi.com/?apikey=${API_TOKEN}`;

  let [arrFilms, setArrFilms] = useState([]);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(API_LINK, {
        headers: headers
      });

      if (!response.ok) {
        throw new Error(`HTTP статус: ${response.status}`)
      }

      const movies = await response.json();
      setArrFilms(movies.docs)
    }catch (error) {
      alert(`Упс... Возникла ошибка: ${error}`)
    }
   
  }
  useEffect(() => {
    searchMovies()
  }, []);

  const addToOrder = (item) => {
    props.addToOrder(item)
  }

  return (
      <div className="container">
        <Logo />
        <Items arrFilms={arrFilms} onAdd={addToOrder} />
      </div>
  );
}
  
export default Main;