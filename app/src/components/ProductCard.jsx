import { memo } from 'react';

const ProductCard = memo(function ProductCard({ product, qty, onAdd, onRemove }) {
  console.log('render', product.id);

  const stockClass = product.inStock
    ? 'product-card__stock product-card__stock--in'
    : 'product-card__stock product-card__stock--out';

  return (
    <div className="product-card">
      <div>
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">{product.price} ₽</p>
        <p className={stockClass}>
          {product.inStock ? 'В наличии' : 'Нет в наличии'}
        </p>
      </div>

      {!product.inStock ? (
        <button className="product-card__button" disabled>
          В корзину
        </button>
      ) : qty > 0 ? (
        <div className="product-card__row">
          <span className="product-card__qty">В корзине: {qty}</span>
          <button
            className="product-card__button product-card__button--ghost"
            onClick={() => onRemove(product.id)}
          >
            Убрать
          </button>
        </div>
      ) : (
        <button className="product-card__button" onClick={() => onAdd(product)}>
          В корзину
        </button>
      )}
    </div>
  );
});

export default ProductCard;
