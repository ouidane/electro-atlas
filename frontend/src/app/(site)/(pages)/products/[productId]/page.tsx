import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { getProductById } from "./_lib/queries";
import ShopDetailsSkeleton from "@/components/ShopDetails/ShopDetailsSkeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const product = await getProductById(params);

  const title = product?.name
    ? `${product.name} | Buy Online at Electro Atlas`
    : "Product Details | Electro Atlas";
  const description =
    product?.description ||
    "Explore detailed information, specifications, pricing, and customer reviews for this product on Electro Atlas.";
  const image = product?.image?.tiny
    ? [product.image.tiny]
    : ["https://electro-atlas.com/default-product-og.jpg"];

  return {
    title,
    description,
    keywords: [
      product?.name,
      "Electro Atlas",
      "product details",
      "specifications",
      "buy online",
      "electronics",
      "reviews",
    ].filter(Boolean) as string[],
    openGraph: {
      title,
      description,
      images: image,
      url: `https://electro-atlas.com/products/${product?.id || ""}`,
      siteName: "Electro Atlas",
    },
  };
}

export default async function ShopDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const product = getProductById(params);
  return (
    <main>
      <React.Suspense fallback={<ShopDetailsSkeleton />}>
        <ShopDetails productPromise={product} />
      </React.Suspense>
    </main>
  );
}
