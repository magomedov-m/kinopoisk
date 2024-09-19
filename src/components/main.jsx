import React from "react";
import Movies from "./Movies";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Main(props) {
  const addToOrder = (item) => {
    props.addToOrder(item);
  };
  
  return (
    <div className="container">
      <Link to='/favourites' />
      <Logo />
      <Movies onAdd={addToOrder} />
    </div>
  );
}

export default Main;
