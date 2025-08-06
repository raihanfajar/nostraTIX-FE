"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// FIX 4: Make the response interface more specific
interface ISessionData {
  id: string;
  name: string;
  role: string;
  slug?: string;
  balancePoint?: number;
}

interface IApiResponse {
  data: {
    data: ISessionData;
    message: string;
    status: string;
  };
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, name, role, setAuth } = useAuthStore();
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!accessToken) {
      router.push("/login");
    } else if (!name) {
      const fetchSession = async () => {
        try {
          // FIX 1: Determine the endpoint based on the role
          let endpoint = "/api/auth/session-login-user"; // Default for user/admin
          if (role === "ORGANIZER") {
            endpoint = "/api/auth/session-login-organizer";
          }

          const res: IApiResponse = await axiosInstance.get(endpoint, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const userData = res.data.data;

          // FIX 2: Set the full auth payload to avoid losing data
          setAuth({
            ...userData,
            accessToken: accessToken, // Keep the existing token
          });
        } catch (error) {
          console.error("Session is invalid or expired:", error);
          // Clear auth state on error before redirecting

          let routerpoint = "/login"; // Default for user/admin
          if (role === "USER") {
            routerpoint = "/login";
          }
          useAuthStore.getState().clearAuth();
          router.push(routerpoint);
        }
      };

      fetchSession();
    }
    // FIX 3: Correct the dependency array typos
  }, [isHydrated, accessToken, name, role, router, setAuth]);

  if (!isHydrated) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
