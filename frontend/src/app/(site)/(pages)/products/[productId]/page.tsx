import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { getProductById } from "@/actions/product/queries";

export const metadata: Metadata = {
  title: "Product Details | Electro Atlas",
  description: "Explore detailed information, specifications, and reviews for this product on Electro Atlas.",
  // other metadata
};

export default async function ShopDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
  const awaitedParams = await params;
  const response = await getProductById(awaitedParams.productId);
  const product = response.data;
  return (
    <main>
      <ShopDetails product={product} />
    </main>
  );
}
