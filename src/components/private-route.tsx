"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, fetchUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        await fetchUserData();
        if (pathname === "/login") {
          router.replace("/home");
        }
      } catch (error) {
        if (pathname !== "/login") {
          router.replace("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [fetchUserData, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="spinner border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
