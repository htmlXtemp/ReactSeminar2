export default function ProductCard({ product }) {
  const stockClass = product.inStock
    ? 'product-card__stock product-card__stock--in'
    : 'product-card__stock product-card__stock--out';

  return (
    <div className="product-card">
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__price">{product.price} ₽</p>
      <p className={stockClass}>
        {product.inStock ? 'В наличии' : 'Нет в наличии'}
      </p>
    </div>
  );
}