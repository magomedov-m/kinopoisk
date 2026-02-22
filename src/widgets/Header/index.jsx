import { NavLink } from "react-router-dom";
import { FaSearch, FaHome, FaHeart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/" className="header__link">
          <FaHome />
          <span>Главная</span>
        </NavLink>
        <NavLink to="/search" className="header__link">
          <FaSearch />
          <span>Поиск</span>
        </NavLink>
        <NavLink to="/favourites" className="header__link">
          <FaHeart />
          <span>Избранное</span>
        </NavLink>
      </nav>
    </header>
  );
}
