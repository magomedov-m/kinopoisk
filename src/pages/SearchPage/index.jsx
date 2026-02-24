import React, { useState, useEffect, useRef } from "react";
import { searchMovies, advancedSearch } from "../../shared/api/kinopoisk";
import SearchBar from "../../shared/ui/SearchBar";
import FilterPanel from "../../shared/ui/FilterPanel";
import Pagination from "../../shared/ui/Pagination";
import MovieGrid from "../../widgets/MovieGrid";

const DEFAULT_FILTERS = {
  query: "",
  genre: "",
  yearFrom: "",
  yearTo: "",
  ratingKpFrom: "",
  ratingKpTo: "",
  ratingImdbFrom: "",
  ratingImdbTo: "",
  type: "",
  sortField: "rating.kp",
  sortType: -1,
};

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchKey, setSearchKey] = useState(0);

  // ОПТИМИЗАЦИЯ: Использование ref для хранения актуальных фильтров — хороший подход.
  // Однако doSearch создаётся при каждом рендере. Рекомендуется обернуть в useCallback:
  // const doSearch = useCallback(async (pageNum = 1) => { ... }, [filters, page]);

  // Ref для хранения актуальных фильтров
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const doSearch = async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    const currentFilters = filtersRef.current;

    try {
      let result;

      // Проверяем есть ли какие-то критерии поиска
      const hasFilters =
        currentFilters.query ||
        currentFilters.genre ||
        currentFilters.yearFrom ||
        currentFilters.ratingKpFrom ||
        currentFilters.type;

      if (hasFilters) {
        result = await advancedSearch(currentFilters, pageNum);
      } else if (
        currentFilters.query &&
        currentFilters.query.trim().length >= 2
      ) {
        result = await searchMovies(currentFilters.query, pageNum);
      } else {
        // Нет критериев - показываем пустой результат
        result = { movies: [], total: 0, pages: 0, page: 1 };
      }

      setMovies(result.movies || []);
      setTotalPages(result.pages || 0);
      setTotal(result.total || 0);
      setPage(result.page || 1);
    } catch (err) {
      setError("Ошибка при загрузке фильмов. Попробуйте еще раз.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Поиск по клику на кнопку
  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, query }));
    setPage(1);
    setSearchKey((prev) => prev + 1);
  };

  // Изменение фильтров
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
    setSearchKey((prev) => prev + 1);
  };

  // Сброс фильтров
  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
    setMovies([]);
    setTotal(0);
    setTotalPages(0);
  };

  // Запуск поиска при изменении searchKey или page
  useEffect(() => {
    doSearch(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey, page]);

  return (
    <div className="search-page">
      <div className="search-page__header">
        <h1>Поиск фильмов</h1>
        <p>Найдите фильм по названию, жанру, году или рейтингу</p>
      </div>

      <div className="search-page__controls">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Введите название фильма..."
        />
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </div>

      {loading && (
        <div className="search-page__loading">
          <div className="loader"></div>
          <p>Загрузка фильмов...</p>
        </div>
      )}

      {error && <div className="search-page__error">{error}</div>}

      {!loading && !error && total === 0 && movies.length === 0 && (
        <div className="search-page__empty">
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить параметры поиска</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="search-page__results-info">
            Найдено: <strong>{total}</strong> фильмов
            {filters.query && ` по запросу "${filters.query}"`}
          </div>
          <MovieGrid movies={movies} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {!loading && total === 0 && movies.length === 0 && !error && (
        <div className="search-page__hint">
          <h3>Начните поиск</h3>
          <ul>
            <li>🔍 Введите название фильма для поиска</li>
            <li>🎬 Используйте фильтры для уточнения результатов</li>
            <li>⭐ Сортируйте по рейтингу, году или популярности</li>
          </ul>
        </div>
      )}
    </div>
  );
}
