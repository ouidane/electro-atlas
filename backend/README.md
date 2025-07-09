# Electro Atlas API

A robust, scalable, and secure backend API for the Electro Atlas e-commerce platform. This service powers user authentication, product catalog, cart, orders, payments, reviews, and more, providing a comprehensive foundation for a modern online marketplace.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication & Authorization**: Secure registration, login, JWT-based sessions, Google OAuth, email verification, and password reset.
- **Product Catalog**: Advanced product management with variants, specifications, categories, and subcategories.
- **Cart & Wishlist**: Persistent user carts and wishlists with CRUD operations.
- **Order Management**: Place, track, and manage orders with support for multiple order statuses.
- **Payment Integration**: Stripe-powered secure payment processing.
- **Reviews & Ratings**: Users can review and rate products.
- **Sales & Offers**: Manage sales, discounts, and featured products.
- **Discovery & Recommendations**: Endpoints for best offers, best sellers, and personalized recommendations.
- **Admin & Department Management**: Organize products by departments and categories.
- **Security**: Rate limiting, input sanitization, CORS, and HTTP headers via Helmet.
- **API Documentation**: OpenAPI 3.0 (Swagger) documentation.

---

## Tech Stack

- **Node.js** & **Express.js** (API framework)
- **TypeScript** (type safety)
- **MongoDB** & **Mongoose** (database & ODM)
- **Redis** (session and cache management)
- **Stripe** (payments)
- **Cloudinary** (image storage)
- **Passport.js** (authentication)
- **Jest** (testing)
- **Swagger/OpenAPI** (API docs)
- **Winston** (logging)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance
- Redis instance
- Stripe, Cloudinary, and Google OAuth credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ouidane/electro-atlas.git
   cd electro-atlas/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your credentials (MongoDB, Redis, Stripe, Cloudinary, JWT secrets, etc.).

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Run the server (development):**
   ```bash
   npm run dev
   ```

6. **Run tests:**
   ```bash
   npm test
   ```

---

## API Documentation

- **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **OpenAPI Spec**: See `src/schemas/openapi.json` or `src/routes/v1/definition.yaml`

### Main Endpoints

- `/api/v1/auth` – Authentication (register, login, Google OAuth, etc.)
- `/api/v1/products` – Product catalog and search
- `/api/v1/categories` – Category management
- `/api/v1/carts` – Cart operations
- `/api/v1/wishlists` – Wishlist operations
- `/api/v1/orders` – Order management
- `/api/v1/payments` – Payment processing
- `/api/v1/reviews` – Product reviews
- `/api/v1/sales` – Sales and offers
- `/api/v1/discover` – Discovery and recommendations

See the Swagger UI for detailed request/response schemas.

---

## Project Structure

```
backend/
  src/
    config/         # Configuration files (DB, Redis, Cloudinary, etc.)
    controllers/    # Express route controllers
    middlewares/    # Custom Express middlewares
    models/         # Mongoose models and schemas
    routes/         # API route definitions (OpenAPI YAML + Express routers)
    schemas/        # OpenAPI schemas and TypeScript types
    services/       # Business logic and integrations
    templates/      # EJS email templates
    utils/          # Utility functions (logging, pagination, etc.)
    index.ts        # App entry point
    server.ts       # Express app setup
  package.json
  README.md
  tsconfig.json
```

---

## Contributing

Contributions are welcome! Please open issues and submit pull requests for new features, bug fixes, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
