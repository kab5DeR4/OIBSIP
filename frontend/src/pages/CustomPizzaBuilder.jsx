import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MOCK_DATA = {
  bases: [
    { name: 'Thin Crust', image: '/images/base-thin.jpg' },
    { name: 'Hand Tossed', image: '/images/base-hand.jpg' },
    { name: 'Cheese Burst', image: '/images/base-cheese.jpg' },
    { name: 'Pan Pizza', image: '/images/base-pan.jpg' },
    { name: 'Gluten Free', image: '/images/base-gluten.jpg' }
  ],
  sauces: [
    { name: 'Tomato Marinara', image: '/images/sauce-tomato.jpg' },
    { name: 'Pesto', image: '/images/sauce-pesto.jpg' },
    { name: 'Garlic Parmesan', image: '/images/sauce-garlic.jpg' },
    { name: 'Barbecue', image: '/images/sauce-bbq.jpg' },
    { name: 'Spicy Buffalo', image: '/images/sauce-spicy.jpg' }
  ],
  cheeses: [
    { name: 'Mozzarella', image: '/images/cheese-mozzarella.jpg' },
    { name: 'Cheddar', image: '/images/cheese-cheddar.jpg' },
    { name: 'Parmesan', image: '/images/cheese-parmesan.jpg' },
    { name: 'Vegan Cheese', image: '/images/cheese-vegan.jpg' }
  ],
  veggies: [
    { name: 'Onion', image: '/images/veg-onion.jpg' },
    { name: 'Capsicum', image: '/images/veg-capsicum.jpg' },
    { name: 'Mushroom', image: '/images/veg-mushroom.jpg' },
    { name: 'Olive', image: '/images/veg-olive.jpg' },
    { name: 'Jalapeno', image: '/images/veg-jalapeno.jpg' },
    { name: 'Corn', image: '/images/veg-corn.jpg' },
    { name: 'Spinach', image: '/images/veg-spinach.jpg' },
    { name: 'Pineapple', image: '/images/veg-pineapple.jpg' }
  ]
};

const STEPS = ['Base', 'Sauce', 'Cheese', 'Veggies', 'Review'];

const CustomPizzaBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    base: '',
    sauce: '',
    cheese: '',
    veggies: []
  });

  const handleSelect = (category, item) => {
    if (category === 'veggies') {
      const isSelected = selections.veggies.includes(item.name);
      setSelections(prev => ({
        ...prev,
        veggies: isSelected 
          ? prev.veggies.filter(v => v !== item.name)
          : [...prev.veggies, item.name]
      }));
    } else {
      setSelections(prev => ({ ...prev, [category]: item.name }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderOptions = (category, options) => (
    <div style={styles.optionsGrid}>
      {options.map((item, idx) => {
        const isSelected = category === 'veggies' 
          ? selections.veggies.includes(item.name)
          : selections[category] === item.name;

        return (
          <motion.div
            key={item.name}
            style={{
              ...styles.optionCard,
              borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
            }}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(category, item)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
          >
            <div style={styles.imgWrapper}>
              <img src={item.image} alt={item.name} style={styles.optionImg} />
              {isSelected && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  style={styles.selectedOverlay}
                >
                  <div style={styles.selectedBadge}>✓</div>
                </motion.div>
              )}
            </div>
            <div style={styles.optionInfo}>
              <h4 style={{ color: isSelected ? 'var(--primary-color)' : 'var(--text-primary)', fontWeight: '700', fontSize: '1.1rem' }}>{item.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>Click to select</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <motion.div 
          style={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={styles.title}>Craft Your Masterpiece</h1>
          <p style={styles.subtitle}>Build your dream pizza exactly the way you want it.</p>
        </motion.div>

        {/* Floating Summary Bar */}
        <motion.div 
          style={styles.floatingSummary}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          <div style={styles.summaryItems}>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Base</span>
              <span style={styles.summaryValue}>{selections.base || '---'}</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Sauce</span>
              <span style={styles.summaryValue}>{selections.sauce || '---'}</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Cheese</span>
              <span style={styles.summaryValue}>{selections.cheese || '---'}</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Veggies</span>
              <span style={styles.summaryValue}>{selections.veggies.length > 0 ? selections.veggies.join(', ') : '---'}</span>
            </div>
          </div>
          <div style={styles.summaryTotal}>
            <span>Total: </span>
            <strong>₹450</strong>
          </div>
        </motion.div>

        <div style={styles.layout}>
          {/* Sidebar Progress */}
          <div style={styles.sidebar}>
            {STEPS.map((step, idx) => (
              <div key={step} style={styles.stepIndicatorRow}>
                <div style={{
                  ...styles.stepDot,
                  backgroundColor: idx <= currentStep ? 'var(--primary-color)' : 'var(--border-color)',
                  color: idx <= currentStep ? '#fff' : 'var(--text-secondary)'
                }}>
                  {idx + 1}
                </div>
                <div style={{
                  ...styles.stepText,
                  color: idx <= currentStep ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontWeight: idx === currentStep ? '800' : '600'
                }}>
                  {step}
                </div>
                {idx < STEPS.length - 1 && (
                  <div style={{
                    ...styles.stepLine,
                    backgroundColor: idx < currentStep ? 'var(--primary-color)' : 'var(--border-color)'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Main Builder Area */}
          <div style={styles.mainArea}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={styles.stepContent}
              >
                {currentStep === 0 && (
                  <>
                    <h3 style={styles.stepTitle}>Choose your Base</h3>
                    {renderOptions('base', MOCK_DATA.bases)}
                  </>
                )}
                {currentStep === 1 && (
                  <>
                    <h3 style={styles.stepTitle}>Choose your Sauce</h3>
                    {renderOptions('sauce', MOCK_DATA.sauces)}
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <h3 style={styles.stepTitle}>Choose your Cheese</h3>
                    {renderOptions('cheese', MOCK_DATA.cheeses)}
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <h3 style={styles.stepTitle}>Add Veggies (Multiple)</h3>
                    {renderOptions('veggies', MOCK_DATA.veggies)}
                  </>
                )}
                {currentStep === 4 && (
                  <div style={styles.reviewSection}>
                    <div style={styles.reviewHeader}>
                      <span style={{ fontSize: '4rem' }}>🍕</span>
                      <h3 style={styles.stepTitle}>Your Masterpiece is Ready</h3>
                    </div>
                    
                    <div style={styles.reviewCard}>
                      <div style={styles.reviewRow}>
                        <span style={styles.reviewLabel}>Base:</span> 
                        <span style={styles.reviewValue}>{selections.base || 'None selected'}</span>
                      </div>
                      <div style={styles.reviewRow}>
                        <span style={styles.reviewLabel}>Sauce:</span> 
                        <span style={styles.reviewValue}>{selections.sauce || 'None selected'}</span>
                      </div>
                      <div style={styles.reviewRow}>
                        <span style={styles.reviewLabel}>Cheese:</span> 
                        <span style={styles.reviewValue}>{selections.cheese || 'None selected'}</span>
                      </div>
                      <div style={styles.reviewRow}>
                        <span style={styles.reviewLabel}>Toppings:</span> 
                        <span style={styles.reviewValue}>{selections.veggies.length > 0 ? selections.veggies.join(', ') : 'None selected'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div style={styles.footerControls}>
              <button 
                className="btn-secondary" 
                onClick={prevStep} 
                disabled={currentStep === 0}
                style={{ opacity: currentStep === 0 ? 0 : 1, padding: '12px 30px' }}
              >
                Back
              </button>
              
              {currentStep < STEPS.length - 1 ? (
                <button className="btn-primary" onClick={nextStep} style={{ padding: '16px 40px', fontSize: '1.1rem' }}>Next Step →</button>
              ) : (
                <motion.button 
                  className="btn-primary" 
                  style={{ background: 'var(--success)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)', padding: '16px 40px', fontSize: '1.1rem' }} 
                  onClick={() => navigate('/cart')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart ₹450
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    background: '#f8fafc',
    minHeight: '100vh',
    padding: '120px 20px 60px 20px', // Top padding for fixed navbar
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: '-1px'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.2rem',
    marginTop: '10px'
  },
  floatingSummary: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
    marginBottom: '40px',
    border: '1px solid var(--border-color)',
    flexWrap: 'wrap',
    gap: '20px'
  },
  summaryItems: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap'
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  summaryLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '700'
  },
  summaryValue: {
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    fontWeight: '600'
  },
  summaryTotal: {
    fontSize: '1.5rem',
    color: 'var(--text-primary)',
    background: '#f1f5f9',
    padding: '10px 20px',
    borderRadius: '12px'
  },
  layout: {
    display: 'flex',
    gap: '50px',
    flexDirection: 'column',
    '@media (min-width: 900px)': {
      flexDirection: 'row'
    }
  },
  sidebar: {
    display: 'none',
    '@media (min-width: 900px)': {
      display: 'flex',
      flexDirection: 'column',
      width: '200px',
      flexShrink: 0
    }
  },
  stepIndicatorRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    position: 'relative',
    height: '80px'
  },
  stepDot: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    zIndex: 2,
    position: 'relative'
  },
  stepText: {
    fontSize: '1.1rem',
    marginTop: '4px'
  },
  stepLine: {
    position: 'absolute',
    left: '15px',
    top: '32px',
    width: '2px',
    height: 'calc(100% - 32px)',
    zIndex: 1
  },
  mainArea: {
    flexGrow: 1,
    background: '#fff',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border-color)',
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column'
  },
  stepTitle: {
    fontSize: '1.8rem',
    color: 'var(--text-primary)',
    fontWeight: '800',
    marginBottom: '30px'
  },
  stepContent: {
    flexGrow: 1
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '25px'
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '2px solid',
    transition: 'border-color 0.2s',
  },
  imgWrapper: {
    width: '100%',
    height: '150px',
    position: 'relative',
    overflow: 'hidden'
  },
  optionImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(230, 57, 70, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedBadge: {
    width: '40px',
    height: '40px',
    backgroundColor: 'var(--primary-color)',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(230, 57, 70, 0.4)'
  },
  optionInfo: {
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  footerControls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    paddingTop: '30px',
    borderTop: '1px solid var(--border-color)'
  },
  reviewSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0'
  },
  reviewHeader: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  reviewCard: {
    width: '100%',
    maxWidth: '600px',
    background: '#FAF9F6',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  reviewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '15px',
    borderBottom: '1px dashed var(--border-color)'
  },
  reviewLabel: {
    fontWeight: '700',
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  reviewValue: {
    fontWeight: '800',
    color: 'var(--text-primary)',
    fontSize: '1.2rem',
    textAlign: 'right'
  }
};

// Simple media query injection for sidebar display
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (min-width: 900px) {
      .layout-container > div:first-child { display: flex !important; }
      .layout-container { flex-direction: row !important; }
    }
  `;
  document.head.appendChild(style);
}

export default CustomPizzaBuilder;
