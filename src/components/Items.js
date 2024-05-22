import React from 'react'
import Item from './Item'

// Этот компонент создает блок для хранения карточки с фильмом.
// Для создания самой карточки данный передаются по props в компонент Item

export default function Items(props) {
  // console.log("Items:", props)
  return (
    <div className='film-card' >
      {props.arrFilms.map(el => (
          <Item key={el.imdbID} item={el} onAdd={props.onAdd} />
      ))}
      </div>
  )
}
