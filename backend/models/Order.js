import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      pizza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' },
      customDetails: {
        base: String,
        sauce: String,
        cheese: String,
        veggies: [String]
      },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  orderStatus: { type: String, enum: ['Order Received', 'In the kitchen', 'Sent to delivery', 'Delivered'], default: 'Order Received' },
  deliveryAddress: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
