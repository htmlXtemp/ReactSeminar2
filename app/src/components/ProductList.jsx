import { useCartContext } from '../hooks/useCart';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  const { qtyById, add, remove } = useCartContext();

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          qty={qtyById[product.id] || 0}
          onAdd={add}
          onRemove={remove}
        />
      ))}
    </div>
  );
}