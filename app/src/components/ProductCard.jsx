export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__price">{product.price} ₽</p>
      <p className={'product-card__stock' + (product.inStock ? '' : ' product-card__stock--out')}>
        {product.inStock ? 'В наличии' : 'Нет в наличии'}
      </p>
    </div>
  );
}
