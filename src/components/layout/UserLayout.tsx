import { ReactNode, useState } from 'react';
import { Pizza, LayoutDashboard, ShoppingBag, LogOut, Menu, X, User, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

type Tab = 'dashboard' | 'build' | 'orders' | 'cart';

type Props = {
  children: ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function UserLayout({ children, activeTab, onTabChange }: Props) {
  const { profile, signOut } = useAuth();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as Tab, label: 'Menu', icon: LayoutDashboard },
    { id: 'build' as Tab, label: 'Build Pizza', icon: Pizza },
    { id: 'orders' as Tab, label: 'My Orders', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200`}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
            <Pizza className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">PizzaCraft</span>
          <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-4 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onTabChange(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}

          {/* Cart button with badge */}
          <button
            onClick={() => { onTabChange('cart'); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all text-sm font-medium ${
              activeTab === 'cart'
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 flex-shrink-0" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </div>
            Cart
            {totalItems > 0 && (
              <span className="ml-auto bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{profile?.full_name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
            </div>
          </div>
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="text-gray-500 hover:text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Pizza className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-gray-900">PizzaCraft</span>
          </div>
          <button onClick={() => onTabChange('cart')} className="relative text-gray-500 hover:text-orange-500">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
