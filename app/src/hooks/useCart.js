import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

const STORAGE_KEY = 'cart';

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
    case 'restore':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

export function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'restore', items: JSON.parse(raw).items ?? [] });
    } catch {
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [isReady, cart]);

  const add = useCallback((product) => dispatch({ type: 'add', product }), []);
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const qtyById = useMemo(() => {
    const map = {};
    for (const item of cart.items) {
      map[item.id] = item.qty;
    }
    return map;
  }, [cart.items]);

  const totalCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.qty, 0),
    [cart.items]
  );
  const totalPrice = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [cart.items]
  );

  return useMemo(
    () => ({ items: cart.items, qtyById, totalCount, totalPrice, add, remove, clear }),
    [cart.items, qtyById, totalCount, totalPrice, add, remove, clear]
  );
}

export const CartContext = createContext(null);

export function useCartContext() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error('useCartContext должен вызываться внутри CartContext.Provider');
  }
  return value;
}