"use client";

import { useState } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "@/router";

export default function RouterApp() {
  const [router] = useState(getRouter);

  return <RouterProvider router={router} />;
}
