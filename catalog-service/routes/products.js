const express = require('express');
const router = express.Router();
const { Product, getAllProducts, getProductById, addProduct } = require('../models/Product');

router.get('/', (req, res) => {
  res.json(getAllProducts());
});

router.get('/:id', (req, res) => {
  const product = getProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const product = new Product(null, name, price);
  const savedProduct = addProduct(product);
  res.status(201).json(savedProduct);
});

module.exports = router;
