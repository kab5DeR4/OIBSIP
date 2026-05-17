import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const mockPizzas = [
  { id: 1, name: 'Margherita', price: 150, description: 'Classic delight with 100% real mozzarella cheese' },
  { id: 2, name: 'Farmhouse', price: 250, description: 'Delightful combination of onion, capsicum, tomato & mushroom' },
  { id: 3, name: 'Peppy Paneer', price: 280, description: 'Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Our Signature Pizzas</h1>
        <p style={styles.subtitle}>Handcrafted perfection baked just for you</p>
      </div>

      <div style={styles.grid}>
        {mockPizzas.map((pizza) => (
          <motion.div
            key={pizza.id}
            className="glass-panel"
            style={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: pizza.id * 0.1 }}
            onHoverStart={() => setHoveredId(pizza.id)}
            onHoverEnd={() => setHoveredId(null)}
            whileHover={{ y: -10 }}
          >
            <div style={styles.imagePlaceholder}>
              <span style={styles.emoji}>🍕</span>
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.pizzaName}>{pizza.name}</h3>
              <p style={styles.pizzaDesc}>{pizza.description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>₹{pizza.price}</span>
                <motion.button 
                  className="btn-primary" 
                  style={{...styles.orderBtn, opacity: hoveredId === pizza.id ? 1 : 0.8}}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={styles.customSection}>
        <motion.div 
          className="glass-panel" 
          style={styles.customCard}
          whileHover={{ scale: 1.02 }}
        >
          <div style={styles.customContent}>
            <h2>Want something unique?</h2>
            <p>Build your own pizza from scratch! Choose your base, sauce, cheese, and toppings.</p>
            <motion.button 
              className="btn-primary" 
              style={styles.customBtn}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/build-pizza')}
            >
              Start Building 🛠️
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #fff, #94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '0'
  },
  imagePlaceholder: {
    height: '200px',
    background: 'linear-gradient(to bottom right, rgba(255,94,58,0.1), rgba(255,154,68,0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid var(--glass-border)'
  },
  emoji: {
    fontSize: '5rem'
  },
  cardContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  pizzaName: {
    fontSize: '1.4rem',
    marginBottom: '10px',
    color: '#fff'
  },
  pizzaDesc: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    marginBottom: '20px',
    flexGrow: 1
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--primary-color)'
  },
  orderBtn: {
    padding: '8px 20px',
    fontSize: '0.95rem',
    boxShadow: 'none'
  },
  customSection: {
    marginTop: '60px',
    paddingBottom: '40px'
  },
  customCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
    border: '1px solid var(--primary-color)',
    boxShadow: '0 0 30px rgba(255, 94, 58, 0.15)',
    padding: '40px',
    textAlign: 'center'
  },
  customContent: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  customBtn: {
    marginTop: '10px',
    fontSize: '1.1rem',
    padding: '14px 32px'
  }
};

export default Dashboard;
