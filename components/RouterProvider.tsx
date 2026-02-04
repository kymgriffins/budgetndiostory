"use client";

import { router } from "@/lib/router";
import { RouterProvider as TanStackRouterProvider } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function RouterProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render router provider during SSR to avoid hydration mismatches
  if (!isMounted) {
    return null;
  }

  return <TanStackRouterProvider router={router} />;
}
