export default function ProductCard({ product, qty, onAdd, onRemove }) {
  return (
    <div className="product-card">
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__price">{product.price} ₽</p>
      <p
        className={
          'product-card__stock' + (product.inStock ? '' : ' product-card__stock--out')
        }
      >
        {product.inStock ? 'В наличии' : 'Нет в наличии'}
      </p>

      {!product.inStock ? (
        <button className="product-card__add" disabled>
          В корзину
        </button>
      ) : qty > 0 ? (
        <div className="product-card__row">
          <span className="product-card__qty">В корзине: {qty}</span>
          <button className="product-card__remove" onClick={() => onRemove(product.id)}>
            Убрать
          </button>
        </div>
      ) : (
        <button className="product-card__add" onClick={() => onAdd(product)}>
          В корзину
        </button>
      )}
    </div>
  );
}
