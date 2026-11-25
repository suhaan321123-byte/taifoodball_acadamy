import { galleryItemToImages, postToNewsItem, reviewToTestimonial } from "@/api/businessWebsite/publicContentApi";
import type { PublicAcademyContent } from "@/context/PublicAcademyContentContext";

export type PublicFeed = "news" | "gallery" | "testimonials";

const backendUrl = process.env["NEXT_PUBLIC_BACKEND_URL"] || "";
const accountTypeId = process.env["NEXT_PUBLIC_ACCOUNT_TYPE_ID"] || "";
const siteDomain = process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.taifc.in";

async function fetchFeed(feed: PublicFeed) {
  if (!backendUrl) throw new Error("Public API URL is not configured.");
  const url = new URL(
    feed === "news"
      ? "/business_website/post/get_published_posts"
      : feed === "gallery"
        ? "/business_website/gallery/get_published_gallery"
        : "/business_website/review/get_active_reviews",
    backendUrl,
  );
  if (feed === "testimonials") {
    url.searchParams.set("subdomain", siteDomain);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", "30");
  } else {
    url.searchParams.set("accountTypeId", accountTypeId);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", feed === "news" ? "30" : "60");
  }
  const response = await fetch(url, {
    headers: { "X-domain-name": siteDomain },
    signal: AbortSignal.timeout(6000),
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`Public ${feed} request failed (${response.status}).`);
  const data = await response.json();
  if (feed === "news") {
    if (data?.success === false) throw new Error(data?.message || "Could not load posts.");
    return Array.isArray(data?.posts) ? data.posts.map(postToNewsItem) : [];
  }
  if (feed === "gallery") {
    if (data?.success === false) throw new Error(data?.message || "Could not load gallery.");
    return Array.isArray(data?.galleryItems) ? data.galleryItems.flatMap(galleryItemToImages) : [];
  }
  if (data?.message !== "success") throw new Error(data?.message || "Could not load testimonials.");
  return Array.isArray(data?.reviews) ? data.reviews.map(reviewToTestimonial) : [];
}

export async function getServerPublicContent(feeds: PublicFeed[]) {
  const initialContent: PublicAcademyContent = { news: [], gallery: [], testimonials: [] };
  const fetched: PublicFeed[] = [];
  await Promise.all(feeds.map(async (feed) => {
    try {
      initialContent[feed] = await fetchFeed(feed);
      fetched.push(feed);
    } catch (error) {
      console.error(`Unable to load public ${feed} during server render:`, error);
    }
  }));
  return { initialContent, serverFetchedFeeds: fetched };
}
