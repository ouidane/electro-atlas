import { Schema, model, InferSchemaType, Document } from "mongoose";
import { CITIES, COUNTRIES } from "../utils/constants";

const ProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    familyName: { type: String, trim: true, lowercase: true },
    givenName: { type: String, trim: true, lowercase: true },
    fullName: { type: String },
    phone: { type: String, trim: true },
    address: {
      line1: { type: String, trim: true, maxlength: 100 },
      line2: { type: String, trim: true, maxlength: 100 },
      city: { type: String, enum: Object.values(CITIES) },
      country: { type: String, enum: Object.values(COUNTRIES) },
      postalCode: { type: String, trim: true, maxlength: 20 },
    },
  },
  {
    timestamps: true,
  },
);

// Automatically set fullName
ProfileSchema.pre("save", function (next) {
  if (this.isModified("givenName") || this.isModified("familyName")) {
    this.fullName = `${this.givenName ?? ""} ${this.familyName ?? ""}`.trim();
  }
  next();
});

// Infer the type from schema
export type ProfileDoc = Document & InferSchemaType<typeof ProfileSchema>;

const Profile = model("Profile", ProfileSchema);
export default Profile;
