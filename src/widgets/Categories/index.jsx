import React from "react";

// ОПТИМИЗАЦИЯ 4: При изменении selected или onSelect перерисовываются все кнопки.
// Рекомендуется:
// 1. Обернуть компонент в React.memo
// 2. Обернуть onSelect в useCallback на уровне родителя

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
