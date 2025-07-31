import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";
import { DiscoverResponse } from "@/types";

export const discoverApi = createApi({
  reducerPath: "discoverApi",
  baseQuery: baseQuery,
  tagTypes: ["RecommendedProducts", "BestOffers", "BestSeller"],
  endpoints: (builder) => ({
    getRecommendedProducts: builder.query<
      DiscoverResponse,
      {
        categoryId?: string;
        subCategoryId?: string;
        excludeProductId?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => {
        let url = "/discover/recommendations";
        if (
          params &&
          (params.categoryId ||
            params.subCategoryId ||
            params.excludeProductId ||
            params.page ||
            params.limit)
        ) {
          const queryParams = new URLSearchParams();
          if (params.categoryId)
            queryParams.append("categoryId", params.categoryId);
          if (params.subCategoryId)
            queryParams.append("subCategoryId", params.subCategoryId);
          if (params.excludeProductId)
            queryParams.append("excludeProductId", params.excludeProductId);
          if (params.page) queryParams.append("page", params.page.toString());
          if (params.limit)
            queryParams.append("limit", params.limit.toString());
          url += `?${queryParams}`;
        }
        return url;
      },
      providesTags: ["RecommendedProducts"],
    }),
    getBestOffers: builder.query<
      DiscoverResponse,
      {
        categoryId?: string;
        subCategoryId?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => {
        let url = "/discover/best-offers";
        if (
          params &&
          (params.categoryId ||
            params.subCategoryId ||
            params.page ||
            params.limit)
        ) {
          const queryParams = new URLSearchParams();
          if (params.categoryId)
            queryParams.append("categoryId", params.categoryId);
          if (params.subCategoryId)
            queryParams.append("subCategoryId", params.subCategoryId);
          if (params.page) queryParams.append("page", params.page.toString());
          if (params.limit)
            queryParams.append("limit", params.limit.toString());
          url += `?${queryParams}`;
        }
        return url;
      },
      providesTags: ["BestOffers"],
    }),
    getBestSeller: builder.query<
      DiscoverResponse,
      {
        categoryId?: string;
        subCategoryId?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => {
        let url = "/discover/best-seller";
        if (
          params &&
          (params.categoryId ||
            params.subCategoryId ||
            params.page ||
            params.limit)
        ) {
          const queryParams = new URLSearchParams();
          if (params.categoryId)
            queryParams.append("categoryId", params.categoryId);
          if (params.subCategoryId)
            queryParams.append("subCategoryId", params.subCategoryId);
          if (params.page) queryParams.append("page", params.page.toString());
          if (params.limit)
            queryParams.append("limit", params.limit.toString());
          url += `?${queryParams}`;
        }
        return url;
      },
      providesTags: ["BestSeller"],
    }),
  }),
});

export const {
  useGetRecommendedProductsQuery,
  useGetBestOffersQuery,
  useGetBestSellerQuery,
} = discoverApi;
