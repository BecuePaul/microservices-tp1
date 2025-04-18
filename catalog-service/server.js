const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const { initSampleProducts } = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

initSampleProducts();

app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Catalog Service is running' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Catalog Service running on port ${PORT}`);
  });
}

module.exports = app;
