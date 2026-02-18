import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/favourites">Избранное</NavLink>
      </nav>
    </header>
  );
}