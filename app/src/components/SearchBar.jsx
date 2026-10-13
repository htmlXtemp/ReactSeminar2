export default function SearchBar({
  query,
  onSearch,
  onlyInStock,
  setOnlyInStock,
  inputRef,
  foundCount,
  isPending,
}) {
  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        className="search-bar__input"
        placeholder="Поиск по названию..."
        value={query}
        onChange={onSearch}
      />
      <label className="search-bar__label">
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(e) => setOnlyInStock(e.target.checked)}
        />
        Только в наличии
      </label>
      {isPending && <span className="search-bar__pending">Обновляем список...</span>}
      <span className="search-bar__found">
        Найдено: {foundCount.toLocaleString('ru-RU')}
      </span>
    </div>
  );
}