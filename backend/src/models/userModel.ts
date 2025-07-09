import {
  Schema,
  model,
  InferSchemaType,
  HydratedDocument,
  Document,
  Model,
  Aggregate,
} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import Profile, { ProfileDoc } from "./profileModel";
import Cart from "./cartModel";
import Wishlist from "./wishlistModel";
import { ROLE } from "../utils/constants";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface AggregatePaginateModel<T extends Document> extends Model<T> {
  aggregatePaginate<R>(
    query: Aggregate<R>,
    options?: {
      page?: number;
      limit?: number;
      [key: string]: unknown;
    }
  ): Promise<{
    docs: R[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  }>;
}

export type UserDoc = HydratedDocument<InferSchemaType<typeof UserSchema>> & {
  comparePassword(password: string): Promise<boolean>;
  profile?: ProfileDoc;
};

// Create the schema for User
const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.BUYER,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password is too short"],
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (this: UserDoc) {
          return (
            !this.isModified("password") ||
            this.password === this.confirmPassword
          );
        },
        message: "Passwords do not match",
      },
    },
    isVerified: { type: Boolean, default: false },
    verified: { type: Date },
    passwordToken: { type: String },
    passwordTokenExpirationDate: { type: Date },
    passwordTokenRequestHistory: [{ type: Date }],
    verificationToken: { type: String },
    verificationTokenExpirationDate: { type: Date },
    verificationTokenRequestHistory: [{ type: Date }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.plugin(aggregatePaginate);
UserSchema.plugin(mongooseLeanVirtuals);

UserSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

// Pre-save hook for hashing password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 12);
      this.password = hashedPassword;
      this.confirmPassword = undefined;
    } catch (err) {
      return next(err as Error);
    }
  }
  next();
});

// Compare password instance method
UserSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch {
    throw new Error("Password comparison failed");
  }
};

// Cleanup on delete
UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Promise.all([
        Profile.deleteOne({ userId: this._id }),
        Cart.deleteOne({ userId: this._id }),
        Wishlist.deleteOne({ userId: this._id }),
      ]);
      next();
    } catch (err) {
      next(err as Error);
    }
  }
);

const UserModel = model<UserDoc, AggregatePaginateModel<UserDoc>>(
  "User",
  UserSchema
);
export default UserModel;
