import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";
import { getProducts } from "@/actions/product/queries";

export const metadata: Metadata = {
  title: "Shop Electronics | Electro Atlas",
  description: "Browse and shop the latest electronics, gadgets, and accessories at Electro Atlas. Find top deals and new arrivals.",
  // other metadata
};

const ShopWithSidebarPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const productsData = await getProducts(params);

  return (
    <main>
      <ShopWithSidebar productsData={productsData} />
    </main>
  );
};

export default ShopWithSidebarPage;
