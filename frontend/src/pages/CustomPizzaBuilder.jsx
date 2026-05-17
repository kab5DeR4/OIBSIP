import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_DATA = {
  bases: ['Thin Crust', 'Hand Tossed', 'Cheese Burst', 'Pan Pizza', 'Gluten Free'],
  sauces: ['Tomato Marinara', 'Pesto', 'Garlic Parmesan', 'Barbecue', 'Alfredo'],
  cheeses: ['Mozzarella', 'Cheddar', 'Parmesan'],
  veggies: ['Onion', 'Capsicum', 'Mushroom', 'Olive', 'Jalapeno', 'Corn']
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
            className={`glass-panel ${isSelected ? 'selected' : ''}`}
            style={{
              ...styles.optionCard,
              borderColor: isSelected ? 'var(--primary-color)' : 'var(--glass-border)',
              background: isSelected ? 'rgba(255, 94, 58, 0.1)' : 'var(--surface-color)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(category, item)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <h4>{item}</h4>
            {isSelected && <div style={styles.selectedBadge}>✓</div>}
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
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div style={styles.header}>
          <h2>Build Your Masterpiece</h2>
          <div style={styles.progressContainer}>
            {STEPS.map((step, idx) => (
              <div key={step} style={styles.stepIndicator}>
                <div style={{
                  ...styles.stepDot,
                  background: idx <= currentStep ? 'var(--primary-color)' : 'var(--glass-border)',
                  boxShadow: idx === currentStep ? '0 0 10px var(--primary-color)' : 'none'
                }} />
                <span style={{
                  ...styles.stepLabel,
                  color: idx <= currentStep ? '#fff' : 'var(--text-secondary)'
                }}>{step}</span>
              </div>
            ))}
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
                  <h3>Choose your Base</h3>
                  {renderOptions('base', MOCK_DATA.bases)}
                </>
              )}
              {currentStep === 1 && (
                <>
                  <h3>Choose your Sauce</h3>
                  {renderOptions('sauce', MOCK_DATA.sauces)}
                </>
              )}
              {currentStep === 2 && (
                <>
                  <h3>Choose your Cheese</h3>
                  {renderOptions('cheese', MOCK_DATA.cheeses)}
                </>
              )}
              {currentStep === 3 && (
                <>
                  <h3>Add Veggies (Multiple)</h3>
                  {renderOptions('veggies', MOCK_DATA.veggies)}
                </>
              )}
              {currentStep === 4 && (
                <div style={styles.reviewSection}>
                  <h3>Review Your Custom Pizza</h3>
                  <div className="glass-panel" style={styles.reviewCard}>
                    <p><strong>Base:</strong> {selections.base || 'None selected'}</p>
                    <p><strong>Sauce:</strong> {selections.sauce || 'None selected'}</p>
                    <p><strong>Cheese:</strong> {selections.cheese || 'None selected'}</p>
                    <p><strong>Veggies:</strong> {selections.veggies.length > 0 ? selections.veggies.join(', ') : 'None selected'}</p>
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
            <button className="btn-primary" onClick={nextStep}>Next Step</button>
          ) : (
            <button className="btn-primary" style={{ background: 'var(--success)' }} onClick={() => window.location.href = '/cart'}>Add to Cart</button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  builderCard: {
    width: '100%',
    maxWidth: '800px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '600px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    position: 'relative'
  },
  stepIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    zIndex: 1
  },
  stepDot: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    transition: 'all 0.3s ease'
  },
  stepLabel: {
    fontSize: '0.85rem',
    fontWeight: '500',
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
    gap: '20px'
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px'
  },
  optionCard: {
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    borderWidth: '2px',
    borderStyle: 'solid'
  },
  selectedBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'var(--primary-color)',
    color: '#fff',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '1px solid var(--glass-border)'
  },
  reviewSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center'
  },
  reviewCard: {
    padding: '30px',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  totalPrice: {
    color: 'var(--primary-color)',
    marginTop: '20px'
  }
};

export default CustomPizzaBuilder;
