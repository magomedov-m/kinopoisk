import React from "react";
import MovieCard from "./MovieCard";

const showNothing = () => {
    return (
        <div className="empty">
            <h2>Тут пока что пусто  😕</h2>
        </div>
    )
}

// Страничка "Избранное"
export default function Favourites({orders, onDelete}) {
    return (
        <div className="container-favourites">
            <h1>Понравившиеся фильмы</h1>
            <div className="favorites-container">
            {orders.length > 0 ? <h4 className="allFilms">Всего фильмов {orders.length}.</h4> : null}
            {orders.length > 0 ? orders.map(order => (
                <MovieCard key={order.id} movie={order} onDelete={() => onDelete(order.id)} />
            )) : showNothing()}
            </div>
        </div>
    )
}