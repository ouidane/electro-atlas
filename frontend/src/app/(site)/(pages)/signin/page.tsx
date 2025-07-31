import Signin from "@/components/Auth/Signin";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In | Electro Atlas",
  description:
    "Sign in to your Electro Atlas account to access your orders, wishlist, and personalized recommendations.",
  keywords: [
    "sign in",
    "login",
    "Electro Atlas",
    "account access",
    "user authentication",
    "order tracking",
    "wishlist",
  ],
  openGraph: {
    title: "Sign In | Electro Atlas",
    description:
      "Access your Electro Atlas account to manage orders, wishlist, and personalized recommendations.",
    url: "https://electro-atlas.com/signin",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const SigninPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("jid");

  if (refreshToken) return redirect("/");

  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
