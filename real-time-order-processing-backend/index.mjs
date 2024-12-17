import express from 'express';
import mongoose from 'mongoose';
import { consumer } from './kafka/kafka.config.mjs';
import Order from './models/order.model.mjs';
import orderRoutes from './routes/order.routes.mjs';
import cors from 'cors';

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://lakshmiswaminathan08:RYdRlAHpEsUeIzVe@cluster0.lefp9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Kafka Consumer - Process Orders
consumer.on('message', async (message) => {
    const order = JSON.parse(message.value);
    const newOrder = new Order({ ...order, status: 'Received' });
    try {
      await newOrder.save();
      console.log(`Order processed: ${order.orderId}`);
    } catch (error) {
      console.error('Error saving order to MongoDB:', error);
    }
  });
  
  // Routes
  app.use('/api', orderRoutes);
  
  // Start Server
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));