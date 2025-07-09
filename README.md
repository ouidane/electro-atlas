# Electro Atlas App

Electro Atlas is a modern, full-stack e-commerce platform designed for scalability, performance, and a seamless user experience. It features a robust backend API and a dynamic frontend, supporting a wide range of e-commerce functionalities.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- User authentication and authorization (signup, login, email verification)
- Product catalog with categories, variants, and specifications
- Shopping cart and wishlist management
- Order placement and order history
- Payment integration (Stripe)
- Product reviews and ratings
- Admin features for product and category management
- Responsive, modern UI with Next.js and Tailwind CSS
- RESTful API with comprehensive validation and error handling

## Tech Stack

**Frontend:**
- Next.js (React)
- Tailwind CSS
- Redux Toolkit

**Backend:**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Cloudinary (image uploads)
- Stripe (payments)
- Nodemailer (email)
- Redis (caching/sessions)

## Architecture Overview

The Electro Atlas App is structured as a decoupled, full-stack application with clear separation between the frontend and backend. Below is a high-level overview of the architecture, technologies, and services used, along with more technical details about each component and the overall system.

### High-Level Architecture

```
[Client (Browser)]
      |
      v
[Frontend (Next.js)] <----> [Backend API (Express.js)] <----> [MongoDB]
      |                             |                      |
      |                             |                      |
      |                             |----> [Cloudinary]    |
      |                             |----> [Stripe]        |
      |                             |----> [Nodemailer]    |
      |                             |----> [Redis]         |
```

### Request/Response Flow

1. **User Interaction:**
   - Users interact with the frontend (Next.js), which renders pages server-side or client-side as needed.
2. **API Communication:**
   - The frontend communicates with the backend via RESTful API endpoints (secured with JWT tokens for protected routes).
3. **Business Logic:**
   - The backend processes requests, applies business logic, interacts with the database, and integrates with third-party services.
4. **Data Storage & Retrieval:**
   - MongoDB stores all persistent data (users, products, orders, etc.).
5. **Media & Payments:**
   - Cloudinary handles image uploads and transformations. Stripe processes payments. Nodemailer sends transactional emails. Redis is used for caching and session management.
6. **Response:**
   - The backend returns JSON responses to the frontend, which updates the UI accordingly.

### Security Practices

- **Authentication:** JWT-based authentication for API endpoints; tokens are stored securely on the client.
- **Authorization:** Role-based access control for admin/user endpoints.
- **Input Validation:** All incoming data is validated using middleware to prevent injection and malformed requests.
- **HTTPS:** Recommended for all deployments to secure data in transit.
- **Environment Variables:** Sensitive credentials are stored in environment variables, never hardcoded.
- **Rate Limiting:** Middleware to prevent abuse and brute-force attacks.
- **CORS:** Configured to allow only trusted origins.

### Deployment Considerations

- **Frontend:** Can be deployed on Vercel, Netlify, or any static hosting supporting Next.js.
- **Backend:** Deployable on cloud platforms (Heroku, AWS, DigitalOcean, etc.) with environment variable support.
- **Database:** MongoDB Atlas (cloud) or self-hosted MongoDB instance.
- **Redis:** Managed Redis service or self-hosted instance.
- **Environment Management:** Use `.env` files and secret managers for production.
- **Scaling:** Stateless backend allows for horizontal scaling; Redis and MongoDB can be clustered for high availability.

### Component Deep Dive

#### Frontend (Next.js)
- **Routing:** File-based routing for pages and API routes.
- **Data Fetching:** Uses `getServerSideProps`, `getStaticProps`, and client-side fetching for dynamic/static content.
- **State Management:** Redux Toolkit manages global state (cart, user, wishlist, etc.).
- **Styling:** Tailwind CSS for rapid, consistent UI development.
- **Authentication:** Handles login/signup flows, stores JWT in HTTP-only cookies or local storage.
- **SEO:** Server-side rendering and meta tag management for SEO optimization.

#### Backend (Node.js/Express)
- **API Structure:** Organized into controllers, services, and models for maintainability.
- **Authentication:** JWT tokens issued on login/signup; middleware protects private routes.
- **Validation:** Uses custom middleware and libraries (e.g., Joi, express-validator) for request validation.
- **Error Handling:** Centralized error handler middleware for consistent API responses.
- **Logging:** Winston or similar logger for request and error logging.
- **Rate Limiting:** Express middleware to limit repeated requests.
- **OpenAPI/Swagger:** API documentation (if enabled) for easy integration/testing.

#### Database (MongoDB)
- **ODM:** Mongoose for schema definitions, validation, and query building.
- **Collections:** Users, Products, Categories, Orders, Reviews, Cart, Wishlist, etc.
- **Indexes:** Used for efficient querying (e.g., on product name, user email).
- **Relationships:** References and population for related data (e.g., product reviews, user orders).

#### Third-Party Integrations
- **Cloudinary:**
  - Handles image uploads from the frontend via signed requests.
  - Provides URLs for optimized image delivery.
- **Stripe:**
  - Handles payment intents, webhooks for payment status, and secure checkout flows.
- **Nodemailer:**
  - Sends emails for account confirmation, password reset, and order notifications.
- **Redis:**
  - Used for caching frequently accessed data (e.g., product lists), session storage, and rate limiting.

#### Additional Services & Utilities
- **Email Templates:** EJS templates for transactional emails.
- **API Validation:** OpenAPI/Swagger YAML files for endpoint validation and documentation.
- **File Uploads:** Multer middleware for handling multipart/form-data uploads.
- **Graceful Shutdown:** Utility for safe server shutdown and resource cleanup.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance
- Redis instance
- Cloudinary account
- Stripe account

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/ouidane/electro-atlas.git
cd electro-atlas
```

#### 2. Install dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

#### 3. Configure Environment Variables

Copy the example environment files and fill in your credentials:

**Backend:**
```bash
cp .env.example .env
```

**Frontend:**
```bash
cp .env.exemple .env.local
```

Edit the `.env` and `.env.local` files with your configuration (see [Environment Variables](#environment-variables)).

#### 4. Run the Application

**Backend:**
```bash
npm run dev
```

**Frontend:**
```bash
npm run dev
```

The frontend will typically run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000).

## Project Structure

```
electro-atlas/
  backend/      # Express.js API, models, controllers, services
  frontend/     # Next.js frontend, components, pages, redux
```

## Environment Variables

### Backend (`backend/.env`)

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `CLOUDINARY_URL` - Cloudinary API URL
- `STRIPE_SECRET_KEY` - Stripe secret key
- `EMAIL_USER` - Email service user
- `EMAIL_PASS` - Email service password
- `REDIS_URL` - Redis connection string
- ...and others as required

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_API_URL` - URL of the backend API
- ...and others as required

## Scripts

**Backend:**
- `npm run dev` - Start backend in development mode
- `npm run build` - Build backend for production
- `npm test` - Run backend tests

**Frontend:**
- `npm run dev` - Start frontend in development mode
- `npm run build` - Build frontend for production
- `npm start` - Start frontend in production

## Contributing

Contributions are welcome! Please open issues and submit pull requests for new features, bug fixes, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions, suggestions, or support, please contact [ouidanezakaria@gmail.com].

---

*Happy coding!*