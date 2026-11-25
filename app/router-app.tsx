"use client";

import { useState } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "@/router";
import { PublicAcademyContentProvider, type PublicAcademyContent } from "@/context/PublicAcademyContentContext";

export default function RouterApp({
  initialContent,
  serverFetchedFeeds,
}: {
  initialContent: PublicAcademyContent;
  serverFetchedFeeds: string[];
}) {
  const [router] = useState(getRouter);

  return (
    <PublicAcademyContentProvider value={{ initialContent, serverFetchedFeeds }}>
      <RouterProvider router={router} />
    </PublicAcademyContentProvider>
  );
}
