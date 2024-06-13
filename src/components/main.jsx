import React from "react";
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
      </div>
  );
}
  
export default Main;