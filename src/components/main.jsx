import React, { useState, useEffect } from "react"
import BackImg from "./backimg";
import Icons from './Icon'
import Items from "./Items";



function Main(props) {
  let [arrFilms, setArrFilms] = useState([]);

  const API_KEY = 'c032e2d7';
  const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

  // let data;
  // arrFilms = data;

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const arrFilms = await response.json();

    console.log(arrFilms.Search);
  }

  // const API_KEY = 'https://api.kinopoisk.dev/v1.4/movie?year=2023&genres.name=все';
  // const headers = {
  //   'X-API-KEY': '1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT'
  // };
  
  useEffect(() => {
    searchMovies()
  }, []);

  useEffect(() => {
    console.log(props.orders)
  }, [props.orders]);

  const addToOrder = (item) => {
    props.addToOrder(item)
  }

  

  return (
      <div className="container">
        <BackImg/>
        <Icons />
        <Items arrFilms={arrFilms} onAdd={addToOrder} />
      </div>
  );
}
  
export default Main;