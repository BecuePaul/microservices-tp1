const request = require('supertest');
const app = require('../server');
const orderModel = require('../models/Order');
const catalogService = require('../models/CatalogService');
const OrderItem = require('../models/OrderItem');

jest.mock('../models/CatalogService');
jest.mock('../models/Order', () => {
  const originalModule = jest.requireActual('../models/Order');
  return {
    ...originalModule,
    getOrderById: jest.fn(),
    createOrder: jest.fn()
  };
});

describe('Order API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /orders', () => {
    it('should create a new order', async () => {
      const orderItems = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
      ];
      
      const product1 = { id: 1, name: 'Product 1', price: 10.99 };
      const product2 = { id: 2, name: 'Product 2', price: 20.99 };
      
      const createdOrder = {
        id: 1,
        items: [
          { productId: 1, productName: 'Product 1', productPrice: 10.99, quantity: 2 },
          { productId: 2, productName: 'Product 2', productPrice: 20.99, quantity: 1 }
        ],
        orderDate: new Date().toISOString(),
        totalAmount: 42.97
      };
      
      catalogService.getProductById
        .mockResolvedValueOnce(product1)  
        .mockResolvedValueOnce(product2); 
      
      orderModel.createOrder.mockReturnValue(createdOrder);
      
      const res = await request(app)
        .post('/orders')
        .send({ items: orderItems });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(createdOrder);
      expect(catalogService.getProductById).toHaveBeenCalledTimes(2);
      expect(catalogService.getProductById).toHaveBeenNthCalledWith(1, 1);
      expect(catalogService.getProductById).toHaveBeenNthCalledWith(2, 2);
      expect(orderModel.createOrder).toHaveBeenCalledTimes(1);
    });

    it('should return 400 if no items are provided', async () => {
      const res = await request(app)
        .post('/orders')
        .send({});
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('must contain at least one item');
    });

    it('should return 400 if items is not an array', async () => {
      const res = await request(app)
        .post('/orders')
        .send({ items: 'not an array' });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('must contain at least one item');
    });

    it('should return 400 if items array is empty', async () => {
      const res = await request(app)
        .post('/orders')
        .send({ items: [] });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('must contain at least one item');
    });

    it('should return 400 if item is missing productId or quantity', async () => {
      const res = await request(app)
        .post('/orders')
        .send({ items: [{ quantity: 2 }] }); 
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('must have a valid productId');
    });

    it('should return 404 if product is not found', async () => {
      catalogService.getProductById.mockResolvedValue(null);
      
      const res = await request(app)
        .post('/orders')
        .send({ items: [{ productId: 999, quantity: 1 }] });
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('not found');
    });
  });

  describe('GET /orders/:id', () => {
    it('should return an order by ID', async () => {
      const order = {
        id: 1,
        items: [
          { productId: 1, productName: 'Product 1', productPrice: 10.99, quantity: 2 }
        ],
        orderDate: new Date().toISOString(),
        totalAmount: 21.98
      };
      
      orderModel.getOrderById.mockReturnValue(order);
      
      const res = await request(app)
        .get('/orders/1');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(order);
      expect(orderModel.getOrderById).toHaveBeenCalledWith('1');
    });

    it('should return 404 if order not found', async () => {
      orderModel.getOrderById.mockReturnValue(null);
      
      const res = await request(app)
        .get('/orders/999');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('not found');
    });
  });

  describe('GET /', () => {
    it('should return a health check message', async () => {
      const res = await request(app)
        .get('/');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('Order Service is running');
    });
  });
});
