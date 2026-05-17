import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  base: { type: String, required: true },
  sauce: { type: String, required: true },
  cheese: { type: String, required: true },
  veggies: [{ type: String }],
  isCustom: { type: Boolean, default: false }
}, { timestamps: true });

const Pizza = mongoose.model('Pizza', pizzaSchema);
export default Pizza;
