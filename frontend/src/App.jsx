import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CustomPizzaBuilder from './pages/CustomPizzaBuilder';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import { StoreProvider } from './context/StoreContext';

function App() {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Routes>
            {/* User Routes inside UserLayout */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="build-pizza" element={<CustomPizzaBuilder />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* Admin Routes inside completely separate AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
            
            {/* Standalone admin login without the layout */}
            <Route path="/admin-login" element={<AdminLogin />} />
            
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
