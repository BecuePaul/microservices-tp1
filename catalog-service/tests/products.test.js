const request = require('supertest');
const app = require('../server');
const productModel = require('../models/Product');

jest.mock('../models/Product', () => {
  const originalModule = jest.requireActual('../models/Product');
  return {
    ...originalModule,
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
    addProduct: jest.fn(),
    initSampleProducts: jest.fn()
  };
});

describe('Product API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /products', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Test Product 1', price: 10.99 },
        { id: 2, name: 'Test Product 2', price: 20.99 }
      ];
      
      productModel.getAllProducts.mockReturnValue(mockProducts);
      
      const res = await request(app).get('/products');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockProducts);
      expect(productModel.getAllProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /products/:id', () => {
    it('should return a product by ID', async () => {
      const mockProduct = { id: 1, name: 'Test Product', price: 10.99 };
      
      productModel.getProductById.mockReturnValue(mockProduct);
      
      const res = await request(app).get('/products/1');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockProduct);
      expect(productModel.getProductById).toHaveBeenCalledWith('1');
    });

    it('should return 404 if product not found', async () => {
      productModel.getProductById.mockReturnValue(null);
      
      const res = await request(app).get('/products/999');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
      expect(productModel.getProductById).toHaveBeenCalledWith('999');
    });
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const newProduct = { name: 'New Product', price: 15.99 };
      
      productModel.addProduct.mockImplementation((product) => {
        return {
          id: 3,
          name: product.name,
          price: product.price
        };
      });
      
      const res = await request(app)
        .post('/products')
        .send(newProduct);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({ id: 3, name: 'New Product', price: 15.99 });
      expect(productModel.addProduct).toHaveBeenCalledTimes(1);
      
      const productPassedToAddProduct = productModel.addProduct.mock.calls[0][0];
      expect(productPassedToAddProduct).toBeInstanceOf(productModel.Product);
      expect(productPassedToAddProduct.name).toBe(newProduct.name);
      expect(productPassedToAddProduct.price).toBe(newProduct.price);
    });

    it('should handle missing fields', async () => {
      productModel.addProduct.mockImplementation((product) => {
        return {
          id: 3,
          name: product.name,
          price: product.price
        };
      });
      
      const res1 = await request(app)
        .post('/products')
        .send({ price: 15.99 });

      expect(res1.statusCode).toEqual(201);
      
      const res2 = await request(app)
        .post('/products')
        .send({ name: 'Test Product' });
      
      expect(res2.statusCode).toEqual(201);
    });
  });

  describe('GET /', () => {
    it('should return health check message', async () => {
      const res = await request(app).get('/');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Catalog Service is running');
    });
  });
});
