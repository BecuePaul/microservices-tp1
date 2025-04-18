const express = require('express');
const router = express.Router();
const { getOrderById, createOrder } = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { getProductById } = require('../models/CatalogService');

router.get('/:id', (req, res) => {
  const order = getOrderById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }
    
    const orderItems = [];
    
    for (const item of items) {
      const { productId, quantity } = item;
      
      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ 
          message: 'Each item must have a valid productId and a positive quantity' 
        });
      }
      
      const product = await getProductById(productId);
      
      if (!product) {
        return res.status(404).json({ 
          message: `Product with ID ${productId} not found in catalog` 
        });
      }
      
      const orderItem = OrderItem.fromProduct(product, quantity);
      orderItems.push(orderItem);
    }
    
    const order = createOrder(orderItems);
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

module.exports = router;
