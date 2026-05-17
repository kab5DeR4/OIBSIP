import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API logic will go here
    console.log('Register attempt', { name, email, password });
    // Mock successful registration
    navigate('/login'); 
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="glass-panel"
        style={styles.card}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>Join Pizza Artisan</h1>
          <p style={styles.subtitle}>Create an account to build your custom pizza</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="input-group">
            <label>Full Name</label>
            <div style={styles.inputWrapper}>
              <FiUser style={styles.icon} />
              <input 
                type="text" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ paddingLeft: '40px', width: '100%' }}
              />
            </div>
          </div>

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
            <label>Password</label>
            <div style={styles.inputWrapper}>
              <FiLock style={styles.icon} />
              <input 
                type="password" 
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
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
            Create Account
          </motion.button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
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
    color: '#fff'
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

export default Register;
