import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inventory from './models/Inventory.js';
import Pizza from './models/Pizza.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const inventoryItems = [
  // Bases
  { category: 'base', name: 'Thin Crust', stock: 100, threshold: 20, price: 50 },
  { category: 'base', name: 'Hand Tossed', stock: 100, threshold: 20, price: 60 },
  { category: 'base', name: 'Cheese Burst', stock: 50, threshold: 10, price: 100 },
  { category: 'base', name: 'Pan Pizza', stock: 100, threshold: 20, price: 70 },
  { category: 'base', name: 'Gluten Free', stock: 30, threshold: 5, price: 120 },
  // Sauces
  { category: 'sauce', name: 'Tomato Marinara', stock: 100, threshold: 20, price: 20 },
  { category: 'sauce', name: 'Pesto', stock: 50, threshold: 10, price: 30 },
  { category: 'sauce', name: 'Garlic Parmesan', stock: 80, threshold: 15, price: 25 },
  { category: 'sauce', name: 'Barbecue', stock: 80, threshold: 15, price: 20 },
  { category: 'sauce', name: 'Alfredo', stock: 60, threshold: 10, price: 35 },
  // Cheese
  { category: 'cheese', name: 'Mozzarella', stock: 200, threshold: 50, price: 40 },
  { category: 'cheese', name: 'Cheddar', stock: 100, threshold: 20, price: 40 },
  { category: 'cheese', name: 'Parmesan', stock: 100, threshold: 20, price: 50 },
  // Veggies
  { category: 'veggies', name: 'Onion', stock: 200, threshold: 30, price: 10 },
  { category: 'veggies', name: 'Capsicum', stock: 150, threshold: 30, price: 15 },
  { category: 'veggies', name: 'Mushroom', stock: 100, threshold: 20, price: 20 },
  { category: 'veggies', name: 'Olive', stock: 100, threshold: 20, price: 25 },
  { category: 'veggies', name: 'Jalapeno', stock: 100, threshold: 20, price: 20 },
  { category: 'veggies', name: 'Corn', stock: 150, threshold: 30, price: 15 },
  // Meat (for inventory purposes if needed later)
  { category: 'meat', name: 'Pepperoni', stock: 100, threshold: 20, price: 40 },
  { category: 'meat', name: 'Chicken Tikka', stock: 100, threshold: 20, price: 40 }
];

const defaultPizzas = [
  {
    name: 'Margherita',
    description: 'Classic delight with 100% real mozzarella cheese',
    price: 150,
    base: 'Hand Tossed',
    sauce: 'Tomato Marinara',
    cheese: 'Mozzarella',
    veggies: [],
    isCustom: false
  },
  {
    name: 'Farmhouse',
    description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom',
    price: 250,
    base: 'Pan Pizza',
    sauce: 'Tomato Marinara',
    cheese: 'Mozzarella',
    veggies: ['Onion', 'Capsicum', 'Mushroom'],
    isCustom: false
  },
  {
    name: 'Peppy Paneer',
    description: 'Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika',
    price: 280,
    base: 'Cheese Burst',
    sauce: 'Tomato Marinara',
    cheese: 'Mozzarella',
    veggies: ['Capsicum', 'Jalapeno'],
    isCustom: false
  }
];

const seedData = async () => {
  try {
    await Inventory.deleteMany();
    await Pizza.deleteMany();

    await Inventory.insertMany(inventoryItems);
    await Pizza.insertMany(defaultPizzas);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error with seeding data:', error);
    process.exit(1);
  }
};

seedData();
