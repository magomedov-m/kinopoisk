import React from "react";
import styled, { Styled } from "styled-components";
import { useState, useEffect } from "react";
import Items from "./Items";

export default function Movies(props) {
  const Cat = styled.div`
    display: inline-block;
    background: #f2f2f2;
    border-radius: 50px;
    padding: 10px 20px;
    margin-bottom: 25px;
    margin-right: 15px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 500ms ease;
    font-size: 18px;

    &:hover {
      border-color: orange;
      transform: scale(1.1);
    }
  `;
  // Здесь хранится массив с категориями
  let categories = [];
  function PopulateCategories() {
    categories = [
      {
        key: "триллер",
        name: "триллер",
      },
      {
        key: "криминал",
        name: "криминал",
      },
      {
        key: "драма",
        name: "драма",
      },
      {
        key: "боевик",
        name: "боевик",
      },
      {
        key: "фантастика",
        name: "фантастика",
      },
      {
        key: "мелодрама",
        name: "мелодрама",
      },
      {
        key: "детектив",
        name: "детектив",
      },
      {
        key: "ужасы",
        name: "ужасы",
      },
      {
        key: "мультфильм",
        name: "мультфильмы",
      },
      {
        key: "приключения",
        name: "приключения",
      },
      {
        key: "фэнтези",
        name: "фэнтези",
      },
    ];
  }
  PopulateCategories();
  const [selectedCategory, setSelectedCategory] = useState("криминал");

  function chooseCategory(keyElem) {
    setSelectedCategory(keyElem);
  }

  useEffect(() => {
    chooseCategory()
  }, [selectedCategory]);

  const API_LINK = `https://api.kinopoisk.dev/v1.4/movie?year=2021&genres.name=${selectedCategory}`;

  const headers = {
    "X-API-KEY": "1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT",
  };
  // Хранится массива с фильмами и совершается Fetch-запрос для получения этих фильмов из БД
  const [arrFilms, setArrFilms] = useState([]);

  const searchMovies = async () => {
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
  }, [selectedCategory]);

  function chooseCategory(keyElem) {
    setSelectedCategory(keyElem);
  }

  return (
    <>
      {categories.map((el, idx) => (
        <Cat key={idx} onClick={() => chooseCategory(el.key)}>
          {el.name}
        </Cat>
      ))}

      <Items arrFilms={arrFilms} onAdd={props.onAdd} />
    </>
  );
}
