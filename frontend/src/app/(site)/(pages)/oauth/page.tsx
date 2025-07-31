import { redirect } from "next/navigation";

const OAuthCallbackPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const accessToken = (await searchParams).token;

  if (accessToken) {
    redirect("/");
  } else {
    redirect("/");
  }
};

export default OAuthCallbackPage;
