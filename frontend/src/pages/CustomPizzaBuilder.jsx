import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_DATA = {
  bases: ['Thin Crust', 'Hand Tossed', 'Cheese Burst', 'Pan Pizza', 'Gluten Free'],
  sauces: ['Tomato Marinara', 'Pesto', 'Garlic Parmesan', 'Barbecue', 'Spicy Buffalo'],
  cheeses: ['Mozzarella', 'Cheddar', 'Parmesan', 'Vegan Cheese'],
  veggies: ['Onion', 'Capsicum', 'Mushroom', 'Olive', 'Jalapeno', 'Corn', 'Spinach', 'Pineapple']
};

const STEPS = ['Base', 'Sauce', 'Cheese', 'Veggies', 'Review'];

const CustomPizzaBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    base: '',
    sauce: '',
    cheese: '',
    veggies: []
  });

  const handleSelect = (category, item) => {
    if (category === 'veggies') {
      const isSelected = selections.veggies.includes(item);
      setSelections(prev => ({
        ...prev,
        veggies: isSelected 
          ? prev.veggies.filter(v => v !== item)
          : [...prev.veggies, item]
      }));
    } else {
      setSelections(prev => ({ ...prev, [category]: item }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderOptions = (category, options) => (
    <div style={styles.optionsGrid}>
      {options.map((item, idx) => {
        const isSelected = category === 'veggies' 
          ? selections.veggies.includes(item)
          : selections[category] === item;

        return (
          <motion.div
            key={item}
            style={{
              ...styles.optionCard,
              borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
              background: isSelected ? 'rgba(230, 57, 70, 0.05)' : 'var(--surface-color)',
              boxShadow: isSelected ? '0 4px 12px rgba(230, 57, 70, 0.15)' : 'var(--shadow-sm)',
            }}
            whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-md)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(category, item)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
          >
            <h4 style={{ color: isSelected ? 'var(--primary-color)' : 'var(--text-primary)' }}>{item}</h4>
            {isSelected && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                style={styles.selectedBadge}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div style={styles.container}>
      <motion.div 
        className="glass-panel" 
        style={styles.builderCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>Craft Your Masterpiece</h2>
          <p style={styles.subtitle}>Select the finest ingredients for your perfect slice.</p>
          
          <div style={styles.progressContainer}>
            <div style={styles.progressBarBackground}>
              <motion.div 
                style={styles.progressBarFill}
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div style={styles.stepLabels}>
              {STEPS.map((step, idx) => (
                <span key={step} style={{
                  ...styles.stepLabel,
                  color: idx <= currentStep ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontWeight: idx <= currentStep ? '700' : '500'
                }}>
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.contentArea}>
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
                  <h3 style={styles.stepTitle}>Review Your Custom Pizza</h3>
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
                  <h2 style={styles.totalPrice}>Estimated Total: ₹450</h2>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={styles.footer}>
          <button 
            className="btn-secondary" 
            onClick={prevStep} 
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
          >
            Back
          </button>
          
          {currentStep < STEPS.length - 1 ? (
            <button className="btn-primary" onClick={nextStep}>Continue to Next Step</button>
          ) : (
            <button className="btn-primary" style={{ background: 'var(--success)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }} onClick={() => window.location.href = '/cart'}>Add to Cart</button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 20px',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'var(--bg-color)',
  },
  builderCard: {
    width: '100%',
    maxWidth: '900px',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '650px',
    backgroundColor: 'var(--surface-color)',
    borderRadius: '24px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '10px'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  progressContainer: {
    marginTop: '40px',
    padding: '0 20px'
  },
  progressBarBackground: {
    height: '6px',
    backgroundColor: 'var(--border-color)',
    borderRadius: '10px',
    position: 'relative',
    marginBottom: '15px'
  },
  progressBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'var(--primary-color)',
    borderRadius: '10px',
  },
  stepLabels: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  stepLabel: {
    fontSize: '0.9rem',
    transition: 'color 0.3s ease'
  },
  contentArea: {
    flexGrow: 1,
    position: 'relative',
    padding: '20px 0'
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  stepTitle: {
    fontSize: '1.5rem',
    color: 'var(--text-primary)',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '10px'
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px'
  },
  optionCard: {
    padding: '25px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '16px',
  },
  selectedBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'var(--primary-color)',
    color: '#fff',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(230, 57, 70, 0.4)'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    paddingTop: '30px',
    borderTop: '1px solid var(--border-color)'
  },
  reviewSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center'
  },
  reviewCard: {
    padding: '40px',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#FAF9F6',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  reviewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px dashed var(--border-color)',
    paddingBottom: '10px'
  },
  reviewLabel: {
    fontWeight: '600',
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  reviewValue: {
    fontWeight: '700',
    color: 'var(--text-primary)',
    fontSize: '1.1rem',
    textAlign: 'right'
  },
  totalPrice: {
    color: 'var(--primary-color)',
    marginTop: '20px',
    fontSize: '2rem',
    fontWeight: '800'
  }
};

export default CustomPizzaBuilder;
