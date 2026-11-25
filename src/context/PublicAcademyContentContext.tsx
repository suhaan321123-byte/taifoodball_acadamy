"use client";

import { createContext, useContext } from "react";

export type PublicAcademyContent = {
  news: any[];
  gallery: any[];
  testimonials: any[];
};

type PublicAcademyContentContextValue = {
  initialContent: PublicAcademyContent;
  serverFetchedFeeds: string[];
};

const PublicAcademyContentContext = createContext<PublicAcademyContentContextValue>({
  initialContent: { news: [], gallery: [], testimonials: [] },
  serverFetchedFeeds: [],
});

export const PublicAcademyContentProvider = PublicAcademyContentContext.Provider;
export const usePublicAcademyContentContext = () => useContext(PublicAcademyContentContext);
