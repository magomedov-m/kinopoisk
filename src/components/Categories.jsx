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
    transform: scale(1.1)
  }
`;


export default function Categories() {
  const cat = [
    "триллер",
    "криминал",
    "драма",
    "боевик",
    "фантастика",
    "мелодрама",
    "детектив",
    "ужасы",
    "мультфильм",
    "приключения",
    "фэнтези",
  ];
  return (
    <div>
      {cat.map((el, id) => (
        <Cat key={id}>
          {el}
        </Cat>
      ))}
    </div>
  );
}
