import Contact from "@/components/Contact";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us | Electro Atlas",
  description:
    "Get in touch with Electro Atlas for support, inquiries, or feedback. We're here to help!",
  keywords: [
    "contact",
    "support",
    "customer service",
    "Electro Atlas",
    "inquiries",
    "feedback",
  ],
  openGraph: {
    title: "Contact Us | Electro Atlas",
    description:
      "Get in touch with Electro Atlas for support, inquiries, or feedback.",
    url: "https://electro-atlas.com/contact",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
