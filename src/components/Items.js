import React from 'react'
import Item from './Item'

// Этот компонент создает блок для хранения карточки с фильмом.
// Для создания самой карточки данный передаются по props в компонент Item

export default function Items(props) {
  // console.log("Items:", props)
  return (
    <>
      {props.arrFilms.map(el => (
          <Item key={el.id} item={el} onAdd={props.onAdd} />
      ))}
    </> 
  )
}
