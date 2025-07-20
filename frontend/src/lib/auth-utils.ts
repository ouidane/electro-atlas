import { cookies } from "next/headers";

export async function checkServerAuth() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("jid");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`,
      {
        method: "GET",
        headers: {
          Cookie: `jid=${refreshToken.value}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.accessToken;
    }
  } catch (error) {
    console.error("Auth check failed:", error);
  }

  return null;
}
