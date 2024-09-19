import React from "react";
import Main from "./components/Main";
import { Routes, Route, Link } from "react-router-dom";
import Favourites from "./components/Favourites";
import IconFav from "./components/IconFav";
import { useState } from "react";

function App() {

  // Добавление в массив понравившегося фильма: Избранное
  const [orders, setOrders] = useState([]);

  const addToOrder = (item) => {
    let isInArray = false;
    orders.forEach((el) => {
      if (el.id === item.id) {
        isInArray = true;
      }
    });
    if (!isInArray) {
      setOrders([...orders, item]);
    }
  };
  // Удаление фильма из массива Избранное
  const deleteOrder = (id) => {
    setOrders(orders.filter((el) => el.id !== id));
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Main addToOrder={addToOrder} orders={orders} />}
        />
        <Route
          path="/favourites"
          element={<Favourites onDelete={deleteOrder} orders={orders} />}
        />
      </Routes>
    </>
  );
}

export default App;
