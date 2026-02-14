import React from "react";

export default function Categories({ categories, selected, onSelect }) {
  return (
    <div className="categories">
      {categories.map((cat) => (
        <button
          key={cat}
          className={cat === selected ? "selected" : ""}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}