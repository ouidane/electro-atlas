"use client";

import React from "react";
import Error from "@/components/Error";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Server Error | Electro Atlas",
  description:
    "A server error occurred. Please try again later or contact Electro Atlas support for assistance.",
};

const ErrorPage = () => {
  return (
    <main>
      <Error
        statusCode={500}
        title="Something went wrong"
        message="A server error occurred. Please try again later or contact support if the problem persists."
      />
    </main>
  );
};

export default ErrorPage;
