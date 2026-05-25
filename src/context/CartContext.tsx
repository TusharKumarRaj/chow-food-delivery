import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  restaurantName?: string;
};

export type PlacedOrder = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: number;
};

type CartContextValue = {
  items: CartItem[];
  placedOrders: PlacedOrder[];
  addItem: (item: CartItem) => void;
  placeOrder: () => PlacedOrder | null;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const placeOrder = useCallback((): PlacedOrder | null => {
    if (items.length === 0) return null;
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const order: PlacedOrder = {
      id: `order-${Date.now()}`,
      items: [...items],
      total,
      placedAt: Date.now(),
    };
    setPlacedOrders((prev) => [order, ...prev]);
    setItems([]);
    return order;
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      placedOrders,
      addItem,
      placeOrder,
      count: items.length,
    }),
    [items, placedOrders, addItem, placeOrder],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
