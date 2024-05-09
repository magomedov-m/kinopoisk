import React from "react";
import Main from "./components/main";
import { Routes, Route, Link } from "react-router-dom";
import Favourites from "./components/favourites";
import IconFav from "./components/IconFav";
import { useState } from "react";




function App() {
  let [orders, setOrders] = useState([]);
  
  const addToOrder = (item) => {
    let isInArray = false;
    orders.forEach(el => {
      if (el.id === item.id) {
        isInArray = true;
      }
    })
    if (!isInArray) {
    setOrders([...orders, item])
    };
  }

  const deleteOrder = (id) => {
    setOrders(orders.filter(el => el.id !== id))
  }

  return (
    <>

      <header>
        <Link to="/favourites"><IconFav/></Link>
      </header>
      <Routes>
        <Route path="/" element={<Main addToOrder={addToOrder} orders={orders} />}/>
        <Route path="/favourites" element={<Favourites orders={orders} onDelete={deleteOrder} />} />
      </Routes>
      </>
  );
}

export default App;

