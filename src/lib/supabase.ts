// This file keeps all shared TypeScript types.
// In local mode the supabase client is NOT used — all data comes from mockData.ts / mockStore.ts.
// The stub client below prevents crashes if any legacy code still imports it.

const noop = () => ({ data: null, error: { message: 'local-mode' } });
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async () => ({ error: { message: 'Use AuthContext.signIn instead' } }),
    signUp: async () => ({ error: null }),
    signOut: async () => {},
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: (_table: string) => ({
    select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null }) }), then: () => {} }),
    insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
    update: () => ({ eq: () => ({}) }),
  }),
  channel: (_name: string) => ({
    on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
  }),
} as any;

// ─── Shared Types (kept for use across the app) ───────────────────────────────

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'user' | 'admin';
  email_verified?: boolean;
  created_at?: string;
};

export type PizzaBase = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  threshold: number;
  image_url: string;
  is_active: boolean;
};

export type Sauce = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  threshold: number;
  image_url: string;
  is_active: boolean;
};

export type Cheese = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  threshold: number;
  image_url: string;
  is_active: boolean;
};

export type Veggie = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  threshold: number;
  image_url: string;
  is_active: boolean;
};

export type Meat = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  threshold: number;
  image_url: string;
  is_active: boolean;
};

export type PizzaVariety = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  tags: string[];
  is_active: boolean;
};

export type OrderStatus =
  | 'payment_pending'
  | 'order_received'
  | 'in_kitchen'
  | 'sent_to_delivery'
  | 'delivered'
  | 'cancelled';

export type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  status: OrderStatus;
  payment_id?: string;
  razorpay_order_id?: string;
  delivery_address: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
};

export type OrderItem = {
  id: string;
  order_id: string;
  pizza_variety_id: string | null;
  base_id: string | null;
  sauce_id: string | null;
  cheese_id: string | null;
  quantity: number;
  unit_price: number;
  item_type: 'custom' | 'variety';
};

export type OrderItemTopping = {
  id: string;
  order_item_id: string;
  topping_type: 'veggie' | 'meat';
  topping_id: string;
  topping_name: string;
  price: number;
};
