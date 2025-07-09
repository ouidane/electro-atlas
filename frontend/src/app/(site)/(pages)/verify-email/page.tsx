"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const emailSchema = z.string().email({ message: "Invalid email address" });
const verifyEmailSchema = z.object({
  email: emailSchema,
  verificationCode: z.string().length(6, "Token is required!"),
});
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

const VerifyEmailPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
  });
  const [success, setSuccess] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: VerifyEmailSchema) => {
    setSuccess(null);
    setServerError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-email/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 204) {
        setSuccess("Email verified successfully! You can now sign in.");
        reset();
        setTimeout(() => router.push("/signin"), 2000);
      } else if (res.status === 400) {
        const err = await res.json();
        setServerError(err.message || "Invalid input. Please check your details.");
      } else if (res.status === 401) {
        const err = await res.json();
        setServerError(err.message || "Unauthorized or expired token.");
      } else if (res.status === 404) {
        const err = await res.json();
        setServerError(err.message || "Verification request not found.");
      } else {
        setServerError("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      setServerError("Network error. Please try again later.");
    }
  };

  return (
    <section className="overflow-hidden py-20 bg-gray-2 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-[400px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
        <h2 className="font-semibold text-xl sm:text-2xl text-dark mb-4 text-center">Verify Your Email</h2>
        <p className="mb-6 text-center text-gray-600">Enter your email and the 6-digit verification code sent to you.</p>
        {success && <div className="mb-4 text-green-600 text-center font-medium">{success}</div>}
        {serverError && <div className="mb-4 text-red-600 text-center font-medium">{serverError}</div>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2.5">Email Address <span className="text-red">*</span></label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email address"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && <p className="text-red text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="verificationCode" className="block mb-2.5">Verification Code <span className="text-red">*</span></label>
            <Input
              type="text"
              id="verificationCode"
              placeholder="Enter 6-digit code"
              maxLength={6}
              autoComplete="one-time-code"
              {...register("verificationCode")}
            />
            {errors.verificationCode && <p className="text-red text-sm mt-1">{errors.verificationCode.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default VerifyEmailPage; 