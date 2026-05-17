import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useContext(StoreContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' || location.pathname === '/admin-login') return null;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      style={{
        ...styles.navbar,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none'
      }}
    >
      <div style={styles.container}>
        <Link to="/dashboard" style={styles.logoContainer}>
          <span style={styles.logoIcon}>🍕</span>
          <span style={styles.logoText}>Pizza Artisan</span>
        </Link>

        {/* Desktop Menu */}
        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link(location.pathname === '/dashboard')}>Menu</Link>
          <Link to="/build-pizza" style={styles.link(location.pathname === '/build-pizza')}>Custom Builder</Link>
        </div>

        <div style={styles.actions}>
          <Link to="/cart">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={styles.iconBtn}>
              <FiShoppingCart size={22} />
              {cartItems.length > 0 && <span style={styles.badge}>{cartItems.length}</span>}
            </motion.div>
          </Link>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            style={styles.logoutBtn}
            onClick={() => navigate('/login')}
          >
            <FiLogOut size={18} />
            <span style={styles.logoutText}>Logout</span>
          </motion.button>
          
          {/* Mobile Menu Toggle */}
          <button style={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={styles.mobileMenu}
        >
          <Link to="/dashboard" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Menu</Link>
          <Link to="/build-pizza" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Custom Builder</Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none'
  },
  logoIcon: {
    fontSize: '2rem'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--primary-color)',
    letterSpacing: '-0.5px'
  },
  navLinks: {
    display: 'none',
    gap: '30px',
    '@media (min-width: 768px)': {
      display: 'flex'
    }
  },
  link: (isActive) => ({
    color: isActive ? 'var(--primary-color)' : 'var(--text-primary)',
    fontWeight: '600',
    fontSize: '1.05rem',
    textDecoration: 'none',
    position: 'relative',
    padding: '5px 0',
    borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
    transition: 'all 0.2s ease'
  }),
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  iconBtn: {
    position: 'relative',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    cursor: 'pointer'
  },
  badge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    border: '2px solid var(--border-color)',
    color: 'var(--text-primary)',
    padding: '8px 16px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem'
  },
  logoutText: {
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'block'
    }
  },
  mobileToggle: {
    display: 'block',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-primary)'
  },
  mobileMenu: {
    backgroundColor: '#fff',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
  },
  mobileLink: {
    padding: '15px 0',
    borderBottom: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    fontWeight: '600',
    textDecoration: 'none'
  }
};

// Add basic media query support via injected styles since inline styles don't support media queries perfectly without a CSS-in-JS library
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (min-width: 768px) {
      nav > div > div:nth-child(2) { display: flex !important; }
      nav > div > div:nth-child(3) > button > span { display: inline-block !important; }
      nav > div > div:nth-child(3) > button:last-child { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Navbar;
