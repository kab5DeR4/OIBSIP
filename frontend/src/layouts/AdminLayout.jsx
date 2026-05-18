import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={styles.adminContainer}>
      <header style={styles.adminHeader}>
        <div style={styles.logoWrapper}>
          <span style={styles.logo}>🛡️ Admin Control</span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          style={styles.logoutBtn}
        >
          <FiLogOut /> Exit Panel
        </motion.button>
      </header>
      
      <main style={styles.adminMain}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  adminContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#111827', // Dark slate background for admin
    color: '#fff',
    fontFamily: "'Outfit', sans-serif"
  },
  adminHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: '#1F2937',
    borderBottom: '1px solid #374151',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#E63946'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: '1px solid #4B5563',
    color: '#D1D5DB',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  },
  adminMain: {
    flexGrow: 1,
    overflowY: 'auto'
  }
};

export default AdminLayout;
