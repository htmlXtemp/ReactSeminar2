import { useCartContext } from '../hooks/useCart';

export default function Header() {
  const { totalCount, totalPrice, clear } = useCartContext();

  return (
    <header className="header">
      <h1 className="header__title">Магазин</h1>
      <div className="header__cart">
        <span className="header__summary">
          Корзина: {totalCount} шт. · {totalPrice} ₽
        </span>
        <button className="header__clear" onClick={clear}>
          Очистить
        </button>
      </div>
    </header>
  );
}