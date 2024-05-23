import React from 'react'
import { useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import Logo from '../img/Путешествие вокруг света.jpeg'

// Здесь хранится шаблон для заполнения карточки

export default function Item(props) {
  return (
    <div className="movieCard">
      <img className='poster' src={props.item.poster?.previewUrl} alt="Movie Poster"/>
      <div className="overlay">
        <div onClick={() => props.onAdd(props.item)} className='heart'><FaRegHeart/></div>
        <div className="imdbRating" onClick={() => props.onAdd(props.item)}>imdb {props.item.rating.imdb}</div>
        
        <div className="movieInfo">
          <h2>{props.item.alternativeName}</h2>
          <span>{props.item.year}</span>
        </div>
      </div>
      {/* <div onClick={() => props.onAdd(props.item)} className='heart' >добавить</div> */}
    </div>
  )
}
