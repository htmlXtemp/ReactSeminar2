import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import './style.css';
import { products } from './data';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';

const initialCart = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] };
    }
    case 'remove':
      return { ...state, items: state.items.filter((item) => item.id !== action.id) };
    case 'clear':
      return initialCart;
    default:
      return state;
  }
}

function App() {
  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

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

  const qtyById = useMemo(() => {
    const map = {};
    for (const item of cart.items) {
      map[item.id] = item.qty;
    }
    return map;
  }, [cart.items]);

  const totalCount = cart.items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleAdd = useCallback((product) => dispatch({ type: 'add', product }), []);
  const handleRemove = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const handleClear = useCallback(() => dispatch({ type: 'clear' }), []);

  return (
    <div>
      <Header totalCount={totalCount} totalPrice={totalPrice} onClear={handleClear} />
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
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    </div>
  );
}

export default App;
