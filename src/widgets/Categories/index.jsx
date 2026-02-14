export default function Categories({ value, onChange }) {
  const list = [
    "триллер",
    "криминал",
    "драма",
    "боевик",
    "фантастика",
    "мелодрама",
    "детектив",
    "ужасы",
    "мультфильм",
    "приключения",
    "фэнтези",
  ];

  return (
    <div>
      <h2>Категория</h2>
      {list.map((g) => (
        <button key={g} onClick={() => onChange(g)}>
          {g}
        </button>
      ))}
    </div>
  );
}