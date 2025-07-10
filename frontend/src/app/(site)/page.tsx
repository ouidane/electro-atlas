import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electro Atlas | Modern Electronics E-commerce Platform",
  description: "Welcome to Electro Atlas, your one-stop shop for the latest electronics, gadgets, and accessories. Discover top brands, exclusive deals, and fast shipping.",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
