import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: String,
  product: String,
  quantity: Number,
  status: String,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
