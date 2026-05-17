import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RazorpayMock from '../components/RazorpayMock';

const Cart = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  // Mock cart items (Normally this would come from Context/Redux)
  const cartItems = [
    { id: 1, name: 'Classic Margherita', details: 'Regular crust', price: 199, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Custom Pizza', details: 'Pan Pizza, Alfredo, Mozzarella, Olive', price: 450, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=150&q=80' }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const delivery = 40;
  const total = subtotal + taxes + delivery;

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
          transition={{ type: 'spring' }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            style={styles.successIcon}
          >
            ✓
          </motion.div>
          <h1 style={styles.successTitle}>Order Confirmed!</h1>
          <p style={styles.successText}>Your delicious pizza is being prepared and will be at your door soon.</p>
          <div style={styles.statusBox}>
            <strong style={{ color: 'var(--text-secondary)' }}>Current Status:</strong> <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem', marginLeft: '10px' }}>In the Kitchen 👨‍🍳</span>
          </div>
          <button className="btn-primary" style={{ marginTop: '30px', width: '100%' }} onClick={() => window.location.href = '/dashboard'}>
            Back to Menu
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <motion.div 
        className="glass-panel" 
        style={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>Your Order Summary</h2>
          <span style={styles.itemCount}>{cartItems.length} Items</span>
        </div>
        
        <div style={styles.itemsList}>
          {cartItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              style={styles.itemRow}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={styles.itemInfo}>
                <img src={item.image} alt={item.name} style={styles.itemImg} />
                <div>
                  <h4 style={styles.itemName}>{item.name}</h4>
                  <p style={styles.itemDetails}>{item.details}</p>
                </div>
              </div>
              <div style={styles.itemPrice}>₹{item.price}</div>
            </motion.div>
          ))}
        </div>

        <div style={styles.billSummary}>
          <div style={styles.billRow}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div style={styles.billRow}>
            <span>Taxes & Charges (5%)</span>
            <span>₹{taxes}</span>
          </div>
          <div style={styles.billRow}>
            <span>Delivery Partner Fee</span>
            <span>₹{delivery}</span>
          </div>
          <div style={styles.totalRow}>
            <span>To Pay</span>
            <span>₹{total}</span>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(230,57,70,0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
          style={styles.checkoutBtn}
          onClick={() => setShowPayment(true)}
        >
          Proceed to Pay ₹{total}
        </motion.button>
      </motion.div>

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
    padding: '40px 20px',
    background: 'var(--bg-color)',
  },
  card: {
    width: '100%',
    maxWidth: '700px',
    padding: '40px',
    backgroundColor: 'var(--surface-color)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid var(--border-color)',
    paddingBottom: '20px'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  itemCount: {
    background: 'rgba(230, 57, 70, 0.1)',
    color: 'var(--primary-color)',
    padding: '6px 16px',
    borderRadius: '20px',
    fontWeight: '700',
    fontSize: '0.9rem'
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
    paddingBottom: '20px',
    borderBottom: '1px solid var(--border-color)'
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  itemImg: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: 'var(--shadow-sm)'
  },
  itemName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '4px'
  },
  itemDetails: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    maxWidth: '300px'
  },
  itemPrice: {
    fontWeight: '800',
    fontSize: '1.2rem',
    color: 'var(--text-primary)'
  },
  billSummary: {
    background: '#FAF9F6',
    padding: '25px',
    borderRadius: '16px',
    marginBottom: '30px',
    border: '1px solid var(--border-color)'
  },
  billRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    color: 'var(--text-secondary)',
    fontWeight: '500'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px dashed var(--border-color)',
    color: 'var(--text-primary)',
    fontSize: '1.5rem',
    fontWeight: '800'
  },
  checkoutBtn: {
    width: '100%',
    padding: '18px',
    fontSize: '1.2rem',
    borderRadius: '12px'
  },
  successIcon: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'var(--success)',
    color: 'white',
    fontSize: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 30px auto',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)'
  },
  successTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '15px',
    color: 'var(--text-primary)'
  },
  successText: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
    marginBottom: '30px'
  },
  statusBox: {
    padding: '25px',
    background: '#FAF9F6',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid var(--border-color)'
  }
};

export default Cart;
