import { z } from "zod";
import { createObjectIdSchema, validateQuery } from "./validate";

const recommendationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  categoryId: createObjectIdSchema("Invalid categoryId").optional(),
  subCategoryId: createObjectIdSchema("Invalid subCategoryId").optional(),
  excludeProductId: createObjectIdSchema("Invalid excludeProductId").optional(),
});
export type RecommendationType = z.infer<typeof recommendationSchema>;

const bestSellingSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  categoryId: createObjectIdSchema("Invalid categoryId").optional(),
  subCategoryId: createObjectIdSchema("Invalid subCategoryId").optional(),
});
export type BestSellingType = z.infer<typeof bestSellingSchema>;

const bestOffersSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  categoryId: createObjectIdSchema("Invalid categoryId").optional(),
  subCategoryId: createObjectIdSchema("Invalid subCategoryId").optional(),
});
export type BestOffersType = z.infer<typeof bestOffersSchema>;

export const validateRecommendation = validateQuery(recommendationSchema);
export const validateBestSelling = validateQuery(bestSellingSchema);
export const validateBestOffers = validateQuery(bestOffersSchema);
