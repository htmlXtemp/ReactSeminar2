import ProductCard from './ProductCard';

export default function ProductList({ products, qtyById, onAdd, onRemove }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          qty={qtyById[product.id] || 0}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
