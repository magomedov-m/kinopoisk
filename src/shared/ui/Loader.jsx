import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader__ring"></div>
        <div className="loader__ring"></div>
        <div className="loader__ring"></div>
      </div>
      <span className="loader__text">Загрузка...</span>
    </div>
  );
}
