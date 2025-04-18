const OrderItem = require('./OrderItem');

class Order {
  constructor(id, items = []) {
    this.id = id;
    this.items = items;
    this.orderDate = new Date().toISOString();
    this.totalAmount = this.calculateTotalAmount();
  }

  addItem(item) {
    this.items.push(item);
    this.totalAmount = this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}

const orders = new Map();
let nextId = 1;

const getOrderById = (id) => {
  return orders.get(Number(id));
};

const createOrder = (items) => {
  const order = new Order(nextId++, items);
  orders.set(order.id, order);
  return order;
};

module.exports = {
  Order,
  getOrderById,
  createOrder
};
