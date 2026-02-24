import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchBar.scss";

export default function SearchBar({
  onSearch,
  placeholder = "Поиск фильмов...",
}) {
  const [query, setQuery] = useState("");

  // ОПТИМИЗАЦИЯ 11: handleSubmit создаётся при каждом рендере.
  // Рекомендуется обернуть в useCallback: const handleSubmit = useCallback((e) => { ... }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Очистить"
        >
          <FaTimes />
        </button>
      )}
      <button type="submit" className="search-bar__submit" aria-label="Искать">
        <FaSearch />
      </button>
    </form>
  );
}
