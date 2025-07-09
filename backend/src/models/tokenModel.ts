import { Document, InferSchemaType, Schema, model } from "mongoose";

const TokenSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    tokenVersion: { type: Number, default: 1 },
    ip: { type: String, default: "unknown" },
    userAgent: { type: String, default: "unknown" },
    isValid: { type: Boolean, default: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    role: { type: String },
  },
  {
    timestamps: true,
  },
);

export type TokenDoc = Document & InferSchemaType<typeof TokenSchema>;

const TokenModel = model<TokenDoc>("Token", TokenSchema);
export default TokenModel;
