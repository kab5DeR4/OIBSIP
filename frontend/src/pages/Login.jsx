import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API logic will go here
    console.log('Login attempt', { email, password });
    // Mock login success
    navigate('/dashboard'); 
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel"
        style={styles.card}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Log in to satisfy your cravings</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="input-group">
            <label>Email Address</label>
            <div style={styles.inputWrapper}>
              <FiMail style={styles.icon} />
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: '40px', width: '100%' }}
              />
            </div>
          </div>

          <div className="input-group">
            <div style={styles.passwordHeader}>
              <label>Password</label>
              <Link to="/forgot-password" style={styles.forgotLink}>Forgot password?</Link>
            </div>
            <div style={styles.inputWrapper}>
              <FiLock style={styles.icon} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '40px', width: '100%' }}
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn-primary"
            style={styles.submitBtn}
          >
            Sign In
          </motion.button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/register" style={styles.link}>Create one now</Link>
        </p>
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
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '40px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '8px',
    background: 'linear-gradient(to right, #ff5e3a, #ff9a44)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    left: '14px',
    color: 'var(--text-secondary)',
    fontSize: '1.2rem'
  },
  passwordHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  forgotLink: {
    fontSize: '0.85rem',
    color: 'var(--primary-color)',
    fontWeight: '500'
  },
  submitBtn: {
    marginTop: '16px',
    padding: '14px',
    fontSize: '1.05rem'
  },
  footerText: {
    marginTop: '32px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  link: {
    color: 'var(--primary-color)',
    fontWeight: '600'
  }
};

export default Login;
