import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Cart = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState(null);
  const { cartItems, clearCart, placeOrder } = useContext(StoreContext);

  // calculate total price
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal += cartItems[i].price;
  }
  
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const delivery = 40;
  const total = subtotal + taxes + delivery;
  const API_URL = import.meta.env.MODE === 'production' 
    ? (import.meta.env.VITE_API_URL || '') 
    : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

  const initPayment = async () => {
    try {
      const res = await fetch(`${API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });
      const data = await res.json();

      if (!data.success) {
        alert('Failed to initiate payment. Please try again.');
        return;
      }

      const options = {
        key: 'rzp_test_SqjPdki0XMhdpO', // Test Key ID provided
        amount: data.amount,
        currency: data.currency,
        name: 'Pizza Artisan',
        description: 'Test Transaction',
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyPayload = {
              ...response,
              email: 'user@example.com', // In a real app, this comes from the logged-in user state
              amount: total
            };
            const verifyRes = await fetch(`${API_URL}/api/payment/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(verifyPayload)
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              console.log('Payment Successful:', verifyData);
              placeOrder(total, cartItems);
              clearCart();
              setOrderStatus('success');
            } else {
              alert('Payment verification failed.');
            }
          } catch (err) {
            console.error('Error verifying payment:', err);
            alert('Something went wrong during payment verification.');
          }
        },
        prefill: {
          name: 'Current User',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#e63946'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (err) {
      console.error('Error initiating payment:', err);
      alert('Could not connect to payment gateway.');
    }
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
          <button className="btn-primary" style={{ marginTop: '30px', width: '100%' }} onClick={() => navigate('/dashboard')}>
            Back to Menu
          </button>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <motion.div className="glass-panel" style={{...styles.card, textAlign: 'center', padding: '60px 20px'}}>
          <h2 style={{color: 'var(--text-primary)', marginBottom: '20px'}}>Your Cart is Empty</h2>
          <p style={{color: 'var(--text-secondary)', marginBottom: '30px'}}>Looks like you haven't added any delicious pizzas yet.</p>
          <button className="btn-primary" style={{ padding: '12px 30px' }} onClick={() => navigate('/dashboard')}>
            Explore Menu
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
          onClick={initPayment}
        >
          Proceed to Pay ₹{total}
        </motion.button>
      </motion.div>
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
