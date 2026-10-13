export default function Header({ totalCount, totalPrice, onClear }) {
  return (
    <header className="header">
      <h1 className="header__title">Магазин</h1>
      <div className="header__cart">
        <span className="header__cart-text">
          Корзина: {totalCount} шт. · {totalPrice} ₽
        </span>
        <button className="header__clear" onClick={onClear}>
          Очистить
        </button>
      </div>
    </header>
  );
}
