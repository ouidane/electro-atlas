import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Your Cart | Electro Atlas",
  description:
    "View and manage the products in your shopping cart. Ready to checkout? Electro Atlas makes it easy to review, update, and purchase your favorite electronics.",
  keywords: [
    "shopping cart",
    "Electro Atlas",
    "checkout",
    "buy electronics",
    "cart management",
    "online shopping",
  ],
  openGraph: {
    title: "Your Cart | Electro Atlas",
    description:
      "Manage your shopping cart and get ready to checkout your favorite electronics at Electro Atlas.",
    url: "https://electro-atlas.com/cart",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
