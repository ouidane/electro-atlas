import React from "react";
import MailSuccess from "@/components/MailSuccess";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mail Sent Successfully | Electro Atlas",
  description:
    "Your email was sent successfully. Thank you for contacting Electro Atlas!",
  keywords: [
    "mail sent",
    "email success",
    "Electro Atlas",
    "contact confirmation",
    "support",
  ],
  openGraph: {
    title: "Mail Sent Successfully | Electro Atlas",
    description:
      "Your email was sent successfully. Thank you for contacting Electro Atlas!",
    url: "https://electro-atlas.com/mail-success",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess />
    </main>
  );
};

export default MailSuccessPage;
