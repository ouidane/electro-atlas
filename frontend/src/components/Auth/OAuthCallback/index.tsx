"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const OAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      window.location.href = "/";
    } else {
      setError("Missing access token in callback URL.");
      setLoading(false);
      router.replace("/signin");
    }
  }, [router, searchParams]);

  if (loading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium">Signing you in...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium text-red-600">{error}</div>
      </div>
    );
  }

  return null;
};

export default OAuthCallback;
