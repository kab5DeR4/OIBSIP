import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Pizza, Eye, EyeOff, Mail, Lock } from 'lucide-react';

type Props = {
  onSwitch: (page: 'register' | 'forgot') => void;
  isAdminPanel?: boolean;
};

export default function LoginPage({ onSwitch, isAdminPanel }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(isAdminPanel ? 'admin@pizzacraft.com' : '');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn(email, password);
    if (result.error) setError(result.error);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl shadow-lg mb-4">
            <Pizza className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">PizzaCraft</h1>
          <p className="text-gray-500 mt-1">
            {isAdminPanel ? 'Admin Panel Login' : 'Sign in to your account'}
          </p>
          {isAdminPanel && (
            <div className="mt-2 inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
              Admin Access
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!isAdminPanel && (
            <div className="mb-5 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs">
              <p className="font-semibold mb-1">Demo Credentials</p>
              <p>User: <code>user@pizzacraft.com</code> / <code>user123</code></p>
              <p>Admin: <code>admin@pizzacraft.com</code> / <code>admin123</code></p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isAdminPanel && (
              <div className="flex justify-end">
                <button type="button" onClick={() => onSwitch('forgot')} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {!isAdminPanel && (
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button onClick={() => onSwitch('register')} className="text-orange-600 hover:text-orange-700 font-semibold">
                Create one
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
