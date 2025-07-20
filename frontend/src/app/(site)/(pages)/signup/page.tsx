import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkServerAuth } from "@/lib/auth-utils";

export const metadata: Metadata = {
  title: "Sign Up | Electro Atlas",
  description:
    "Create your Electro Atlas account to enjoy exclusive deals, fast checkout, and order tracking.",
};

const SignupPage = async () => {
  const accessToken = await checkServerAuth();

  if (accessToken) {
    redirect("/");
  }

  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
