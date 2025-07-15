import { z } from "zod";
import {
  createFloatSchema,
  createIntSchema,
  createObjectIdSchema,
  validateBody,
  validateQuery,
} from "./validate";

const AddToCartSchema = z.object({
  productId: createObjectIdSchema("Invalid product ID"),
  quantity: z.number().int().min(1),
});
export type AddItemToCart = z.infer<typeof AddToCartSchema>;

const UpdateCartSchema = z.object({
  quantity: z.number().int().min(0),
});
export type UpdateItemInCart = z.infer<typeof UpdateCartSchema>;

const UpdateMyCartSchema = z.object({
  quantity: z.number().int().min(0),
});
export type UpdateMyCart = z.infer<typeof UpdateMyCartSchema>;

const getCartsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    sort: z
      .string()
      .regex(
        /^[+-]?(createdAt|updatedAt|amount|totalProducts|totalItems)(,[+-]?(createdAt|updatedAt|amount|totalProducts|totalItems))*$/,
      )
      .optional()
      .default("createdAt"),
    filters: z
      .object({
        minAmount: createFloatSchema,
        maxAmount: createFloatSchema,
        minTotalProducts: createIntSchema,
        maxTotalProducts: createIntSchema,
        minTotalItems: createIntSchema,
        maxTotalItems: createIntSchema,
        createdAfter: z.string().datetime().optional(),
        createdBefore: z.string().datetime().optional(),
        updatedAfter: z.string().datetime().optional(),
        updatedBefore: z.string().datetime().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.filters?.minAmount && data.filters?.maxAmount) {
        return data.filters.minAmount <= data.filters.maxAmount;
      }
      return true;
    },
    {
      message: "minAmount must be less than or equal to maxAmount",
      path: ["filters", "minAmount"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.minTotalProducts && data.filters?.maxTotalProducts) {
        return data.filters.minTotalProducts <= data.filters.maxTotalProducts;
      }
      return true;
    },
    {
      message:
        "minTotalProducts must be less than or equal to maxTotalProducts",
      path: ["filters", "minTotalProducts"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.minTotalItems && data.filters?.maxTotalItems) {
        return data.filters.minTotalItems <= data.filters.maxTotalItems;
      }
      return true;
    },
    {
      message: "minTotalItems must be less than or equal to maxTotalItems",
      path: ["filters", "minTotalItems"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.createdAfter && data.filters?.createdBefore) {
        return (
          new Date(data.filters.createdAfter) <=
          new Date(data.filters.createdBefore)
        );
      }
      return true;
    },
    {
      message: "createdAfter must be before or equal to createdBefore",
      path: ["filters", "createdAfter"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.updatedAfter && data.filters?.updatedBefore) {
        return (
          new Date(data.filters.updatedAfter) <=
          new Date(data.filters.updatedBefore)
        );
      }
      return true;
    },
    {
      message: "updatedAfter must be before or equal to updatedBefore",
      path: ["filters", "updatedAfter"],
    },
  );
export type GetCartsQueryType = z.infer<typeof getCartsQuerySchema>;

export const validateAddToCart = validateBody(AddToCartSchema);
export const validateUpdateCart = validateBody(UpdateCartSchema);
export const validateUpdateMyCart = validateBody(UpdateMyCartSchema);
export const validateGetCartsQuery = validateQuery(getCartsQuerySchema);
