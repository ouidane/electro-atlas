import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up | Electro Atlas",
  description:
    "Create your Electro Atlas account to enjoy exclusive deals, fast checkout, and order tracking.",
  keywords: [
    "sign up",
    "register",
    "Electro Atlas",
    "create account",
    "exclusive deals",
    "fast checkout",
    "order tracking",
  ],
  openGraph: {
    title: "Sign Up | Electro Atlas",
    description:
      "Join Electro Atlas to unlock exclusive deals, fast checkout, and order tracking.",
    url: "https://electro-atlas.com/signup",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const SignupPage = async () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
