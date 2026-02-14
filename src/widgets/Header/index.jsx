import { Link } from "react-router-dom";
import logo from "../../shared/assets/img/KinoPoisk-Logo.wine.png";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" height={40} />
      </Link>

      <Link to="/favourites">Избранное</Link>
    </header>
  );
}