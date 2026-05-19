import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getOrdersByUser, LocalOrder, updateOrderStatus } from '../../data/mockStore';
import { OrderStatus } from '../../lib/supabase';
import { Clock, CheckCircle, Truck, Package, RefreshCw } from 'lucide-react';

export default function OrdersPage() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchOrders() {
    if (!profile) return;
    setOrders(getOrdersByUser(profile.id));
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, [profile]);

  const statusConfig: Record<OrderStatus, { icon: typeof Clock; label: string; color: string }> = {
    payment_pending: { icon: Clock, label: 'Awaiting Payment', color: 'text-yellow-600 bg-yellow-50' },
    order_received: { icon: CheckCircle, label: 'Order Received', color: 'text-blue-600 bg-blue-50' },
    in_kitchen: { icon: Package, label: 'In Kitchen', color: 'text-orange-600 bg-orange-50' },
    sent_to_delivery: { icon: Truck, label: 'On The Way', color: 'text-purple-600 bg-purple-50' },
    delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-green-600 bg-green-50' },
    cancelled: { icon: Clock, label: 'Cancelled', color: 'text-red-600 bg-red-50' },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>
      <p className="text-gray-500 mb-6">Track your pizza orders in real-time</p>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />)}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">No orders yet. Start by adding some pizzas to your cart!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const config = statusConfig[order.status] || statusConfig['order_received'];
            const Icon = config.icon;
            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{order.total_amount}</p>
                    <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1 ${config.color}`}>
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </div>
                  </div>
                </div>
                {order.items.length > 0 && (
                  <div className="text-xs text-gray-500 border-t border-gray-50 pt-2 mt-2">
                    {order.items.map(i => (
                      <span key={i.id} className="mr-2">• {i.name} ×{i.quantity}</span>
                    ))}
                  </div>
                )}
                {order.delivery_address && (
                  <p className="text-xs text-gray-400 mt-1 truncate">📍 {order.delivery_address}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
