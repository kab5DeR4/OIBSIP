import { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([
    { id: 101, customer: 'Alexander Pierce', items: 'Custom (Thin Crust, Tomato, Mozzarella)', status: 'Order Received', amount: 450, time: 2 },
    { id: 102, customer: 'Sophia Reynolds', items: 'Classic Margherita', status: 'In the kitchen', amount: 199, time: 15 },
  ]);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (amount, items) => {
    const newOrder = {
      id: 100 + Math.floor(Math.random() * 900),
      customer: 'Current User', // Mock user
      items: items.map(i => i.name).join(', '),
      status: 'Order Received',
      amount: amount,
      time: 0
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <StoreContext.Provider value={{ cartItems, addToCart, clearCart, orders, setOrders, placeOrder, updateOrderStatus }}>
      {children}
    </StoreContext.Provider>
  );
};
