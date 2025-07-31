# Electro Atlas App

**Live Demo:**

- Frontend: [https://electroatlas.vercel.app](https://electroatlas.vercel.app)
- Backend API: [https://electro-atlas-backend-production.up.railway.app](https://electro-atlas-backend-production.up.railway.app)
- API Docs: [https://electro-atlas-backend-production.up.railway.app/api-docs](https://electro-atlas-backend-production.up.railway.app/api-docs)

Electro Atlas is a modern, full-stack e-commerce platform designed for scalability, performance, and a seamless user experience. It features a robust backend API and a dynamic frontend, supporting a wide range of e-commerce functionalities.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
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

- `NEXT_PUBLIC_SERVER_URL` - URL of the backend API
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

_Happy coding!_
