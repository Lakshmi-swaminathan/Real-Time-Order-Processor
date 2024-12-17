import express from 'express';
import Order from '../models/order.model.mjs';
import { producer } from '../kafka/kafka.config.mjs';

const router = express.Router();

// Kafka Producer - Create Order
router.post('/create-order', (req, res) => {
  const { orderId, product, quantity } = req.body;
  const order = { orderId, product, quantity };

  producer.on('ready', () => {
    producer.send(
      [{ topic: 'orders', messages: JSON.stringify(order), partition: 0 }],
      (err) => {
        if (err) {
          console.error('Error sending order to Kafka:', err);
          return res.status(500).json({ message: 'Error sending order to Kafka' });
        }
        res.status(200).json({ message: 'Order created successfully!' });
      }
    );
  });
});

export default router;
