import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { ProductListResponse, FilterResponse } from "@/types";

export async function getProducts(
  searchParams: Promise<{ [key: string]: string | undefined }>
) {
  noStore();
  try {
    const params = await searchParams;
    const queryBaseObj: Record<string, string> = {
      page: "1",
      limit: "12",
    };

    for (const key in params) {
      const value = params[key];

      if (key === "page" && typeof value === "string") {
        queryBaseObj.page = params.page.toString();
      } else if (key === "limit" && typeof value === "string") {
        queryBaseObj.limit = params.limit.toString();
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

    const result: ProductListResponse = await response.json();

    return result;
  } catch (err) {
    throw err;
  }
}

export async function getFilters(
  searchParams: Promise<{ [key: string]: string | undefined }>
) {
  try {
    const params = await searchParams;
    const queryBaseObj: Record<string, string> = {};

    for (const key in params) {
      const value = params[key];
      if (key === "filters[categoryId]" && typeof value === "string") {
        queryBaseObj["categoryId"] = value;
      } else if (
        key === "filters[subCategoryId]" &&
        typeof value === "string"
      ) {
        queryBaseObj["subCategoryId"] = value;
      }
    }

    const queryBase = new URLSearchParams(queryBaseObj);

    // Execute the query
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/products-filter?${queryBase.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const result: FilterResponse = await response.json();

    return result;
  } catch (err) {
    throw err;
  }
}
