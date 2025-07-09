import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { getProductById } from "@/actions/product/queries";

export const metadata: Metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
  // other metadata
};

const ShopDetailsPage = async ({ params }: { params: { productId: string } }) => {
  const awaitedParams = await params;
  const response = await getProductById(awaitedParams.productId);
  const product = response.data;
  return (
    <main>
      <ShopDetails product={product} />
    </main>
  );
};

export default ShopDetailsPage;
