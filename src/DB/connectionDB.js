import mongoose from 'mongoose';
import { config } from '../../config/config.service.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
