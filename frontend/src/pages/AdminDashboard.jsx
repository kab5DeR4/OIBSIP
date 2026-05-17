import { useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_INVENTORY = [
  { id: 1, category: 'Base', name: 'Thin Crust', stock: 15, threshold: 20 },
  { id: 2, category: 'Base', name: 'Hand Tossed', stock: 50, threshold: 20 },
  { id: 3, category: 'Sauce', name: 'Tomato Marinara', stock: 100, threshold: 20 },
  { id: 4, category: 'Cheese', name: 'Mozzarella', stock: 18, threshold: 50 },
  { id: 5, category: 'Meat', name: 'Pepperoni', stock: 5, threshold: 15 },
];

const MOCK_ORDERS = [
  { id: 101, customer: 'John Doe', items: 'Custom (Thin Crust, Tomato, Mozzarella)', status: 'Order Received', amount: 450, time: '10 mins ago' },
  { id: 102, customer: 'Jane Smith', items: 'Classic Margherita', status: 'In the kitchen', amount: 199, time: '25 mins ago' },
];

const STATUS_OPTIONS = ['Order Received', 'In the kitchen', 'Sent to delivery', 'Delivered'];

const AdminDashboard = () => {
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Control Center</h1>
        <p style={styles.subtitle}>Manage your pizzeria's operations and inventory.</p>
      </div>

      <div style={styles.grid}>
        {/* Inventory Section */}
        <motion.div className="glass-panel" style={styles.section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={styles.sectionHeader}>
            <h2>Inventory Management</h2>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Restock All</button>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Item</th>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Status</th>
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
                      <span style={{ 
                        color: item.stock < item.threshold ? 'var(--error)' : 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '1.1rem'
                      }}>
                        {item.stock} <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'normal'}}>units</span>
                      </span>
                    </td>
                    <td style={styles.td}>
                      {item.stock < item.threshold ? (
                        <span style={styles.alertBadge}>● Low Stock</span>
                      ) : (
                        <span style={styles.goodBadge}>● Optimal</span>
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
            <h2>Live Orders</h2>
            <span style={styles.orderCount}>{orders.length} Active</span>
          </div>
          <div style={styles.orderList}>
            {orders.map((order, idx) => (
              <motion.div 
                key={order.id} 
                style={styles.orderCard}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div style={styles.orderHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h4 style={styles.orderId}>#{order.id}</h4>
                    <span style={styles.orderTime}>{order.time}</span>
                  </div>
                  <span style={styles.price}>₹{order.amount}</span>
                </div>
                
                <div style={styles.customerInfo}>
                  <strong style={{ color: 'var(--text-primary)' }}>{order.customer}</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
                    {order.items}
                  </p>
                </div>

                <div style={styles.statusControl}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Update Status:</label>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={styles.select}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            ))}
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
  },
  header: {
    marginBottom: '40px',
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
  orderCount: {
    background: 'rgba(230, 57, 70, 0.1)',
    color: 'var(--primary-color)',
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
    gap: '20px'
  },
  orderCard: {
    padding: '25px',
    background: '#FAF9F6',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
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
    borderRadius: '4px'
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
    background: '#FAF9F6',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    padding: '10px 16px',
    borderRadius: '8px',
    outline: 'none',
    width: '220px',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer'
  }
};

export default AdminDashboard;
