"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/signin", "/signup"];

  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = publicRoutes.includes(pathname);

      if (!isPublicRoute && !isAuthenticated) {
        router.push("/signin");
      } else if (isPublicRoute && isAuthenticated && pathname !== "/") {
        router.push("/");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  if (
    (!isPublicRoute && !isAuthenticated) ||
    (isPublicRoute && isAuthenticated && pathname !== "/")
  ) {
    return null;
  }

  return <>{children}</>;
}
