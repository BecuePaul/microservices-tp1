# Microservices E-commerce System (Node.js)

This project consists of two microservices:
1. Catalog Service - Manages products
2. Order Service - Manages orders and communicates with the catalog service

## Project Structure

```
tp1/
├── catalog-service/       # Catalog microservice
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── tests/             # Unit tests
│   ├── server.js          # Main application
│   ├── package.json       # Dependencies
│   ├── jest.config.js     # Jest configuration
│   └── Dockerfile         # Docker configuration
├── order-service/         # Order microservice
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── tests/             # Unit tests
│   ├── server.js          # Main application
│   ├── package.json       # Dependencies
│   ├── jest.config.js     # Jest configuration
│   └── Dockerfile         # Docker configuration
└── docker-compose.yml     # Docker Compose configuration
```

## Running the Services

### Using Docker Compose

To run both services using Docker Compose:
```bash
cd tp1
docker-compose up --build
```

## Running Tests

Each microservice has its own test suite using Jest and Supertest for API testing.

To run tests for the catalog service:
```bash
cd catalog-service
npm install
npm test
```

To run tests for the order service:
```bash
cd order-service
npm install
npm test
```

## API Examples

### Catalog Service (port 8081)

#### Get all products
```bash
curl -X GET http://localhost:8081/products
```

#### Get a product by ID
```bash
curl -X GET http://localhost:8081/products/1
```

#### Add a new product
```bash
curl -X POST http://localhost:8081/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tablet",
    "price": 299.99
  }'
```

### Order Service (port 8082)

#### Create a new order
```bash
curl -X POST http://localhost:8082/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 1
      }
    ]
  }'
```

#### Get an order by ID
```bash
curl -X GET http://localhost:8082/orders/1
```

## Communication Between Services

The Order Service communicates with the Catalog Service using Axios HTTP client to fetch product details when creating an order.

## Testing Strategy

### Unit Tests

- **Catalog Service Tests**: Tests for all product endpoints (GET /products, GET /products/:id, POST /products)
- **Order Service Tests**: Tests for all order endpoints (GET /orders/:id, POST /orders)

The tests use:
- **Jest**: JavaScript testing framework
- **Supertest**: HTTP assertions library for testing API endpoints
- **Mocking**: Service dependencies are mocked to isolate tests

### Test Coverage

The tests aim to cover:
- Happy path scenarios (successful requests)
- Error handling (invalid inputs, not found resources)
- Edge cases (empty arrays, missing fields)

## Notes

- Both services store data in memory (no database)
- The catalog service is pre-loaded with sample products
- The order service depends on the catalog service being available
