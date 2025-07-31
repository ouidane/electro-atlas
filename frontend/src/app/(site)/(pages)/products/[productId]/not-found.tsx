import React from "react";
import Error from "@/components/Error";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Not Found | Electro Atlas",
  description:
    "The product you are looking for does not exist or has been removed.",
};

const NotFoundPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default NotFoundPage;
