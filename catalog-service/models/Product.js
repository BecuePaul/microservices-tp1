class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

const products = new Map();
let nextId = 1;

const initSampleProducts = () => {
  addProduct(new Product(null, "Laptop", 999.99));
  addProduct(new Product(null, "Smartphone", 499.99));
  addProduct(new Product(null, "Headphones", 99.99));
};

const getAllProducts = () => {
  return Array.from(products.values());
};

const getProductById = (id) => {
  return products.get(Number(id));
};

const addProduct = (product) => {
  if (!product.id) {
    product.id = nextId++;
  }
  products.set(product.id, product);
  return product;
};

module.exports = {
  Product,
  getAllProducts,
  getProductById,
  addProduct,
  initSampleProducts
};
