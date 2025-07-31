export async function refreshAccessToken() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}
