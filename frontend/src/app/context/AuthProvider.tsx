"use client";

import { refreshAccessToken } from "@/lib/auth";
import { logout, setCredentials } from "@/redux/features/auth/auth-actions";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const data = await refreshAccessToken();
      if (!data?.accessToken) {
        dispatch(logout());
        return;
      }

      try {
        // Decode access token payload to get user data
        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));

        if (!payload?.sub || !payload?.role) {
          throw new Error("Invalid token payload");
        }

        dispatch(
          setCredentials({
            accessToken: data.accessToken,
            // user: { id: payload.sub, role: payload.role },
          })
        );
      } catch (err) {
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
}
