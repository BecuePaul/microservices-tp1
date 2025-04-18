const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(bodyParser.json());
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Order Service is running' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
  });
}

module.exports = app;
