import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';

const AdminLogin = () => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      navigate('/admin');
    } else {
      setError('Invalid admin passcode');
    }
  };

  return (
    <div style={styles.container}>
      <motion.div 
        style={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div style={styles.iconWrapper}>
          <FiLock size={30} color="var(--primary-color)" />
        </div>
        <h2 style={styles.title}>Admin Portal</h2>
        <p style={styles.subtitle}>Enter master passcode to access the dashboard</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="password" 
            placeholder="Enter Passcode" 
            value={passcode}
            onChange={(e) => { setPasscode(e.target.value); setError(''); }}
            style={{...styles.input, borderColor: error ? 'var(--error)' : 'var(--border-color)'}}
            autoFocus
          />
          {error && <p style={styles.errorText}>{error}</p>}
          <button type="submit" className="btn-primary" style={styles.btn}>Access Dashboard</button>
        </form>

        <button onClick={() => navigate('/login')} style={styles.backBtn}>
          ← Back to User Login
        </button>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#111827', // Dark background to differentiate admin area
    padding: '20px'
  },
  card: {
    background: '#1F2937',
    padding: '40px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
  },
  iconWrapper: {
    width: '60px',
    height: '60px',
    background: 'rgba(230, 57, 70, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto'
  },
  title: {
    color: '#fff',
    fontSize: '1.8rem',
    marginBottom: '8px',
    fontWeight: '800'
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: '0.9rem',
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    background: '#374151',
    border: '2px solid',
    color: '#fff',
    fontSize: '1.1rem',
    textAlign: 'center',
    outline: 'none',
    letterSpacing: '2px'
  },
  errorText: {
    color: 'var(--error)',
    fontSize: '0.85rem',
    margin: '-5px 0'
  },
  btn: {
    padding: '14px',
    fontSize: '1.1rem',
    marginTop: '10px'
  },
  backBtn: {
    background: 'transparent',
    border: 'none',
    color: '#9CA3AF',
    marginTop: '25px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600'
  }
};

export default AdminLogin;
