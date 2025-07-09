import { z } from "zod";
import { validateBody } from "./validate";

// Schemas
const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1, "Comment is required"),
});
export type CreateReview = z.infer<typeof createReviewSchema>;

const updateReviewSchema = z
  .object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().min(1, "Comment cannot be empty").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
    path: [],
  });
export type UpdateReview = z.infer<typeof updateReviewSchema>;

// Exported middleware
export const validateCreateReview = validateBody(createReviewSchema);
export const validateUpdateReview = validateBody(updateReviewSchema);
