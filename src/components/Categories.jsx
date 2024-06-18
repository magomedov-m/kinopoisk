import React from "react";
import styled, { Styled } from "styled-components";

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

export default function Categories(props) {
  const categories = [
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
      key: "мультфильмы",
      name: "мультфильм",
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

  

  return (
    <div>
      {categories.map((el, idx) => (
        <Cat key={idx} >{el.name}</Cat>
      ))}
    </div>
  );
}
