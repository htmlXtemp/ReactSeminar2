export default function SearchBar({
  query,
  onSearch,
  onlyInStock,
  setOnlyInStock,
  inputRef,
  foundCount,
}) {
  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        className="search-bar__input"
        placeholder="Поиск по названию..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
      />
      <label className="search-bar__label">
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(e) => setOnlyInStock(e.target.checked)}
        />
        Только в наличии
      </label>
      <span className="search-bar__count">
        Найдено: {foundCount}
      </span>
    </div>
  );
}
