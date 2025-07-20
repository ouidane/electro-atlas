import Signin from "@/components/Auth/Signin";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkServerAuth } from "@/lib/auth-utils";

export const metadata: Metadata = {
  title: "Sign In | Electro Atlas",
  description:
    "Sign in to your Electro Atlas account to access your orders, wishlist, and personalized recommendations.",
};

const SigninPage = async () => {
  const accessToken = await checkServerAuth();

  if (accessToken) {
    redirect("/");
  }

  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
