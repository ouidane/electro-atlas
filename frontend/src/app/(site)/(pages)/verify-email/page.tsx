import VerifyEmail from "@/components/VerifyEmail";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify Your Email | Electro Atlas",
  description:
    "Confirm your email address to activate your Electro Atlas account and access all features.",
  keywords: [
    "verify email",
    "email confirmation",
    "Electro Atlas",
    "account activation",
  ],
  openGraph: {
    title: "Verify Your Email | Electro Atlas",
    description:
      "Confirm your email address to activate your Electro Atlas account.",
    url: "https://electro-atlas.com/verify-email",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const VerifyEmailPage = async () => {
  return (
    <main>
      <VerifyEmail />
    </main>
  );
};

export default VerifyEmailPage;
