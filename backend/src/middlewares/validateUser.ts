import { z } from "zod";
import { ROLE, CITIES, COUNTRIES } from "../utils/constants";
import { createEnumSchema, validateBody, validateQuery } from "./validate";

const phoneRegex = /^(?:\+212|0)(?:5|6|7)[0-9]{8}$/;
const roleSchema = createEnumSchema(Object.values(ROLE), "Invalid role");
const countrySchema = createEnumSchema([...COUNTRIES], "Invalid country");
const citySchema = createEnumSchema([...CITIES], "Invalid city");

const createUserSchema = z
  .object({
    role: roleSchema,
    email: z.string().min(1, "Email is required!").email("Invalid email!"),
    password: z
      .string()
      .min(1, "Password is required!")
      .min(8, "Password too short!"),
    confirmPassword: z.string().min(1, "Confirm password is required!"),
    familyName: z
      .string()
      .min(1, "FamilyName is required")
      .regex(
        /^[a-zA-Z\s-]+$/,
        "FamilyName must contain only letters, spaces, or hyphens"
      ),
    givenName: z
      .string()
      .min(1, "GivenName is required")
      .regex(
        /^[a-zA-Z\s-]+$/,
        "GivenName must contain only letters, spaces, or hyphens"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });
export type CreateUserType = z.infer<typeof createUserSchema>;

const updateSelfUserSchema = z.object({
  familyName: z
    .string()
    .min(1, "FamilyName is required")
    .regex(
      /^[a-zA-Z\s-]+$/,
      "FamilyName must contain only letters, spaces, or hyphens"
    ),
  givenName: z
    .string()
    .min(1, "GivenName is required")
    .regex(
      /^[a-zA-Z\s-]+$/,
      "GivenName must contain only letters, spaces, or hyphens"
    ),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  address: z.object({
    line1: z
      .string()
      .min(2, "Address is required")
      .max(100, "Address is too long"),
    line2: z.string().optional(),
    postalCode: z.string().regex(/^\d{5}$/, "Invalid postal code"),
    city: citySchema,
    country: countrySchema,
  }),
});
export type UpdateSelfUserType = z.infer<typeof updateSelfUserSchema>;

const updateUserSchema = updateSelfUserSchema
  .partial()
  .extend({
    role: roleSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
    path: [],
  });
export type UpdateUserType = z.infer<typeof updateUserSchema>;

const getUsersQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    sort: z
      .string()
      .regex(
        /^[+-]?(createdAt|updatedAt|familyName|givenName)(,[+-]?(createdAt|updatedAt|familyName|givenName))*$/
      )
      .optional()
      .default("createdAt"),
    filters: z
      .object({
        city: citySchema.optional(),
        country: countrySchema.optional(),
        role: roleSchema.optional(),
        query: z.string().optional(),
        isVerified: z
          .string()
          .transform((val) => val === "true")
          .optional(),
        createdAfter: z.string().datetime().optional(),
        createdBefore: z.string().datetime().optional(),
        updatedAfter: z.string().datetime().optional(),
        updatedBefore: z.string().datetime().optional(),
      })
      .optional(),
  })
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
    }
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
    }
  );
export type GetUsersQueryType = z.infer<typeof getUsersQuerySchema>;

export const validateCreateUser = validateBody(createUserSchema);
export const validateUpdateUser = validateBody(updateUserSchema);
export const validateUpdateSelfUser = validateBody(updateSelfUserSchema);
export const validateGetUsersQuery = validateQuery(getUsersQuerySchema);
