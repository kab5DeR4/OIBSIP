import { motion } from 'framer-motion';

const RazorpayMock = ({ amount, onSuccess, onClose }) => {
  return (
    <div style={styles.overlay}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="glass-panel"
        style={styles.modal}
      >
        <div style={styles.header}>
          <h3>Razorpay (Test Mode)</h3>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>
        
        <div style={styles.content}>
          <p>Mock Payment for Pizza Artisan</p>
          <h2 style={{ margin: '15px 0' }}>₹{amount}</h2>
          
          <div style={styles.dummyForm}>
            <input type="text" placeholder="Card Number (Dummy)" disabled style={styles.input} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="MM/YY" disabled style={styles.input} />
              <input type="text" placeholder="CVV" disabled style={styles.input} />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
            style={{ width: '100%', marginTop: '20px', background: 'var(--success)' }}
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
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    width: '100%',
    maxWidth: '400px',
    background: '#1e293b',
    border: '1px solid #334155'
  },
  header: {
    padding: '15px 20px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer'
  },
  content: {
    padding: '30px 20px',
    textAlign: 'center'
  },
  dummyForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
    opacity: 0.5
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#fff',
    width: '100%'
  }
};

export default RazorpayMock;
