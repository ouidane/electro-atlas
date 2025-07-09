# Electro Atlas – Next.js E-commerce Template

**Live Demo:**
- Frontend: [https://electroatlas.vercel.app](https://electroatlas.vercel.app)
- Backend API: [https://electro-atlas-backend-production.up.railway.app](https://electro-atlas-backend-production.up.railway.app)

Electro Atlas is a modern, feature-rich e-commerce frontend template built with Next.js, React, Redux Toolkit, and Tailwind CSS. Designed for scalability and developer productivity, it provides a robust foundation for building high-performance online stores with a beautiful, responsive UI.

## Features

- **Modern Home Page:**
  - Hero section with carousel
  - Product categories
  - New arrivals & best sellers
  - Promo banners & countdowns
  - Testimonials & newsletter signup
- **Product Catalog:**
  - Grid and list views
  - Advanced filtering and sorting
  - Category navigation
- **Product Details:**
  - Image galleries & quick view modal
  - Variant selection (color, size, etc.)
  - Add to cart, wishlist, and share options
- **Shopping Cart & Checkout:**
  - Cart sidebar modal
  - Discount codes & order summary
  - Multi-step checkout with shipping, billing, and payment
- **User Authentication:**
  - Email/password sign up & sign in
  - Google OAuth integration
  - Email verification
- **User Account:**
  - Profile management
  - Address book
  - Order history
  - Secure logout
- **Wishlist:**
  - Add/remove products
  - Persistent across sessions
- **Blog Pages:**
  - Blog grid & details (with/without sidebar)
  - Categories, latest posts, and search
- **Contact Page:**
  - Contact form with validation
- **Reusable Components:**
  - Built with modular, maintainable React components
- **Responsive Design:**
  - Fully responsive and mobile-friendly
- **Dark Mode Ready:**
  - Easily customizable theme

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **UI:** [React 19](https://react.dev/), [Tailwind CSS 3](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Other:** [Swiper](https://swiperjs.com/) (carousels), [Lucide Icons](https://lucide.dev/)
- **TypeScript**

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API (set `NEXT_PUBLIC_SERVER_URL` in your environment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ouidane/electro-atlas.git
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Copy `.env.exemple` to `.env.local` and set `NEXT_PUBLIC_SERVER_URL` to your backend API URL.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Folder Structure

- `src/app/` – Next.js app directory (pages, layouts, routing)
- `src/components/` – Modular React components (Home, Shop, Auth, Blog, etc.)
- `src/redux/` – Redux Toolkit store, slices, and API logic
- `src/types/` – TypeScript type definitions
- `public/` – Static assets (images, icons, etc.)

## Customization
- **Styling:** Tailwind CSS config in `tailwind.config.ts` and custom styles in `src/app/css/style.css`
- **Components:** Easily extend or replace components in `src/components/`
- **API:** Integrate with your backend by updating the API URL in `.env.local`

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

## License
This project is licensed for personal and commercial use. See the LICENSE file for details.

---

**Electro Atlas** – Accelerate your e-commerce development with a modern, scalable Next.js template.
