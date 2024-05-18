import React from "react";
import Main from "./components/main";
import { Routes, Route, Link } from "react-router-dom";
import Favourites from "./components/favourites";
import IconFav from "./components/IconFav";
import { useRef, useState, useEffect } from "react";




function App() {
  const headerRef = useRef(null);
  const [showFavourites, setShowFavourites] = useState(true);


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

  // Отвечает за скрытие и всплытие иконки "Избранное"
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current.offsetHeight;
      const scrollPosition = window.pageYOffset;

      if (scrollPosition > headerHeight) {
        setShowFavourites(false);
      } else {
        setShowFavourites(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header ref={headerRef}>
        {/* <Link to="/favourites"><IconFav/></Link> */}
        {showFavourites && <Link to="/favourites"><IconFav/></Link>}
      </header>
      <Routes>
        <Route path="/" element={<Main addToOrder={addToOrder} orders={orders} />}/>
        <Route path="/favourites" element={<Favourites orders={orders} onDelete={deleteOrder} />} />
      </Routes>
    </>
  );
}

export default App;

