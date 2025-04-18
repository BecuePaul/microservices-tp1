class OrderItem {
  constructor(productId, productName, productPrice, quantity) {
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.quantity = quantity;
  }

  static fromProduct(product, quantity) {
    return new OrderItem(
      product.id,
      product.name,
      product.price,
      quantity
    );
  }

  getTotalPrice() {
    return this.productPrice * this.quantity;
  }
}

module.exports = OrderItem;
