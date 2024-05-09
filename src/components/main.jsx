import React, { useState, useEffect } from "react"
import BackImg from "./backimg";
import Icons from './Icon'
import Menu from "./menu";
import Items from "./Items";



function Main(props) {
  // const API_KEY = 'https://api.kinopoisk.dev/v1.4/movie?year=2023&genres.name=все';
  // const headers = {
  //   'X-API-KEY': '1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT'
  // };
  let [arrFilms, setArrFilms] = useState([]);
  

  arrFilms = [
    {'name': 'С приветом по планетам', id: 1, 'imdb': 10},
    {'name': 'Близняшки', id: 2, 'imdb': 10},
    {'name': 'Подлые наглецы', id: 3, 'imdb': 10},
    {'name': 'Гиганты', id: 4, 'imdb': 10},
    {'name': 'Неотвратимые', id: 5, 'imdb': 10}
  ];
  
  useEffect(() => {
    console.log(props.orders)
  }, [props.orders]);

  const addToOrder = (item) => {
    props.addToOrder(item)
  }

  // useEffect(() => {
  //   async function getFilms() {
      // try {
        // const response = await fetch(API_KEY, { headers: headers });
        // if (!response.ok) {
          // throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const movies = await response.json();
        // setArrFilms(movies.docs);
      // } catch (error) {
        // console.log('Упс... Кажется, ', error);
      // }
  //   };
  // }, []);

  // const [arrFilms, setArrFilms] = useState([]);

  // useEffect(() => {
  //   getFilms();
  // }, []);
  //   const btnSearch = document.querySelector('.search')
  //   const inputSearch = document.querySelector('.icons__search-input')
  //   const filmCard = document.querySelector('.film-card')
  // let arrFilms;
  // async function getFilms() {

  //   let url = 'https://api.kinopoisk.dev/v1.4/movie?year=2023&genres.name=все';
  //   let resp = await fetch(`${url}`, {
  //       headers: {
  //           'X-API-KEY': '1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT'
  //       }
  //   })

  //   let filmsJson = await resp.json()
  //   console.log(filmsJson)
    // setArrFilms(filmsJson.docs)
  // }

  // getFilms()

  return (
      <div className="container">
        <BackImg/>
        <Icons />
        <Menu/>
        <Items arrFilms={arrFilms} onAdd={addToOrder} />
      </div>
  );
}
  
export default Main;