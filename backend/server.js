import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

import authRoutes from './routes/authRoutes.js';

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Pizza Delivery API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
