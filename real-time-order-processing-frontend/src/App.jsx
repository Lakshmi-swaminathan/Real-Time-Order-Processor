import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [orderId, setOrderId] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = { orderId, product, quantity };
    await axios.post('http://localhost:5001/api/create-order', order);
    alert('Order created!');
  };

  return (
    <div className="App">
      <h1>Order Processing System</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <div>
          <label>Product</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}

export default App;
