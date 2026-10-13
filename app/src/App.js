import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import './style.css';
import { products } from './data';
import { CartContext, useCart } from './hooks/useCart';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';

function App() {
  const cart = useCart();

  // query — то, что сразу видно в поле ввода
  // filter — то, по чему фильтруем список (обновляется через transition)
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isPending, startTransition] = useTransition();

  // автофокус: ref на <input> + эффект с []
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setQuery(value); // срочно: символы появляются без задержки
    startTransition(() => setFilter(value)); // отложенно: тяжёлый фильтр списка
  }, []);

  // список пересчитывается только при смене фильтров
  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return products.filter(
      (p) => p.title.toLowerCase().includes(q) && (!onlyInStock || p.inStock)
    );
  }, [filter, onlyInStock]);

  return (
    <CartContext.Provider value={cart}>
      <Header />
      <SearchBar
        query={query}
        onSearch={handleSearch}
        onlyInStock={onlyInStock}
        setOnlyInStock={setOnlyInStock}
        inputRef={inputRef}
        foundCount={visible.length}
        isPending={isPending}
      />
      <ProductList products={visible} />
    </CartContext.Provider>
  );
}

export default App;