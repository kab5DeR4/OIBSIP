import { createContext, useContext, useState, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = {
  id: string;           // variety id or 'custom-<timestamp>'
  name: string;
  price: number;        // per unit in ₹
  quantity: number;
  type: 'variety' | 'custom';
  details?: string;     // e.g. "Thin Crust + Tomato + Mozz + Pepperoni"
  imageUrl?: string;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: () => {},
  updateQty: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function addItem(item: Omit<CartItem, 'quantity'>, quantity: number) {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function updateQty(id: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    }
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addItem, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
