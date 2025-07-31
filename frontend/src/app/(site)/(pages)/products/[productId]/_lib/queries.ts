import "server-only";

import { ProductResponse } from "@/types";
import { notFound } from "next/navigation";

export async function getProductById(params: Promise<{ productId: string }>) {
  try {
    const productId = (await params).productId;
    // Execute the query
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    // Treat 404 and 400 as not found (invalid or missing product)
    if (response.status === 404 || response.status === 400) {
      notFound();
    }

    if (!response.ok) {
      // Log error for debugging
      console.error(
        `getProductById error: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText}`
      );
    }

    const result: ProductResponse = await response.json();
    if (!result.data) {
      notFound();
    }
    return result.data;
  } catch (err) {
    // Log unexpected errors
    console.error("getProductById unexpected error:", err);
    throw err;
  }
}
