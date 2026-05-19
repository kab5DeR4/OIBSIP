import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import UserLayout from './components/layout/UserLayout';
import MenuPage from './pages/user/MenuPage';
import PizzaBuilder from './pages/user/PizzaBuilder';
import OrdersPage from './pages/user/OrdersPage';
import CartPage from './pages/user/CartPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminInventoryPage from './pages/admin/InventoryPage';
import AdminOrdersPage from './pages/admin/OrdersPage';
import { useState } from 'react';

// Detect ?panel=admin in URL to show the admin login portal
const isAdminPanel = new URLSearchParams(window.location.search).get('panel') === 'admin';

function AppContent() {
  const { session, profile, loading } = useAuth();
  const [authPage, setAuthPage] = useState<'login' | 'register' | 'forgot'>('login');
  const [userTab, setUserTab] = useState<'dashboard' | 'build' | 'orders' | 'cart'>('dashboard');
  const [adminTab, setAdminTab] = useState<'inventory' | 'orders'>('inventory');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full" />
        </div>
      </div>
    );
  }

  // ── Not logged in ─────────────────────────────────────────────────────────
  if (!session) {
    if (authPage === 'register') {
      return <RegisterPage onSwitch={setAuthPage} />;
    }
    if (authPage === 'forgot') {
      return <ForgotPasswordPage onSwitch={setAuthPage} />;
    }
    // Pass isAdminPanel so login page can pre-fill admin creds and show label
    return <LoginPage onSwitch={setAuthPage} isAdminPanel={isAdminPanel} />;
  }

  // ── Admin user ────────────────────────────────────────────────────────────
  if (profile?.role === 'admin') {
    return (
      <AdminLayout activeTab={adminTab} onTabChange={setAdminTab}>
        {adminTab === 'inventory' && <AdminInventoryPage />}
        {adminTab === 'orders' && <AdminOrdersPage />}
      </AdminLayout>
    );
  }

  // ── Regular user ──────────────────────────────────────────────────────────
  return (
    <UserLayout activeTab={userTab} onTabChange={setUserTab}>
      {userTab === 'dashboard' && (
        <MenuPage onBuildPizza={() => setUserTab('build')} />
      )}
      {userTab === 'build' && (
        <PizzaBuilder onGoToCart={() => setUserTab('cart')} />
      )}
      {userTab === 'orders' && <OrdersPage />}
      {userTab === 'cart' && (
        <CartPage
          onViewOrders={() => setUserTab('orders')}
          onContinueShopping={() => setUserTab('dashboard')}
        />
      )}
    </UserLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
