import React from 'react'
import { useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import Logo from '../img/Путешествие вокруг света.jpeg'

// Здесь хранится шаблон для заполнения карточки

export default function Item(props) {

  return (
    // Здесь нужно укзать пропсы, и из них вытаскивать информацию
    <div className='film-card__info' >
        <div className="film-card__img" alt="картиночка"><img className='card-img' src={props.item.Poster} /></div>
        <div className="film-card__rating">{props.item.imdbID}</div>
        <div className="film-card__name">{props.item.Title}</div>
        <div onClick={() => props.onAdd(props.item)} className='heart' ><FaRegHeart /></div>
    </div>
  )
}
