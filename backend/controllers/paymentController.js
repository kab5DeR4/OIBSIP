import Razorpay from 'razorpay';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// Initialize Razorpay instance
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in INR rupees

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const razorpay = getRazorpayInstance();
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise (smallest currency unit)
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
    }

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment details are missing' });
    }

    // checking the signature to make sure the payment is actually real
    // and not faked by the frontend
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // payment is valid

      // Send confirmation email
      try {
        await sendEmail({
          email: req.body.email || 'customer@example.com', // Fetch from DB or request in real app
          subject: 'Pizza Artisan - Order Confirmation',
          message: `Your payment of ₹${req.body.amount || '...'} was successful! Your Order ID is ${razorpay_order_id}. Your delicious pizza is being prepared.`
        });
      } catch (emailError) {
        console.error('Email sending failed, but payment succeeded', emailError);
      }

      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Error in verifyPayment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
