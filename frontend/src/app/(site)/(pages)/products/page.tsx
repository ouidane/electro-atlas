import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";
import { getFilters, getProducts } from "./_lib/queries";
import ShopSkeleton from "@/components/ShopWithSidebar/ShopSkeleton";

export const metadata: Metadata = {
  title: "Shop Electronics & Gadgets | Electro Atlas",
  description:
    "Discover and shop the latest electronics, gadgets, and accessories at Electro Atlas. Enjoy exclusive deals, top brands, and new arrivals in our curated collection.",
  keywords: [
    "electronics",
    "gadgets",
    "shop online",
    "Electro Atlas",
    "accessories",
    "tech deals",
    "new arrivals",
    "best electronics",
    "buy electronics online",
  ],
  openGraph: {
    title: "Shop Electronics & Gadgets | Electro Atlas",
    description:
      "Explore a wide range of electronics, gadgets, and accessories at Electro Atlas. Shop top brands and enjoy exclusive offers.",
    url: "https://electro-atlas.com/products",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const ShopWithSidebarPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const productsPromise = getProducts(searchParams);
  // const filtersPromise = getFilters(searchParams)

  return (
    <main>
      <React.Suspense fallback={<ShopSkeleton />}>
        <ShopWithSidebar
          productsPromise={productsPromise}
          // filtersPromise={filtersPromise}
        />
      </React.Suspense>
    </main>
  );
};

export default ShopWithSidebarPage;
