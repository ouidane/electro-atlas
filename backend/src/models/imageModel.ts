import { Schema, InferSchemaType } from "mongoose";

export const ImageSchema = new Schema(
  {
    publicId: { type: String, required: true, trim: true },
    tiny: { type: String, required: true, trim: true },
    medium: { type: String, required: true, trim: true },
    large: { type: String, required: true, trim: true },
  },
  { _id: false },
);
export type ImageType = InferSchemaType<typeof ImageSchema>;
