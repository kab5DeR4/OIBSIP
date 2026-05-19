import { useState } from 'react';
import { Pizza, Mail, ArrowLeft } from 'lucide-react';

type Props = {
  onSwitch: (page: 'login') => void;
};

export default function ForgotPasswordPage({ onSwitch }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Local mode: just show success after a short delay
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
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
          <p className="text-gray-500 mt-1">Reset your password</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Check your inbox</h2>
              <p className="text-gray-500 text-sm mb-6">We've sent a password reset link to <strong>{email}</strong></p>
              <button onClick={() => onSwitch('login')} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors">
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <p className="text-gray-600 text-sm mb-5">Enter your email address and we'll send you a link to reset your password.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="you@example.com" />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <button onClick={() => onSwitch('login')} className="mt-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mx-auto">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
