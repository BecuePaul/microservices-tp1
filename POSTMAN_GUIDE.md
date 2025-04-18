# Guide d'utilisation avec Postman

Ce guide vous montre comment tester les microservices avec Postman.

## Prérequis

1. Assurez-vous que les deux services sont en cours d'exécution :
   - Service catalogue sur le port 8081
   - Service commande sur le port 8082

2. Ouvrez Postman pour commencer à tester les API

## Service Catalogue (port 8081)

### 1. Obtenir tous les produits

- **URL**: `http://localhost:8081/products`
- **Méthode**: GET
- **Headers**: Aucun
- **Body**: Aucun
- **Réponse attendue**: Liste de tous les produits (au format JSON)

### 2. Obtenir un produit par ID

- **URL**: `http://localhost:8081/products/1`
- **Méthode**: GET
- **Headers**: Aucun
- **Body**: Aucun
- **Réponse attendue**: Détails du produit avec l'ID 1 (au format JSON)

### 3. Ajouter un nouveau produit

- **URL**: `http://localhost:8081/products`
- **Méthode**: POST
- **Headers**: 
  - Content-Type: application/json
- **Body** (raw JSON):
```json
{
  "name": "Tablet",
  "price": 299.99
}
```
- **Réponse attendue**: Le produit créé avec un ID généré (au format JSON)

## Service Commande (port 8082)

### 1. Créer une nouvelle commande

- **URL**: `http://localhost:8082/orders`
- **Méthode**: POST
- **Headers**: 
  - Content-Type: application/json
- **Body** (raw JSON):
```json
{
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
}
```
- **Réponse attendue**: La commande créée avec les détails des produits et le montant total (au format JSON)

### 2. Obtenir une commande par ID

- **URL**: `http://localhost:8082/orders/1`
- **Méthode**: GET
- **Headers**: Aucun
- **Body**: Aucun
- **Réponse attendue**: Détails de la commande avec l'ID 1 (au format JSON)

## Flux de test complet

1. Obtenir la liste des produits préchargés (GET /products)
2. Ajouter un nouveau produit (POST /products)
3. Vérifier que le nouveau produit a été ajouté (GET /products)
4. Créer une commande avec des produits existants (POST /orders)
5. Vérifier les détails de la commande créée (GET /orders/{id})

## Tests Unitaires

En plus des tests manuels avec Postman, le projet inclut des tests unitaires automatisés pour les deux microservices.

### Exécution des tests

Pour exécuter les tests du service catalogue :
```bash
cd catalog-service
npm install
npm test
```

Pour exécuter les tests du service commande :
```bash
cd order-service
npm install
npm test
```

### Couverture des tests

Les tests unitaires couvrent :

1. **Service Catalogue**
   - GET /products - Récupération de tous les produits
   - GET /products/{id} - Récupération d'un produit par ID
   - POST /products - Ajout d'un nouveau produit
   - Gestion des erreurs (produit non trouvé, etc.)

2. **Service Commande**
   - GET /orders/{id} - Récupération d'une commande par ID
   - POST /orders - Création d'une nouvelle commande
   - Validation des données d'entrée
   - Gestion des erreurs (produit non trouvé, commande non trouvée, etc.)

Les tests utilisent :
- **Jest** comme framework de test
- **Supertest** pour tester les API REST
- **Mocks** pour simuler les dépendances (comme la communication entre services)

## Exemples de réponses

### Exemple de réponse pour GET /products
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99
  },
  {
    "id": 2,
    "name": "Smartphone",
    "price": 499.99
  },
  {
    "id": 3,
    "name": "Headphones",
    "price": 99.99
  }
]
```

### Exemple de réponse pour POST /orders
```json
{
  "id": 1,
  "items": [
    {
      "productId": 1,
      "productName": "Laptop",
      "productPrice": 999.99,
      "quantity": 2
    },
    {
      "productId": 2,
      "productName": "Smartphone",
      "productPrice": 499.99,
      "quantity": 1
    }
  ],
  "orderDate": "2023-05-15T10:30:45.123Z",
  "totalAmount": 2499.97
}
