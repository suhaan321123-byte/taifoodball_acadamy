import { useEffect, useState } from "react";
import { getPublicGallery, getPublicPosts, getPublicTestimonials, galleryItemToImages, postToNewsItem, reviewToTestimonial } from "@/api/businessWebsite/publicContentApi";

type ContentFeed = "news" | "gallery" | "testimonials";

export function usePublicAcademyContent(
  fallbacks: { news: any[]; gallery: any[]; testimonials: any[] },
  feeds: ContentFeed[] = ["news", "gallery", "testimonials"],
) {
  const [content, setContent] = useState(fallbacks);
  const [loading, setLoading] = useState(true);
  const feedKey = feeds.join(",");

  useEffect(() => {
    let active = true;
    const requests = feeds.map((feed) => {
      if (feed === "news") return getPublicPosts();
      if (feed === "gallery") return getPublicGallery();
      return getPublicTestimonials();
    });
    Promise.allSettled(requests).then((results) => {
      if (!active) return;
      setContent((current) => {
        const next = { ...current };
        results.forEach((result, index) => {
          if (result.status !== "fulfilled") return;
          const feed = feeds[index];
          if (feed === "news") next.news = result.value.map(postToNewsItem);
          if (feed === "gallery") next.gallery = result.value.flatMap(galleryItemToImages);
          if (feed === "testimonials") next.testimonials = result.value.map(reviewToTestimonial);
        });
        return next;
      });
      setLoading(false);
    });
    return () => { active = false; };
  }, [feedKey]);

  return { ...content, loading };
}
