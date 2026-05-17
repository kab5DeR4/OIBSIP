import { useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_INVENTORY = [
  { id: 1, category: 'Base', name: 'Thin Crust', stock: 15, threshold: 20 },
  { id: 2, category: 'Base', name: 'Hand Tossed', stock: 50, threshold: 20 },
  { id: 3, category: 'Sauce', name: 'Tomato Marinara', stock: 100, threshold: 20 },
  { id: 4, category: 'Cheese', name: 'Mozzarella', stock: 18, threshold: 50 },
];

const MOCK_ORDERS = [
  { id: 101, customer: 'John Doe', items: 'Custom (Thin Crust, Tomato, Mozzarella)', status: 'Order Received', amount: 450 },
  { id: 102, customer: 'Jane Smith', items: 'Margherita', status: 'In the kitchen', amount: 150 },
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
      <h1 style={styles.title}>Admin Control Center</h1>

      <div style={styles.grid}>
        {/* Inventory Section */}
        <motion.div className="glass-panel" style={styles.section} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 style={{ marginBottom: '20px' }}>Inventory Management</h2>
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
                {inventory.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={styles.td}>{item.category}</td>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>
                      <span style={{ 
                        color: item.stock < item.threshold ? 'var(--error)' : 'inherit',
                        fontWeight: item.stock < item.threshold ? 'bold' : 'normal'
                      }}>
                        {item.stock}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {item.stock < item.threshold ? (
                        <span style={styles.alertBadge}>Low Stock Alert</span>
                      ) : (
                        <span style={styles.goodBadge}>Optimal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Orders Section */}
        <motion.div className="glass-panel" style={styles.section} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 style={{ marginBottom: '20px' }}>Active Orders</h2>
          <div style={styles.orderList}>
            {orders.map(order => (
              <div key={order.id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <h4>Order #{order.id}</h4>
                  <span style={styles.price}>₹{order.amount}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>
                  {order.customer} - {order.items}
                </p>
                <div style={styles.statusControl}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Update Status:</label>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={styles.select}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt} value={opt} style={{ background: 'var(--bg-color)' }}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
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
  },
  title: {
    marginBottom: '40px',
    color: '#fff',
    borderBottom: '2px solid var(--primary-color)',
    display: 'inline-block',
    paddingBottom: '10px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '30px'
  },
  section: {
    padding: '30px',
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '12px 15px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'var(--text-secondary)',
    fontWeight: '600'
  },
  td: {
    padding: '15px',
  },
  alertBadge: {
    background: 'rgba(239, 68, 68, 0.2)',
    color: 'var(--error)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  goodBadge: {
    background: 'rgba(16, 185, 129, 0.2)',
    color: 'var(--success)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  orderCard: {
    padding: '20px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '12px',
    border: '1px solid var(--glass-border)'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  price: {
    fontWeight: 'bold',
    color: 'var(--primary-color)'
  },
  statusControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  select: {
    background: 'rgba(0,0,0,0.3)',
    color: '#fff',
    border: '1px solid var(--border-color)',
    padding: '8px 12px',
    borderRadius: '6px',
    outline: 'none',
    width: '200px'
  }
};

export default AdminDashboard;
