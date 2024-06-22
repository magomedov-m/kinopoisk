import React from "react";
import Movies from "./Movies";
import Logo from "./Logo";
import Categories from "./Categories";

function Main(props) {
  const addToOrder = (item) => {
    props.addToOrder(item);
  };
  
  return (
    <div className="container">
      <Logo />
      <Categories />
      <Movies onAdd={addToOrder} />
    </div>
  );
}

export default Main;
