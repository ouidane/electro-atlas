import { z } from "zod";
import {
  createEnumSchema,
  createFloatSchema,
  createObjectIdSchema,
  validateBody,
  validateQuery,
} from "./validate";
import { ORDER_STATUS } from "../utils/constants";

const validateObjectId = createObjectIdSchema("Invalid userId");
const orderStatusSchema = createEnumSchema(
  Object.values(ORDER_STATUS),
  "Invalid orderStatus",
);

const getMyOrdersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});
export type GetMyOrdersQueryType = z.infer<typeof getMyOrdersQuerySchema>;

const getOrdersQuerySchema = getMyOrdersQuerySchema
  .extend({
    sort: z
      .string()
      .regex(
        /^[+-]?(createdAt|updatedAt|amount|taxAmount|shippingAmount|discountAmount)(,[+-]?(createdAt|updatedAt|amount|taxAmount|shippingAmount|discountAmount))*$/,
      )
      .optional()
      .default("createdAt"),
    filters: z
      .object({
        orderStatus: orderStatusSchema.optional(),
        userId: validateObjectId.optional(),
        minAmount: createFloatSchema,
        maxAmount: createFloatSchema,
        minShippingAmount: createFloatSchema,
        maxShippingAmount: createFloatSchema,
        minDiscountAmount: createFloatSchema,
        maxDiscountAmount: createFloatSchema,
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
      if (data.filters?.minShippingAmount && data.filters?.maxShippingAmount) {
        return data.filters.minShippingAmount <= data.filters.maxShippingAmount;
      }
      return true;
    },
    {
      message:
        "minShippingAmount must be less than or equal to maxShippingAmount",
      path: ["filters", "minShippingAmount"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.minDiscountAmount && data.filters?.maxDiscountAmount) {
        return data.filters.minDiscountAmount <= data.filters.maxDiscountAmount;
      }
      return true;
    },
    {
      message:
        "minDiscountAmount must be less than or equal to maxDiscountAmount",
      path: ["filters", "minDiscountAmount"],
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
export type GetOrdersQueryType = z.infer<typeof getOrdersQuerySchema>;

const UpdateOrderStatusSchema = z.object({
  orderStatus: orderStatusSchema,
});
export type UpdateOrderStatusType = z.infer<typeof UpdateOrderStatusSchema>;

export const validateUpdateOrderStatus = validateBody(UpdateOrderStatusSchema);
export const validateGetOrdersQuery = validateQuery(getOrdersQuerySchema);
export const validateGetMyOrdersQuery = validateQuery(getMyOrdersQuerySchema);
