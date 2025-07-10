import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In | Electro Atlas",
  description: "Sign in to your Electro Atlas account to access your orders, wishlist, and personalized recommendations.",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
