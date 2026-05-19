import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus, LocalOrder } from '../../data/mockStore';
import { OrderStatus } from '../../lib/supabase';
import { ChevronDown, RefreshCw } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState('');

  function fetchOrders() {
    setOrders(getOrders());
    setLoading(false);
  }

  useEffect(() => { fetchOrders(); }, []);

  function handleUpdateStatus(orderId: string, status: OrderStatus) {
    updateOrderStatus(orderId, status);
    fetchOrders();
  }

  const statusOptions: OrderStatus[] = ['order_received', 'in_kitchen', 'sent_to_delivery', 'delivered', 'cancelled'];
  const statusLabels: Record<OrderStatus, string> = {
    payment_pending: 'Awaiting Payment',
    order_received: 'Order Received',
    in_kitchen: 'In Kitchen',
    sent_to_delivery: 'On The Way',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  const statusColors: Partial<Record<OrderStatus, string>> = {
    payment_pending: 'bg-yellow-100 text-yellow-800',
    order_received: 'bg-blue-100 text-blue-800',
    in_kitchen: 'bg-orange-100 text-orange-800',
    sent_to_delivery: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <button onClick={fetchOrders} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>
      <p className="text-gray-500 mb-6">Manage and update customer pizza orders</p>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />)}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">No orders yet. Orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {orders.map(order => (
            <div key={order.id} className="border-b last:border-b-0">
              <button
                onClick={() => setExpandedId(expandedId === order.id ? '' : order.id)}
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">#{order.id.slice(-8)}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {order.user_name} • {new Date(order.created_at).toLocaleString()} • ₹{order.total_amount}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold mr-4 ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                  {statusLabels[order.status]}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === order.id ? 'rotate-180' : ''}`} />
              </button>

              {expandedId === order.id && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Customer</p>
                      <p className="text-sm text-gray-800">{order.user_name}</p>
                      <p className="text-xs text-gray-500">{order.user_email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Delivery Address</p>
                      <p className="text-sm text-gray-800">{order.delivery_address || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Items</p>
                      {order.items.map(i => (
                        <p key={i.id} className="text-sm text-gray-800">• {i.name} ×{i.quantity} — ₹{i.price * i.quantity}</p>
                      ))}
                    </div>
                    {order.notes && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Notes</p>
                        <p className="text-sm text-gray-800">{order.notes}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 mb-2 block">Update Status</label>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map(status => (
                        <button
                          key={status}
                          onClick={() => handleUpdateStatus(order.id, status)}
                          disabled={order.status === status}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 ${
                            order.status === status ? 'bg-gray-300 text-gray-600' : 'bg-orange-500 text-white hover:bg-orange-600'
                          }`}
                        >
                          {statusLabels[status]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
