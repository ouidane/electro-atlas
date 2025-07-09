import { z } from "zod";
import { createObjectIdSchema, validateBody } from "./validate";

const addItemWishlistSchema = z.object({
  productId: createObjectIdSchema("Invalid product ID"),
});
export type AddItemWishlist = z.infer<typeof addItemWishlistSchema>;

export const validateAddItem = validateBody(addItemWishlistSchema);
