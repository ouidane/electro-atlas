import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { GetProductsQuerySchema } from "./validations";
import { ProductsResponse } from "../../../types";

export async function getProducts(input: { [key: string]: string | string[] | undefined }) {
  noStore();
  try {
    const queryBaseObj: Record<string, string> = {
      page: "1",
      limit: "12"
    };

    for (const key in input) {
      const value = input[key];
  
      if (key === "page" && typeof value === "string") {
        queryBaseObj.page = input.page.toString()
      } else if (key === "limit" && typeof value === "string") {
        queryBaseObj.limit = input.limit.toString()
      } else if (key === "sort" && typeof value === "string") {
        queryBaseObj.sort = value;
      } else {
        const match = key.match(/^filters\[(.+)\]$/);
        if (match && typeof value === "string") {
          queryBaseObj[key] = value;
        }
      }
    }

    const queryBase = new URLSearchParams(queryBaseObj);

    // Execute the query
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products?${queryBase.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const result: ProductsResponse = await response.json();

    return result;
  } catch (err) {
    throw err;
  }
}


export async function getProductById(input: string) {
  try {
    // Execute the query
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${input}`);

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    throw err;
  }
}
