import { ReactNode, useState } from 'react';
import { Pizza, Package, BarChart3, ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type Tab = 'inventory' | 'orders';

type Props = {
  children: ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function AdminLayout({ children, activeTab, onTabChange }: Props) {
  const { signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'inventory' as Tab, label: 'Inventory', icon: Package },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
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

        <div className="px-3 py-2 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase px-3 py-2">Admin Dashboard</p>
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
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="text-gray-500 hover:text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <Pizza className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-gray-900">Admin</span>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
