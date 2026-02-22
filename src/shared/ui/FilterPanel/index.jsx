import React from "react";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./FilterPanel.scss";

const GENRES = [
  "триллер",
  "криминал",
  "драма",
  "боевик",
  "фантастика",
  "мелодрама",
  "детектив",
  "ужасы",
  "мультфильмы",
  "приключения",
  "фэнтези",
  "комедия",
  "военный",
  "история",
  "спорт",
  "документальный",
];

const TYPES = [
  { value: "", label: "Все типы" },
  { value: "movie", label: "Фильм" },
  { value: "tv-series", label: "Сериал" },
  { value: "mini-series", label: "Мини-сериал" },
  { value: "anime", label: "Аниме" },
];

const SORT_OPTIONS = [
  { value: "rating.kp", label: "Рейтинг Кинопоиск" },
  { value: "rating.imdb", label: "Рейтинг IMDb" },
  { value: "year", label: "Год выпуска" },
  { value: "votes.kp", label: "Популярность" },
  { value: "movieLength", label: "Длительность" },
];

export default function FilterPanel({ filters, onFilterChange, onReset }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="filter-panel">
      <button 
        className="filter-panel__toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter />
        <span>Фильтры</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isOpen && (
        <div className="filter-panel__content">
          <div className="filter-panel__row">
            {/* Жанр */}
            <div className="filter-panel__field">
              <label>Жанр</label>
              <select
                value={filters.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
              >
                <option value="">Все жанры</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Тип */}
            <div className="filter-panel__field">
              <label>Тип</label>
              <select
                value={filters.type}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-panel__row">
            {/* Год от */}
            <div className="filter-panel__field">
              <label>Год от</label>
              <select
                value={filters.yearFrom}
                onChange={(e) => handleChange("yearFrom", e.target.value)}
              >
                <option value="">Любой</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Год до */}
            <div className="filter-panel__field">
              <label>Год до</label>
              <select
                value={filters.yearTo}
                onChange={(e) => handleChange("yearTo", e.target.value)}
              >
                <option value="">Любой</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-panel__row">
            {/* Рейтинг KP */}
            <div className="filter-panel__field">
              <label>Рейтинг KP от</label>
              <select
                value={filters.ratingKpFrom}
                onChange={(e) => handleChange("ratingKpFrom", e.target.value)}
              >
                <option value="">Любой</option>
                {[9, 8, 7, 6, 5, 4, 3].map((r) => (
                  <option key={r} value={r}>{r}+</option>
                ))}
              </select>
            </div>

            {/* Сортировка */}
            <div className="filter-panel__field">
              <label>Сортировка</label>
              <select
                value={filters.sortField}
                onChange={(e) => handleChange("sortField", e.target.value)}
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-panel__row">
            {/* Порядок сортировки */}
            <div className="filter-panel__field">
              <label>Порядок</label>
              <select
                value={filters.sortType}
                onChange={(e) => handleChange("sortType", Number(e.target.value))}
              >
                <option value={-1}>По убыванию</option>
                <option value={1}>По возрастанию</option>
              </select>
            </div>
          </div>

          <div className="filter-panel__actions">
            <button className="filter-panel__reset" onClick={onReset}>
              Сбросить фильтры
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
