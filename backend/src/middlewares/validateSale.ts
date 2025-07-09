import { z } from "zod";
import {
  createFloatSchema,
  createIntSchema,
  createObjectIdSchema,
  validateBody,
  validateQuery,
} from "./validate";

const validateObjectId = createObjectIdSchema("Invalid userId");

const getSalesQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    sort: z
      .string()
      .regex(
        /^[+-]?(createdAt|updatedAt|productName|quantity|salePrice|totalPrice|refundedQuantity)(,[+-]?(createdAt|updatedAt|productName|quantity|salePrice|totalPrice|refundedQuantity))*$/,
      )
      .optional()
      .default("createdAt"),
    filters: z
      .object({
        productName: z.string().optional(),
        sellerId: validateObjectId.optional(),
        minQuantity: createIntSchema,
        maxQuantity: createIntSchema,
        minRefundedQuantity: createIntSchema,
        maxRefundedQuantity: createIntSchema,
        isRefunded: z.boolean().optional(),
        minSalePrice: createFloatSchema,
        maxSalePrice: createFloatSchema,
        minTotalPrice: createFloatSchema,
        maxTotalPrice: createFloatSchema,
        createdAfter: z.string().datetime().optional(),
        createdBefore: z.string().datetime().optional(),
        updatedAfter: z.string().datetime().optional(),
        updatedBefore: z.string().datetime().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.filters?.minQuantity && data.filters?.maxQuantity) {
        return data.filters.minQuantity <= data.filters.maxQuantity;
      }
      return true;
    },
    {
      message: "minQuantity must be less than or equal to maxQuantity",
      path: ["filters", "minQuantity"],
    },
  )
  .refine(
    (data) => {
      if (
        data.filters?.minRefundedQuantity &&
        data.filters?.maxRefundedQuantity
      ) {
        return (
          data.filters.minRefundedQuantity <= data.filters.maxRefundedQuantity
        );
      }
      return true;
    },
    {
      message:
        "minRefundedQuantity must be less than or equal to maxRefundedQuantity",
      path: ["filters", "minRefundedQuantity"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.minSalePrice && data.filters?.maxSalePrice) {
        return data.filters.minSalePrice <= data.filters.maxSalePrice;
      }
      return true;
    },
    {
      message: "minSalePrice must be less than or equal to maxSalePrice",
      path: ["filters", "minSalePrice"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.minTotalPrice && data.filters?.maxTotalPrice) {
        return data.filters.minTotalPrice <= data.filters.maxTotalPrice;
      }
      return true;
    },
    {
      message: "minTotalPrice must be less than or equal to maxTotalPrice",
      path: ["filters", "minTotalPrice"],
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
export type GetSalesQueryType = z.infer<typeof getSalesQuerySchema>;

const UpdateRefundSchema = z.object({
  refundedQuantity: z
    .number()
    .int()
    .min(1, "Refunded quantity must be at least 1"),
});
export type UpdateRefundType = z.infer<typeof UpdateRefundSchema>;

export const validateUpdateRefund = validateBody(UpdateRefundSchema);
export const validateGetSalesQuery = validateQuery(getSalesQuerySchema);
