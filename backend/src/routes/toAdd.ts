const routes = [
  // ==================== AUTHENTICATION ====================
  { path: "/auth/register", methods: ["POST"] },
  { path: "/auth/login", methods: ["POST"] },
  { path: "/auth/refresh", methods: ["POST"] },
  { path: "/auth/verify-email/request", methods: ["POST"] },
  { path: "/auth/verify-email/confirm", methods: ["POST"] },
  { path: "/auth/password-reset/request", methods: ["POST"] },
  { path: "/auth/password-reset/confirm", methods: ["POST"] },
  { path: "/auth/oauth/google", methods: ["GET"] },
  { path: "/auth/logout", methods: ["POST"] },

  // ==================== USER OPERATIONS ====================
  // User Profile
  { path: "/users/me", methods: ["GET", "PATCH"] },
  { path: "/users/me/change-password", methods: ["PATCH"] },

  // User Cart
  { path: "/users/me/cart", methods: ["GET", "PUT"] },
  { path: "/users/me/cart/items", methods: ["POST"] },
  { path: "/users/me/cart/items/{itemId}", methods: ["PATCH", "DELETE"] },

  // User Wishlist
  { path: "/users/me/wishlist", methods: ["GET", "PUT"] },
  { path: "/users/me/wishlist/items/{productId}", methods: ["POST", "DELETE"] },

  // User Orders
  { path: "/users/me/orders", methods: ["GET"] },

  // User Administration
  { path: "/users", methods: ["GET"] },
  { path: "/users/{userId}", methods: ["GET", "PATCH", "DELETE"] },

  // ==================== SHOPPING OPERATIONS ====================
  // Cart Management
  { path: "/carts", methods: ["GET"] },
  { path: "/carts/{cartId}", methods: ["GET", "PUT"] },
  { path: "/carts/{cartId}/items", methods: ["POST"] },
  { path: "/carts/{cartId}/items/{itemId}", methods: ["PATCH", "DELETE"] },

  // Wishlist Management
  { path: "/wishlists", methods: ["GET"] },
  { path: "/wishlists/{wishlistId}", methods: ["GET", "PUT"] },
  { path: "/wishlists/{wishlistId}/items", methods: ["POST", "DELETE"] },

  // ==================== ORDER OPERATIONS ====================
  { path: "/orders", methods: ["GET"] },
  { path: "/orders/{orderId}", methods: ["GET"] },
  { path: "/orders/{orderId}/status", methods: ["PATCH"] },

  // ==================== SALE OPERATIONS ====================
  { path: "/sales", methods: ["GET"] },
  { path: "/sales/{orderItemId}", methods: ["GET", "PATCH"] },

  // ==================== PAYMENT OPERATIONS ====================
  { path: "/payments/checkout", methods: ["POST"] },

  // ==================== CATALOG ====================
  // Product Management
  { path: "/products", methods: ["GET", "POST"] },
  { path: "/products/{productId}", methods: ["GET", "PUT", "DELETE"] },
  { path: "/products/{productId}/visibility", methods: ["PATCH"] },
  { path: "/products/{productId}/reviews", methods: ["GET", "POST"] },
  {
    path: "/products/{productId}/reviews/{reviewId}",
    methods: ["PATCH", "DELETE"],
  },

  // category Management
  { path: "/categories", methods: ["GET", "POST"] },
  { path: "/categories/{categoryId}", methods: ["GET", "PUT", "DELETE"] },
  { path: "/categories/{categoryId}/subCategories", methods: ["GET", "POST"] },
  {
    path: "/categories/{categoryId}/subCategories/{subCategoryId}",
    methods: ["GET", "PUT", "DELETE"],
  },

  // Department Management
  { path: "/departments", methods: ["GET"] },

  // Products filter Management
  { path: "/products-filter", methods: ["GET"] },

  // ==================== SEARCH & DISCOVERY ====================
  { path: "/discover/recommendations", methods: ["GET"] },
  { path: "/discover/best-offers", methods: ["GET"] },
  { path: "/discover/best-sellers", methods: ["GET"] },
];

// metadata: {
//   timestamp: 1719072000, new Date(),
//   requestId: 'req_123456', req.requestId
// }
