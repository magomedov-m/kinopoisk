import React from "react";
// import Items from "./Items";
import Movies from "./Movies";
import Logo from "./Logo";


function Main(props) {
  
  const addToOrder = (item) => {
    props.addToOrder(item)
  }

  return (
      <div className="container">
        <Logo />
        <Movies onAdd={addToOrder} />
        {/* <Items arrFilms={arrFilms} onAdd={addToOrder} /> */}
      </div>
  );
}
  
export default Main;