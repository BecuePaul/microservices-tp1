const axios = require('axios');
const Product = require('./Product');

const CATALOG_SERVICE_URL = process.env.CATALOG_SERVICE_URL || 'http://localhost:8081';

const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${CATALOG_SERVICE_URL}/products/${productId}`);
    const productData = response.data;
    return new Product(productData.id, productData.name, productData.price);
  } catch (error) {
    console.error(`Error fetching product ${productId} from catalog service:`, error.message);
    return null;
  }
};

module.exports = {
  getProductById
};
