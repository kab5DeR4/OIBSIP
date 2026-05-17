import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const mockPizzas = [
  { 
    id: 1, 
    name: 'Classic Margherita', 
    price: 199, 
    description: 'Authentic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella, and basil.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 2, 
    name: 'Farmhouse Veggie', 
    price: 299, 
    description: 'Delightful combination of onion, capsicum, tomato, and fresh mushrooms.',
    image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 3, 
    name: 'Peppy Paneer', 
    price: 349, 
    description: 'Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 4, 
    name: 'Double Pepperoni', 
    price: 399, 
    description: 'Loaded with premium pepperoni slices and extra mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 5, 
    name: 'BBQ Chicken', 
    price: 449, 
    description: 'Smoked BBQ chicken chunks, red onions, and a drizzle of tangy BBQ sauce.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 6, 
    name: 'Spicy Italian', 
    price: 429, 
    description: 'Italian sausage, spicy salami, jalapeños, and crushed red pepper.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 7, 
    name: 'Mushroom Truffle', 
    price: 499, 
    description: 'Wild mushrooms, truffle oil, roasted garlic, and parmesan cream base.',
    image: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 8, 
    name: 'Four Cheese (Quattro Formaggi)', 
    price: 379, 
    description: 'A decadent blend of Mozzarella, Gorgonzola, Parmesan, and Ricotta.',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <motion.div 
        style={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Craving Perfection?</h1>
          <p style={styles.heroSubtitle}>Fresh ingredients, wood-fired taste, delivered hot to your door.</p>
          <motion.button 
            className="btn-primary" 
            style={styles.heroBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
          >
            Order Now
          </motion.button>
        </div>
      </motion.div>

      {/* Menu Section */}
      <div id="menu" style={styles.menuSection}>
        <div style={styles.header}>
          <h2 style={styles.sectionTitle}>Our Signature Menu</h2>
          <div style={styles.divider}></div>
        </div>

        <div style={styles.grid}>
          {mockPizzas.map((pizza) => (
            <motion.div
              key={pizza.id}
              className="glass-panel"
              style={styles.card}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: pizza.id * 0.05 }}
              onHoverStart={() => setHoveredId(pizza.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div style={styles.imageContainer}>
                <img 
                  src={pizza.image} 
                  alt={pizza.name} 
                  style={{
                    ...styles.pizzaImage,
                    transform: hoveredId === pizza.id ? 'scale(1.05)' : 'scale(1)'
                  }} 
                />
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.pizzaName}>{pizza.name}</h3>
                <p style={styles.pizzaDesc}>{pizza.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.price}>₹{pizza.price}</span>
                  <motion.button 
                    className="btn-primary" 
                    style={styles.orderBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Pizza Builder Banner */}
        <div style={styles.customSection}>
          <motion.div 
            style={styles.customCard}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div style={styles.customContent}>
              <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '10px' }}>Be the Chef!</h2>
              <p style={{ color: '#fff', fontSize: '1.1rem', opacity: 0.9, marginBottom: '25px' }}>
                Create your dream pizza exactly how you want it.
              </p>
              <motion.button 
                style={styles.customBtn}
                whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/build-pizza')}
              >
                Start Building Custom Pizza
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'var(--bg-color)',
  },
  hero: {
    height: '60vh',
    minHeight: '400px',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
  },
  heroContent: {
    maxWidth: '800px',
    color: '#ffffff',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '800',
    marginBottom: '20px',
    textShadow: '0 4px 10px rgba(0,0,0,0.5)',
  },
  heroSubtitle: {
    fontSize: '1.4rem',
    marginBottom: '30px',
    opacity: 0.9,
    fontWeight: '500',
  },
  heroBtn: {
    padding: '16px 40px',
    fontSize: '1.2rem',
    borderRadius: '50px',
  },
  menuSection: {
    padding: '80px 20px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '15px',
  },
  divider: {
    width: '80px',
    height: '4px',
    backgroundColor: 'var(--primary-color)',
    borderRadius: '2px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    marginBottom: '80px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--surface-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: 0,
    transition: 'all 0.3s ease',
  },
  imageContainer: {
    width: '100%',
    height: '220px',
    overflow: 'hidden',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
  pizzaImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  cardContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  pizzaName: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  pizzaDesc: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    marginBottom: '24px',
    flexGrow: 1,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--primary-color)',
  },
  orderBtn: {
    padding: '10px 24px',
    borderRadius: '50px',
  },
  customSection: {
    marginTop: '40px',
  },
  customCard: {
    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
    borderRadius: '24px',
    padding: '60px 40px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-lg)',
  },
  customContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  customBtn: {
    backgroundColor: '#ffffff',
    color: 'var(--primary-color)',
    border: 'none',
    padding: '16px 36px',
    fontSize: '1.1rem',
    fontWeight: '700',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
  }
};

export default Dashboard;
