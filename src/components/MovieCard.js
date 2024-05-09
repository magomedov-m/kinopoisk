import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";

// Карточка фильма, находящаяся в избранном
export default function MovieCard({movie, onDelete}) {
    console.log(movie)
  return (
    <div className="movie-card">
        <img src={``} alt="Картинка"/>
        <span className="close-icon" onClick={onDelete}><MdOutlineDeleteOutline /></span>
        <h2 className="movie-name">{movie.name}</h2>
    </div>
  )
}
