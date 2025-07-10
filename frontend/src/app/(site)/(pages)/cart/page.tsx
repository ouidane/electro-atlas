import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Your Cart | Electro Atlas",
  description: "View and manage the products in your shopping cart. Ready to checkout? Electro Atlas makes it easy!",
  // other metadata
};

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
