import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiCheck, FiRefreshCw } from 'react-icons/fi';

const MOCK_INVENTORY = [
  { id: 1, category: 'Base', name: 'Thin Crust', stock: 15, threshold: 20 },
  { id: 2, category: 'Base', name: 'Hand Tossed', stock: 50, threshold: 20 },
  { id: 3, category: 'Sauce', name: 'Tomato Marinara', stock: 100, threshold: 20 },
  { id: 4, category: 'Cheese', name: 'Mozzarella', stock: 18, threshold: 50 },
  { id: 5, category: 'Meat', name: 'Pepperoni', stock: 5, threshold: 15 },
];

const MOCK_ORDERS = [
  { id: 101, customer: 'Alexander Pierce', items: 'Custom (Thin Crust, Tomato, Mozzarella)', status: 'Order Received', amount: 450, time: 2 },
  { id: 102, customer: 'Sophia Reynolds', items: 'Classic Margherita', status: 'In the kitchen', amount: 199, time: 15 },
  { id: 103, customer: 'Marcus Chen', items: 'Double Pepperoni & Farmhouse Veggie', status: 'Order Received', amount: 698, time: 1 },
];

const STATUS_OPTIONS = ['Order Received', 'In the kitchen', 'Sent to delivery', 'Delivered'];

const AdminDashboard = () => {
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Simulate real-time order updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          // Increase minutes ago
          let newTime = order.time + 1;
          
          // Auto-progress status for simulation
          let newStatus = order.status;
          if (newTime > 5 && order.status === 'Order Received') newStatus = 'In the kitchen';
          if (newTime > 25 && order.status === 'In the kitchen') newStatus = 'Sent to delivery';
          if (newTime > 45 && order.status === 'Sent to delivery') newStatus = 'Delivered';
          
          return { ...order, time: newTime, status: newStatus };
        });
      });
    }, 60000); // Update every minute

    // Randomly add a new order simulation
    const newOrderInterval = setInterval(() => {
      const newOrder = {
        id: 100 + Math.floor(Math.random() * 900),
        customer: 'New Customer',
        items: 'Mushroom Truffle',
        status: 'Order Received',
        amount: 499,
        time: 0
      };
      setOrders(prev => [newOrder, ...prev]);
    }, 180000); // Every 3 mins

    return () => {
      clearInterval(interval);
      clearInterval(newOrderInterval);
    };
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditValue(item.stock.toString());
  };

  const saveInventory = (id) => {
    const newStock = parseInt(editValue, 10);
    if (!isNaN(newStock) && newStock >= 0) {
      setInventory(inventory.map(item => item.id === id ? { ...item, stock: newStock } : item));
    }
    setEditingId(null);
  };

  const handleManualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Control Center</h1>
          <p style={styles.subtitle}>Manage your pizzeria's operations and inventory in real-time.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.refreshBtn}
          onClick={handleManualRefresh}
        >
          <motion.div animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 1, ease: "linear", repeat: refreshing ? Infinity : 0 }}>
            <FiRefreshCw size={20} />
          </motion.div>
          Sync Live Data
        </motion.button>
      </div>

      <div style={styles.grid}>
        {/* Inventory Section */}
        <motion.div className="glass-panel" style={styles.section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={styles.sectionHeader}>
            <h2>Inventory Management</h2>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Item</th>
                  <th style={styles.th}>Stock Level</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, idx) => (
                  <motion.tr 
                    key={item.id} 
                    style={styles.tr}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <td style={styles.td}><strong>{item.category}</strong></td>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>
                      {editingId === item.id ? (
                        <div style={styles.editWrapper}>
                          <input 
                            type="number" 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            style={styles.editInput}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <span style={{ 
                          color: item.stock < item.threshold ? 'var(--error)' : 'var(--text-primary)',
                          fontWeight: '800',
                          fontSize: '1.2rem'
                        }}>
                          {item.stock} <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'normal'}}>units</span>
                        </span>
                      )}
                    </td>
                    <td style={styles.td}>
                      {item.stock < item.threshold ? (
                        <span style={styles.alertBadge}>● Low Stock</span>
                      ) : (
                        <span style={styles.goodBadge}>● Optimal</span>
                      )}
                    </td>
                    <td style={styles.td}>
                      {editingId === item.id ? (
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => saveInventory(item.id)}
                          style={{...styles.actionBtn, background: 'var(--success)', color: '#fff'}}
                        >
                          <FiCheck size={18} /> Save
                        </motion.button>
                      ) : (
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => startEditing(item)}
                          style={styles.actionBtn}
                        >
                          <FiEdit2 size={16} /> Edit
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Orders Section */}
        <motion.div className="glass-panel" style={styles.section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div style={styles.sectionHeader}>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <h2>Live Orders</h2>
              <span style={styles.liveIndicator}>● Live</span>
            </div>
            <span style={styles.orderCount}>{orders.filter(o => o.status !== 'Delivered').length} Active</span>
          </div>
          <div style={styles.orderList}>
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.div 
                  key={order.id} 
                  style={{
                    ...styles.orderCard,
                    borderLeft: order.status === 'Order Received' ? '4px solid var(--primary-color)' : 
                                order.status === 'In the kitchen' ? '4px solid #f59e0b' : 
                                order.status === 'Delivered' ? '4px solid var(--success)' : '1px solid var(--border-color)'
                  }}
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                >
                  <div style={styles.orderHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={styles.orderId}>#{order.id}</h4>
                      <span style={styles.orderTime}>{order.time === 0 ? 'Just now' : `${order.time} mins ago`}</span>
                    </div>
                    <span style={styles.price}>₹{order.amount}</span>
                  </div>
                  
                  <div style={styles.customerInfo}>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{order.customer}</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px' }}>
                      {order.items}
                    </p>
                  </div>

                  <div style={styles.statusControl}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Status:</label>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        ...styles.select,
                        backgroundColor: order.status === 'Delivered' ? '#d1fae5' : '#FAF9F6',
                        color: order.status === 'Delivered' ? '#065f46' : 'var(--text-primary)'
                      }}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: '100vh',
    background: 'var(--bg-color)',
    paddingTop: '100px' // Adjust for fixed navbar
  },
  header: {
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '10px'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#fff',
    border: '2px solid var(--border-color)',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    color: 'var(--text-primary)',
    boxShadow: 'var(--shadow-sm)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '30px'
  },
  section: {
    padding: '30px',
    backgroundColor: 'var(--surface-color)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    borderBottom: '2px solid var(--border-color)',
    paddingBottom: '15px'
  },
  liveIndicator: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--primary-color)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '800',
    animation: 'pulse 2s infinite'
  },
  orderCount: {
    background: 'rgba(16, 185, 129, 0.1)',
    color: 'var(--success)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontWeight: '700',
    fontSize: '0.9rem'
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#FAF9F6',
    borderRadius: '12px',
    border: '1px solid var(--border-color)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '16px 20px',
    background: '#F3F4F6',
    color: 'var(--text-secondary)',
    fontWeight: '700',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  tr: {
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: '#fff'
  },
  td: {
    padding: '16px 20px',
    color: 'var(--text-primary)'
  },
  editWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  editInput: {
    width: '70px',
    padding: '8px',
    borderRadius: '6px',
    border: '2px solid var(--primary-color)',
    fontSize: '1.1rem',
    fontWeight: '700',
    textAlign: 'center',
    outline: 'none'
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#E5E7EB',
    color: 'var(--text-primary)',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  alertBadge: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--error)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  goodBadge: {
    background: 'rgba(16, 185, 129, 0.1)',
    color: 'var(--success)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxHeight: '700px',
    overflowY: 'auto',
    paddingRight: '10px'
  },
  orderCard: {
    padding: '25px',
    background: '#FAF9F6',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-sm)'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  orderId: {
    fontSize: '1.2rem',
    color: 'var(--text-primary)'
  },
  orderTime: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    background: '#E5E7EB',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: '600'
  },
  price: {
    fontWeight: '800',
    fontSize: '1.3rem',
    color: 'var(--primary-color)'
  },
  customerInfo: {
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px dashed var(--border-color)'
  },
  statusControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)'
  },
  select: {
    border: '1px solid var(--border-color)',
    padding: '10px 16px',
    borderRadius: '8px',
    outline: 'none',
    width: '220px',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

// Add pulse animation for live indicator
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.4; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export default AdminDashboard;
