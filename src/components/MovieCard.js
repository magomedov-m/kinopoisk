import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";

// Карточка фильма, находящаяся в избранном
export default function MovieCard({movie, onDelete}) {
    console.log(movie)
  return (
    <div className="movie-card">
        <img src={movie.poster.previewUrl} alt="Картинка"/>
        <span className="close-icon" onClick={onDelete}><MdOutlineDeleteOutline className='close-icon__logo'/></span>
        <h2 className="movie-name">{movie.alternativeName}</h2>
    </div>
  )
}
