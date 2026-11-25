import { useContext, useEffect, useState } from "react";
import {
  galleryItemToImages,
  getPublicGallery,
  getPublicPosts,
  getPublicTestimonials,
  postToNewsItem,
  publicContentCachePrefix,
  reviewToTestimonial,
} from "@/api/businessWebsite/publicContentApi";
import { usePublicAcademyContentContext } from "@/context/PublicAcademyContentContext";

export type ContentFeed = "news" | "gallery" | "testimonials";

function cacheKey(feed: ContentFeed) {
  return `${publicContentCachePrefix}:${feed}`;
}

function readCache(feed: ContentFeed) {
  try {
    const cached = localStorage.getItem(cacheKey(feed));
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    return Array.isArray(parsed?.data) ? parsed.data : null;
  } catch {
    return null;
  }
}

function writeCache(feed: ContentFeed, data: any[]) {
  try {
    localStorage.setItem(cacheKey(feed), JSON.stringify({ data, updatedAt: Date.now() }));
  } catch {
    // Storage can be disabled or full; the live API response still renders.
  }
}

export function usePublicAcademyContent(feeds: ContentFeed[]) {
  const { initialContent, serverFetchedFeeds } = usePublicAcademyContentContext();
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState<Record<ContentFeed, string>>({} as Record<ContentFeed, string>);
  const [loading, setLoading] = useState(feeds.length > 0);
  const feedKey = feeds.join(",");

  useEffect(() => {
    let active = true;
    const feedsToFetch: ContentFeed[] = [];

    for (const feed of feeds) {
      if (serverFetchedFeeds.includes(feed)) {
        writeCache(feed, initialContent[feed]);
        continue;
      }

      const cached = readCache(feed);
      if (cached) {
        setContent((current) => ({ ...current, [feed]: cached }));
      }
      feedsToFetch.push(feed);
    }

    if (feedsToFetch.length === 0) {
      setLoading(false);
      return () => { active = false; };
    }

    Promise.allSettled(feedsToFetch.map((feed) => {
      if (feed === "news") return getPublicPosts().then((items) => items.map(postToNewsItem));
      if (feed === "gallery") return getPublicGallery().then((items) => items.flatMap(galleryItemToImages));
      return getPublicTestimonials().then((items) => items.map(reviewToTestimonial));
    })).then((results) => {
      if (!active) return;
      setContent((current) => {
        const next = { ...current };
        results.forEach((result, index) => {
          const feed = feedsToFetch[index];
          if (result.status !== "fulfilled" || !feed) return;
          next[feed] = result.value;
          writeCache(feed, result.value);
        });
        return next;
      });
      setErrors((current) => {
        const next = { ...current };
        results.forEach((result, index) => {
          const feed = feedsToFetch[index];
          if (!feed) return;
          if (result.status === "rejected") next[feed] = "Unable to load this feed right now.";
          else delete next[feed];
        });
        return next;
      });
      setLoading(false);
    });

    return () => { active = false; };
  }, [feedKey, initialContent, serverFetchedFeeds]);

  return { ...content, errors, loading };
}
