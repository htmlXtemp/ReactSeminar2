import { useEffect, useMemo, useRef, useState } from 'react';
import { products } from './data';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';

function App() {
  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [cart, setCart] = useState({ items: [] });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) => p.title.toLowerCase().includes(q) && (!onlyInStock || p.inStock)
    );
  }, [query, onlyInStock]);

  function addToCart(product) {
    setCart((cart) => {
      const existing = cart.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: cart.items.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return {
        items: [
          ...cart.items,
          { id: product.id, title: product.title, price: product.price, qty: 1 },
        ],
      };
    });
  }

  function removeFromCart(id) {
    setCart((cart) => ({
      items: cart.items.filter((item) => item.id !== id),
    }));
  }

  function clearCart() {
    setCart({ items: [] });
  }

  const totalCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.qty, 0),
    [cart.items]
  );
  const totalPrice = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [cart.items]
  );

  const qtyById = useMemo(() => {
    const map = {};
    for (const item of cart.items) map[item.id] = item.qty;
    return map;
  }, [cart.items]);

  return (
    <div>
      <Header totalCount={totalCount} totalPrice={totalPrice} onClear={clearCart} />
      <SearchBar
        query={query}
        onSearch={setQuery}
        onlyInStock={onlyInStock}
        setOnlyInStock={setOnlyInStock}
        inputRef={inputRef}
        foundCount={visible.length}
      />
      <ProductList
        products={visible}
        qtyById={qtyById}
        onAdd={addToCart}
        onRemove={removeFromCart}
      />
    </div>
  );
}

export default App;
