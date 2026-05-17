import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RazorpayMock from '../components/RazorpayMock';

const Cart = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  // Mock cart items (Normally this would come from Context/Redux)
  const cartItems = [
    { id: 1, name: 'Custom Pizza', details: 'Pan Pizza, Alfredo, Mozzarella, Olive', price: 450 },
    { id: 2, name: 'Margherita', details: 'Regular crust', price: 150 }
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment Successful:', paymentData);
    setShowPayment(false);
    setOrderStatus('success');
  };

  if (orderStatus === 'success') {
    return (
      <div style={styles.container}>
        <motion.div 
          className="glass-panel" 
          style={styles.card}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div style={styles.successIcon}>✓</div>
          <h1 style={{ marginBottom: '10px' }}>Order Placed Successfully!</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Your pizza is being prepared and will be delivered soon.</p>
          <div style={styles.statusBox}>
            <strong>Current Status:</strong> <span style={{ color: 'var(--secondary-color)' }}>Order Received</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="glass-panel" style={styles.card}>
        <h2 style={{ marginBottom: '30px' }}>Your Cart</h2>
        
        <div style={styles.itemsList}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.itemRow}>
              <div>
                <h4 style={{ fontSize: '1.1rem' }}>{item.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.details}</p>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{item.price}</div>
            </div>
          ))}
        </div>

        <div style={styles.totalRow}>
          <h3>Total</h3>
          <h3>₹{total}</h3>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
          style={styles.checkoutBtn}
          onClick={() => setShowPayment(true)}
        >
          Proceed to Payment
        </motion.button>
      </div>

      <AnimatePresence>
        {showPayment && (
          <RazorpayMock 
            amount={total} 
            onSuccess={handlePaymentSuccess} 
            onClose={() => setShowPayment(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    padding: '40px'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '15px',
    borderBottom: '1px solid var(--glass-border)'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '30px',
    paddingTop: '20px',
    borderTop: '2px solid var(--border-color)',
    color: 'var(--primary-color)'
  },
  checkoutBtn: {
    width: '100%',
    padding: '15px',
    fontSize: '1.1rem'
  },
  successIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'var(--success)',
    color: 'white',
    fontSize: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px auto'
  },
  statusBox: {
    marginTop: '30px',
    padding: '20px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '12px',
    textAlign: 'center'
  }
};

export default Cart;
