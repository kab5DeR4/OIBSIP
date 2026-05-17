import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const mockPizzas = [
  { id: 1, name: 'Classic Margherita', price: 199, description: 'Authentic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella, and basil.', image: '/images/pizza-1.jpg' },
  { id: 2, name: 'Farmhouse Veggie', price: 299, description: 'Delightful combination of onion, capsicum, tomato, and fresh mushrooms.', image: '/images/pizza-2.jpg' },
  { id: 3, name: 'Peppy Paneer', price: 349, description: 'Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika.', image: '/images/pizza-3.jpg' },
  { id: 4, name: 'Double Pepperoni', price: 399, description: 'Loaded with premium pepperoni slices and extra mozzarella cheese.', image: '/images/pizza-4.jpg' },
  { id: 5, name: 'BBQ Chicken', price: 449, description: 'Smoked BBQ chicken chunks, red onions, and a drizzle of tangy BBQ sauce.', image: '/images/pizza-5.jpg' },
  { id: 6, name: 'Spicy Italian', price: 429, description: 'Italian sausage, spicy salami, jalapeños, and crushed red pepper.', image: '/images/pizza-6.jpg' },
  { id: 7, name: 'Mushroom Truffle', price: 499, description: 'Wild mushrooms, truffle oil, roasted garlic, and parmesan cream base.', image: '/images/pizza-7.jpg' },
  { id: 8, name: 'Four Cheese', price: 379, description: 'A decadent blend of Mozzarella, Gorgonzola, Parmesan, and Ricotta.', image: '/images/pizza-8.jpg' }
];

const features = [
  { icon: '🔥', title: 'Wood Fired', desc: 'Authentic 400°C brick oven baking' },
  { icon: '🍅', title: 'Fresh Ingredients', desc: 'Locally sourced organic produce' },
  { icon: '🛵', title: 'Fast Delivery', desc: '30 minutes or it is free!' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <motion.div 
        style={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <motion.h1 
            style={styles.heroTitle}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Craving Perfection?
          </motion.h1>
          <motion.p 
            style={styles.heroSubtitle}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Fresh ingredients, wood-fired taste, delivered hot to your door.
          </motion.p>
          <motion.button 
            className="btn-primary" 
            style={styles.heroBtn}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
          >
            View Our Menu
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <motion.div 
          style={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feat, idx) => (
            <motion.div key={idx} variants={itemVariants} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feat.icon}</div>
              <h3 style={styles.featureTitle}>{feat.title}</h3>
              <p style={styles.featureDesc}>{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Menu Section */}
      <div id="menu" style={styles.menuSection}>
        <div style={styles.header}>
          <h2 style={styles.sectionTitle}>Our Signature Menu</h2>
          <div style={styles.divider}></div>
        </div>

        <motion.div 
          style={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {mockPizzas.map((pizza) => (
            <motion.div
              key={pizza.id}
              className="glass-panel"
              style={styles.card}
              variants={itemVariants}
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
                    transform: hoveredId === pizza.id ? 'scale(1.08)' : 'scale(1)'
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
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Pizza Builder Banner */}
        <motion.div 
          style={styles.customSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            style={styles.customCard}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div style={styles.customContent}>
              <h2 style={{ color: '#fff', fontSize: '2.2rem', marginBottom: '15px' }}>Be the Executive Chef!</h2>
              <p style={{ color: '#fff', fontSize: '1.1rem', opacity: 0.9, marginBottom: '30px' }}>
                Create your dream pizza exactly how you want it. Over 1,000 combinations possible.
              </p>
              <motion.button 
                style={styles.customBtn}
                whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/build-pizza')}
              >
                Start Custom Builder 🛠️
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'var(--bg-color)',
    paddingBottom: '40px'
  },
  hero: {
    height: '70vh',
    minHeight: '500px',
    position: 'relative',
    backgroundImage: 'url(/images/hero.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
    marginTop: '70px' // Offset for fixed navbar
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  heroContent: {
    maxWidth: '800px',
    color: '#ffffff',
    position: 'relative',
    zIndex: 1
  },
  heroTitle: {
    fontSize: '4.5rem',
    fontWeight: '800',
    marginBottom: '20px',
    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
    lineHeight: '1.1'
  },
  heroSubtitle: {
    fontSize: '1.4rem',
    marginBottom: '35px',
    opacity: 0.95,
    fontWeight: '500',
  },
  heroBtn: {
    padding: '16px 45px',
    fontSize: '1.25rem',
    borderRadius: '50px',
  },
  featuresSection: {
    backgroundColor: 'var(--surface-color)',
    padding: '60px 20px',
    borderBottom: '1px solid var(--border-color)'
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    textAlign: 'center'
  },
  featureCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  featureIcon: {
    fontSize: '3.5rem',
    marginBottom: '15px'
  },
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '10px'
  },
  featureDesc: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    lineHeight: '1.5'
  },
  menuSection: {
    padding: '80px 20px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '15px',
  },
  divider: {
    width: '80px',
    height: '5px',
    backgroundColor: 'var(--primary-color)',
    borderRadius: '3px',
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
    fontSize: '1.5rem',
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
    padding: '70px 40px',
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
    fontWeight: '800',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
  }
};

export default Dashboard;
