import { useLocation } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  const location = useLocation();
  
  // Don't show footer on auth pages
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') return null;

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          
          {/* Brand Column */}
          <div style={styles.column}>
            <div style={styles.logoContainer}>
              <span style={styles.logoIcon}>🍕</span>
              <span style={styles.logoText}>Pizza Artisan</span>
            </div>
            <p style={styles.desc}>
              Crafting authentic wood-fired pizzas with the freshest ingredients since 2015. Your perfect slice is just a click away.
            </p>
            <div style={styles.socials}>
              <a href="#" style={styles.socialIcon}><FiFacebook size={20} /></a>
              <a href="#" style={styles.socialIcon}><FiTwitter size={20} /></a>
              <a href="#" style={styles.socialIcon}><FiInstagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.column}>
            <h3 style={styles.title}>Quick Links</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><a href="/dashboard" style={styles.link}>Our Menu</a></li>
              <li style={styles.listItem}><a href="/build-pizza" style={styles.link}>Custom Builder</a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}>Track Order</a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}>Nutritional Info</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div style={styles.column}>
            <h3 style={styles.title}>Contact Us</h3>
            <ul style={styles.list}>
              <li style={styles.contactItem}>
                <FiMapPin style={styles.contactIcon} />
                <span>123 Pizza Street, Foodie Lane, NY 10012</span>
              </li>
              <li style={styles.contactItem}>
                <FiPhone style={styles.contactIcon} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li style={styles.contactItem}>
                <FiMail style={styles.contactIcon} />
                <span>hello@pizzaartisan.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div style={styles.column}>
            <h3 style={styles.title}>Newsletter</h3>
            <p style={styles.desc}>Subscribe for exclusive offers and secret menu items!</p>
            <div style={styles.newsletter}>
              <input type="email" placeholder="Your email" style={styles.input} />
              <button style={styles.subscribeBtn}>Subscribe</button>
            </div>
          </div>

        </div>

        <div style={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Pizza Artisan. All rights reserved.</p>
          <div style={styles.bottomLinks}>
            <a href="#" style={styles.link}>Privacy Policy</a>
            <span style={{color: 'var(--border-color)'}}>|</span>
            <a href="#" style={styles.link}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#0f172a', // Dark slate for professional footer contrast
    color: '#f8fafc',
    paddingTop: '60px',
    marginTop: 'auto'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '60px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoIcon: {
    fontSize: '2rem'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#fff'
  },
  desc: {
    color: '#94a3b8',
    lineHeight: '1.6',
    fontSize: '0.95rem'
  },
  socials: {
    display: 'flex',
    gap: '15px'
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    transition: 'all 0.3s ease'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '5px'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  listItem: {
    // Basic list item
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontSize: '0.95rem'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    color: '#94a3b8',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  contactIcon: {
    color: 'var(--primary-color)',
    fontSize: '1.2rem',
    flexShrink: 0,
    marginTop: '2px'
  },
  newsletter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    outline: 'none',
    fontSize: '0.95rem'
  },
  subscribeBtn: {
    backgroundColor: 'var(--primary-color)',
    color: '#fff',
    border: 'none',
    padding: '12px 15px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  },
  bottomBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    padding: '25px 0',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    color: '#64748b',
    fontSize: '0.9rem',
    textAlign: 'center',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'left'
    }
  },
  bottomLinks: {
    display: 'flex',
    gap: '15px'
  }
};

export default Footer;
