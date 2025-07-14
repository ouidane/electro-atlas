import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { getProductById } from "@/actions/product/queries";

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
  const awaitedParams = await params;
  const response = await getProductById(awaitedParams.productId);
  const product = response.data;

  return {
    title: `${product?.name || "Product Details"} | Electro Atlas`,
    description: product?.description || "Explore detailed information, specifications, and reviews for this product on Electro Atlas.",
    openGraph: {
      title: `${product?.name || "Product Details"} | Electro Atlas`,
      description: product?.description || "Explore detailed information, specifications, and reviews for this product on Electro Atlas.",
      images: product?.image?.tiny ? [product.image.tiny] : undefined,
    },
  };
}

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
