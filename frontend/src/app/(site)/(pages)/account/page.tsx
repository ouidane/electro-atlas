import MyAccount from "@/components/MyAccount";
import React from "react";

import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "My Account | Electro Atlas",
  description:
    "Manage your profile, orders, addresses, and account settings on Electro Atlas.",
  keywords: [
    "my account",
    "profile management",
    "order history",
    "address book",
    "account settings",
    "Electro Atlas",
  ],
  openGraph: {
    title: "My Account | Electro Atlas",
    description:
      "Manage your profile, orders, addresses, and account settings on Electro Atlas.",
    url: "https://electro-atlas.com/account",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const MyAccountPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("jid");

  if (!refreshToken) return redirect("/signin");

  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default MyAccountPage;
