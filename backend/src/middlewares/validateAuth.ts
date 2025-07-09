import { z } from "zod";
import { createObjectIdSchema, validateBody } from "./validate";

const emailSchema = z
  .string()
  .min(1, "Email is required!")
  .email("Invalid email!");

const passwordSchema = z
  .string()
  .min(1, "Password is required!")
  .min(8, "Password too short!");

const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required!"),
    wishlist: z
      .array(
        z.object({
          productId: createObjectIdSchema("Invalid product ID"),
        })
      )
      .optional(),
    cartItems: z
      .array(
        z.object({
          quantity: z.number().min(1),
          productId: createObjectIdSchema("Invalid product ID"),
        })
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;

// Login Schema
const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required!"),
});
export type LoginSchema = z.infer<typeof loginSchema>;

// Email Verification Schema
const verifyEmailSchema = z.object({
  email: emailSchema,
  verificationCode: z.string().length(6, "Token is required!"),
});
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

// Forgot Password Schema
const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(1, "Token is required!"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// Export validation middlewares
export const validateRegister = validateBody(registerSchema);
export const validateLogin = validateBody(loginSchema);
export const validateVerifyEmail = validateBody(verifyEmailSchema);
export const validateForgotPassword = validateBody(forgotPasswordSchema);
export const validateResetPassword = validateBody(resetPasswordSchema);
