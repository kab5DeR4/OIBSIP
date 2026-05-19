import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { addOrder, LocalOrderItem } from '../../data/mockStore';
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle, MapPin } from 'lucide-react';

type Props = {
  onViewOrders: () => void;
  onContinueShopping: () => void;
};

export default function CartPage({ onViewOrders, onContinueShopping }: Props) {
  const { items, totalPrice, totalItems, updateQty, removeItem, clearCart } = useCart();
  const { profile } = useAuth();
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [placed, setPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);

  async function placeOrder() {
    if (!profile || !address.trim()) return;
    setPlacing(true);
    await new Promise(r => setTimeout(r, 800)); // simulate processing

    const orderItems: LocalOrderItem[] = items.map(i => ({
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      type: i.type,
      details: i.details,
    }));

    addOrder({
      user_id: profile.id,
      user_name: profile.full_name,
      user_email: profile.email,
      items: orderItems,
      total_amount: totalPrice,
      status: 'order_received',
      delivery_address: address,
      notes,
    });

    clearCart();
    setPlaced(true);
    setPlacing(false);
  }

  if (placed) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed! 🎉</h2>
          <p className="text-gray-500 mb-6">Your pizza is on its way! Track it in My Orders.</p>
          <div className="flex gap-3">
            <button onClick={onContinueShopping} className="flex-1 border border-gray-300 rounded-xl py-2.5 text-gray-600 font-medium hover:bg-gray-50">
              Continue Shopping
            </button>
            <button onClick={onViewOrders} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-2.5 flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some pizzas from the menu!</p>
          <button onClick={onContinueShopping} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl">
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart <span className="text-base font-normal text-gray-400">({totalItems} items)</span></h1>

      {/* Cart Items */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 divide-y">
        {items.map(item => (
          <div key={item.id} className="p-4 flex gap-4">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
            )}
            {!item.imageUrl && (
              <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0 text-2xl">🍕</div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{item.name}</p>
              {item.details && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.details}</p>}
              <p className="text-sm text-orange-600 font-bold mt-1">₹{item.price} each</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm font-bold text-gray-900">₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery & Notes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-orange-500" /> Delivery Address *
        </label>
        <textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          placeholder="Enter your full delivery address..."
        />
        <label className="block text-sm font-semibold text-gray-900 mb-2 mt-4">Special Instructions</label>
        <input
          type="text"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="e.g. Extra sauce, no onions..."
        />
      </div>

      {/* Order Summary */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-5">
        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-1 text-sm mb-3">
          <div className="flex justify-between text-gray-600"><span>Subtotal ({totalItems} items)</span><span>₹{totalPrice}</span></div>
          <div className="flex justify-between text-gray-600"><span>Delivery</span><span className="text-green-600 font-medium">FREE</span></div>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-orange-200 pt-3">
          <span>Total</span><span className="text-orange-600">₹{totalPrice}</span>
        </div>
      </div>

      <button
        onClick={placeOrder}
        disabled={!address.trim() || placing}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors text-base"
      >
        {placing ? 'Placing Order...' : `Place Order • ₹${totalPrice}`}
      </button>
    </div>
  );
}
