import { Order, OrderStatus } from '../lib/supabase';

const ORDERS_KEY = 'pizzacraft_orders';
const INVENTORY_KEY = 'pizzacraft_inventory';
const USERS_KEY = 'pizzacraft_users';

// ─── Types ────────────────────────────────────────────────────────────────────

export type LocalUser = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  password: string; // plaintext for local demo
  role: 'user' | 'admin';
  created_at: string;
};

export type LocalInventoryItem = {
  id: string;
  name: string;
  category: 'bases' | 'sauces' | 'cheeses' | 'veggies' | 'meats';
  stock: number;
  threshold: number;
  price: number;
  is_active: boolean;
};

export type LocalOrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'variety' | 'custom';
  details?: string;
};

export type LocalOrder = {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  items: LocalOrderItem[];
  total_amount: number;
  status: OrderStatus;
  delivery_address: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_USERS: LocalUser[] = [
  {
    id: 'user-admin-001',
    email: 'admin@pizzacraft.com',
    full_name: 'Admin User',
    phone: '+91 98765 43210',
    password: 'admin123',
    role: 'admin',
    created_at: new Date().toISOString(),
  },
  {
    id: 'user-demo-001',
    email: 'user@pizzacraft.com',
    full_name: 'Demo User',
    phone: '+91 98765 00000',
    password: 'user123',
    role: 'user',
    created_at: new Date().toISOString(),
  },
];

const SEED_INVENTORY: LocalInventoryItem[] = [
  { id: 'base-1', name: 'Thin Crust', category: 'bases', stock: 100, threshold: 10, price: 149, is_active: true },
  { id: 'base-2', name: 'Thick Crust', category: 'bases', stock: 100, threshold: 10, price: 179, is_active: true },
  { id: 'base-3', name: 'Whole Wheat', category: 'bases', stock: 80, threshold: 10, price: 199, is_active: true },
  { id: 'base-4', name: 'Gluten-Free', category: 'bases', stock: 50, threshold: 5, price: 229, is_active: true },
  { id: 'base-5', name: 'Cheese Stuffed', category: 'bases', stock: 60, threshold: 8, price: 269, is_active: true },
  { id: 'sauce-1', name: 'Classic Tomato', category: 'sauces', stock: 200, threshold: 20, price: 49, is_active: true },
  { id: 'sauce-2', name: 'Basil Pesto', category: 'sauces', stock: 120, threshold: 15, price: 79, is_active: true },
  { id: 'sauce-3', name: 'Smoky BBQ', category: 'sauces', stock: 150, threshold: 15, price: 69, is_active: true },
  { id: 'sauce-4', name: 'White Garlic', category: 'sauces', stock: 130, threshold: 15, price: 69, is_active: true },
  { id: 'sauce-5', name: 'Spicy Arrabbiata', category: 'sauces', stock: 100, threshold: 10, price: 59, is_active: true },
  { id: 'cheese-1', name: 'Mozzarella', category: 'cheeses', stock: 200, threshold: 20, price: 89, is_active: true },
  { id: 'cheese-2', name: 'Cheddar', category: 'cheeses', stock: 150, threshold: 15, price: 99, is_active: true },
  { id: 'cheese-3', name: 'Parmesan', category: 'cheeses', stock: 100, threshold: 10, price: 119, is_active: true },
  { id: 'cheese-4', name: 'Vegan Cheese', category: 'cheeses', stock: 70, threshold: 8, price: 129, is_active: true },
  { id: 'veggie-1', name: 'Bell Peppers', category: 'veggies', stock: 300, threshold: 30, price: 29, is_active: true },
  { id: 'veggie-2', name: 'Mushrooms', category: 'veggies', stock: 250, threshold: 25, price: 35, is_active: true },
  { id: 'veggie-3', name: 'Black Olives', category: 'veggies', stock: 200, threshold: 20, price: 39, is_active: true },
  { id: 'veggie-4', name: 'Onions', category: 'veggies', stock: 350, threshold: 30, price: 19, is_active: true },
  { id: 'veggie-5', name: 'Spinach', category: 'veggies', stock: 200, threshold: 20, price: 25, is_active: true },
  { id: 'veggie-6', name: 'Jalapeños', category: 'veggies', stock: 150, threshold: 15, price: 35, is_active: true },
  { id: 'meat-1', name: 'Pepperoni', category: 'meats', stock: 200, threshold: 20, price: 69, is_active: true },
  { id: 'meat-2', name: 'Grilled Chicken', category: 'meats', stock: 180, threshold: 18, price: 79, is_active: true },
  { id: 'meat-3', name: 'Crispy Bacon', category: 'meats', stock: 150, threshold: 15, price: 89, is_active: true },
  { id: 'meat-4', name: 'Italian Sausage', category: 'meats', stock: 120, threshold: 12, price: 85, is_active: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function load<T>(key: string, seed: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as T;
  } catch {
    return seed;
  }
}

function save<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

// ─── Users ────────────────────────────────────────────────────────────────────

export function getUsers(): LocalUser[] {
  return load<LocalUser[]>(USERS_KEY, SEED_USERS);
}

export function getUserByEmail(email: string): LocalUser | undefined {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function registerUser(data: Omit<LocalUser, 'id' | 'created_at'>): LocalUser {
  const users = getUsers();
  const newUser: LocalUser = { ...data, id: generateId(), created_at: new Date().toISOString() };
  save(USERS_KEY, [...users, newUser]);
  return newUser;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export function getOrders(): LocalOrder[] {
  return load<LocalOrder[]>(ORDERS_KEY, []);
}

export function getOrdersByUser(userId: string): LocalOrder[] {
  return getOrders().filter(o => o.user_id === userId);
}

export function addOrder(order: Omit<LocalOrder, 'id' | 'created_at' | 'updated_at'>): LocalOrder {
  const orders = getOrders();
  const newOrder: LocalOrder = {
    ...order,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  save(ORDERS_KEY, [newOrder, ...orders]);
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getOrders().map(o =>
    o.id === orderId ? { ...o, status, updated_at: new Date().toISOString() } : o
  );
  save(ORDERS_KEY, orders);
}

export function confirmOrderPayment(orderId: string): void {
  updateOrderStatus(orderId, 'order_received');
}

// ─── Inventory ────────────────────────────────────────────────────────────────

export function getInventory(): LocalInventoryItem[] {
  return load<LocalInventoryItem[]>(INVENTORY_KEY, SEED_INVENTORY);
}

export function updateStock(itemId: string, newStock: number): void {
  const items = getInventory().map(i =>
    i.id === itemId ? { ...i, stock: newStock } : i
  );
  save(INVENTORY_KEY, items);
}

export function resetInventory(): void {
  save(INVENTORY_KEY, SEED_INVENTORY);
}
