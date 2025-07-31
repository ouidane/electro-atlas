import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Electro Atlas",
  description:
    "View and manage your saved products on Electro Atlas. Add your favorite electronics to your wishlist for easy access and quick shopping.",
  keywords: [
    "wishlist",
    "saved products",
    "favorite electronics",
    "Electro Atlas",
    "shopping list",
    "electronics wishlist",
  ],
  openGraph: {
    title: "Wishlist | Electro Atlas",
    description:
      "Easily access and manage your favorite electronics on your Electro Atlas wishlist.",
    url: "https://electro-atlas.com/wishlist",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
