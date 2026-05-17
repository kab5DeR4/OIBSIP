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
    console.log('Login attempt', { email, password });
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
          <div style={styles.logo}>🍕 Pizza Artisan</div>
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
                style={{ paddingLeft: '45px', width: '100%' }}
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
                style={{ paddingLeft: '45px', width: '100%' }}
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

      {/* Secret Admin Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/admin-login')}
        style={styles.adminBtn}
        title="Admin Portal"
      >
        Admin Access
      </motion.button>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: 'var(--bg-color)',
    backgroundImage: 'url("/images/hero.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative' // Needed for absolute positioning of admin button
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '40px',
    backgroundColor: 'var(--surface-color)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '35px'
  },
  logo: {
    fontSize: '2.5rem',
    marginBottom: '15px',
    fontWeight: '800',
    color: 'var(--primary-color)'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '800',
    marginBottom: '8px',
    color: 'var(--text-primary)'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    fontWeight: '500'
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
    left: '16px',
    color: 'var(--text-secondary)',
    fontSize: '1.2rem'
  },
  passwordHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  forgotLink: {
    fontSize: '0.9rem',
    color: 'var(--primary-color)',
    fontWeight: '600'
  },
  submitBtn: {
    marginTop: '20px',
    padding: '16px',
    fontSize: '1.1rem',
    borderRadius: '12px'
  },
  footerText: {
    marginTop: '35px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  link: {
    color: 'var(--primary-color)',
    fontWeight: '700',
    marginLeft: '5px'
  },
  adminBtn: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }
};

export default Login;
