import { useEffect, useMemo, useRef, useState } from 'react';
import './style.css';
import { products } from './data';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';

function App() {
  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

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

  return (
    <div>
      <Header />
      <SearchBar
        query={query}
        onSearch={setQuery}
        onlyInStock={onlyInStock}
        setOnlyInStock={setOnlyInStock}
        inputRef={inputRef}
        foundCount={visible.length}
      />
      <ProductList products={visible} />
    </div>
  );
}

export default App;