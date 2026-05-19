import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CreditCard, CheckCircle, XCircle, Loader } from 'lucide-react';

type Props = {
  orderId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function RazorpayCheckout({ orderId, amount, onSuccess, onCancel }: Props) {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [failed, setFailed] = useState(false);

  const inrAmount = Math.round(amount * 83);

  async function handleTestSuccess() {
    setProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/razorpay-checkout/verify-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            order_id: orderId,
            is_test_success: true,
            razorpay_payment_id: `pay_test_${Date.now()}`,
            razorpay_order_id: `order_test_${Date.now()}`,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setPaid(true);
        setTimeout(onSuccess, 2500);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    }
    setProcessing(false);
  }

  async function handleRazorpay() {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/razorpay-checkout/create-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ amount, currency: 'INR', receipt: orderId }),
        }
      );
      const rzpOrder = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: inrAmount * 100,
        currency: 'INR',
        name: 'PizzaCraft',
        description: 'Custom Pizza Order',
        order_id: rzpOrder.id,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          setProcessing(true);
          const verifyRes = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/razorpay-checkout/verify-payment`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session?.access_token}` },
              body: JSON.stringify({ ...response, order_id: orderId }),
            }
          );
          const data = await verifyRes.json();
          if (data.success) { setPaid(true); setTimeout(onSuccess, 2500); }
          else setFailed(true);
          setProcessing(false);
        },
        prefill: {},
        theme: { color: '#f97316' },
      };

      // @ts-expect-error Razorpay global
      if (window.Razorpay) {
        // @ts-expect-error Razorpay global
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        handleTestSuccess();
      }
    } catch {
      setFailed(true);
    }
    setLoading(false);
  }

  if (paid) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-500">Your pizza is being prepared. We'll notify you of updates.</p>
        </div>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-500 mb-6">Something went wrong. Please try again.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={onCancel} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={() => setFailed(false)} className="px-5 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h1>
      <p className="text-gray-500 mb-8">Secure payment powered by Razorpay</p>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Order Total</span>
          <span className="text-2xl font-bold text-orange-600">₹{inrAmount}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Order ID: {orderId.slice(0, 8)}...</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <p className="text-amber-800 text-sm font-semibold mb-1">Test Mode Active</p>
        <p className="text-amber-700 text-sm">Use the test button below to simulate a successful payment and confirm your order instantly.</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleTestSuccess}
          disabled={processing}
          className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors"
        >
          {processing ? <Loader className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
          {processing ? 'Processing...' : 'Simulate Successful Payment (Test)'}
        </button>

        <button
          onClick={handleRazorpay}
          disabled={loading || processing}
          className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors"
        >
          {loading ? <Loader className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
          {loading ? 'Loading...' : 'Pay with Razorpay'}
        </button>

        <button
          onClick={onCancel}
          className="w-full py-3 border border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}
