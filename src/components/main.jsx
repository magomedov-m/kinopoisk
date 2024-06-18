import React from "react";
import Movies from "./Movies";
import Logo from "./Logo";
import Categories from "./Categories";

function Main(props) {
  const addToOrder = (item) => {
    props.addToOrder(item);
  };

  function chooseCategory(category) {
    console.log(category);
  }

  return (
    <div className="container">
      <Logo />
      <Categories chooseCategory={chooseCategory} />
      <Movies onAdd={addToOrder} />
    </div>
  );
}

export default Main;
