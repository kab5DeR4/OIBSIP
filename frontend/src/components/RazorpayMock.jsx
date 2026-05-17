import { motion } from 'framer-motion';

const RazorpayMock = ({ amount, onSuccess, onClose }) => {
  return (
    <div style={styles.overlay}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel"
        style={styles.modal}
      >
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.razorpayLogo}>₹</div>
            <h3 style={styles.headerTitle}>Razorpay <span style={styles.testBadge}>TEST MODE</span></h3>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>
        
        <div style={styles.content}>
          <p style={styles.merchantText}>Pizza Artisan</p>
          <h2 style={styles.amount}>₹{amount}</h2>
          
          <div style={styles.paymentMethods}>
            <div style={{...styles.methodTab, ...styles.activeTab}}>Card</div>
            <div style={styles.methodTab}>UPI</div>
            <div style={styles.methodTab}>Netbanking</div>
          </div>

          <div style={styles.dummyForm}>
            <input type="text" placeholder="Card Number (Dummy)" disabled style={styles.input} />
            <div style={{ display: 'flex', gap: '15px' }}>
              <input type="text" placeholder="Expiry (MM/YY)" disabled style={styles.input} />
              <input type="text" placeholder="CVV" disabled style={styles.input} />
            </div>
            <input type="text" placeholder="Cardholder Name" disabled style={styles.input} />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
            style={styles.payBtn}
            onClick={() => {
              // Simulate network request
              setTimeout(() => {
                onSuccess({
                  razorpay_payment_id: 'pay_dummy123456',
                  razorpay_order_id: 'order_dummy789012',
                  razorpay_signature: 'dummy_sig'
                });
              }, 1500);
            }}
          >
            Pay Now (Success)
          </motion.button>

          <p style={styles.secureText}>🔒 Secured by Razorpay</p>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
    border: 'none'
  },
  header: {
    padding: '20px',
    backgroundColor: '#0a2342', // Razorpay dark blue
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ffffff'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  razorpayLogo: {
    width: '24px',
    height: '24px',
    backgroundColor: '#3395ff',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  headerTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  testBadge: {
    backgroundColor: '#ef4444',
    color: '#fff',
    fontSize: '0.65rem',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.8rem',
    cursor: 'pointer',
    opacity: 0.8
  },
  content: {
    padding: '30px 25px',
    backgroundColor: '#FAF9F6'
  },
  merchantText: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    fontWeight: '500',
    textAlign: 'center'
  },
  amount: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    textAlign: 'center',
    margin: '10px 0 25px 0'
  },
  paymentMethods: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '20px'
  },
  methodTab: {
    padding: '10px 15px',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    cursor: 'pointer'
  },
  activeTab: {
    color: '#3395ff',
    borderBottom: '2px solid #3395ff'
  },
  dummyForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    opacity: 0.7
  },
  input: {
    padding: '14px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: '#ffffff',
    color: 'var(--text-primary)',
    width: '100%',
    fontSize: '0.95rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  payBtn: {
    width: '100%',
    marginTop: '25px',
    background: '#3395ff', // Razorpay blue
    boxShadow: '0 4px 14px rgba(51, 149, 255, 0.3)',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '700'
  },
  secureText: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '500'
  }
};

export default RazorpayMock;
