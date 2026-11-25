import axios from "axios";

const api = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BACKEND_URL"] || "",
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    "X-domain-name": process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.taifc.in",
  },
});

const accountTypeId = process.env["NEXT_PUBLIC_ACCOUNT_TYPE_ID"] || "";
const siteDomain = process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.taifc.in";
export const publicContentCachePrefix = `tai-academy-public-content-v1:${accountTypeId}`;

export async function getPublicPosts() {
  const { data } = await api.get("/business_website/post/get_published_posts", {
    params: { accountTypeId, page: 1, limit: 30 },
  });
  if (data?.success === false) throw new Error(data?.message || "Could not load academy posts.");
  return Array.isArray(data?.posts) ? data.posts : [];
}

export async function getPublicGallery() {
  const { data } = await api.get("/business_website/gallery/get_published_gallery", {
    params: { accountTypeId, page: 1, limit: 60 },
  });
  if (data?.success === false) throw new Error(data?.message || "Could not load academy gallery.");
  return Array.isArray(data?.galleryItems) ? data.galleryItems : [];
}

export async function getPublicTestimonials() {
  const { data } = await api.get("/business_website/review/get_active_reviews", {
    params: { subdomain: siteDomain, page: 1, limit: 30 },
  });
  if (data?.message !== "success") throw new Error(data?.message || "Could not load academy testimonials.");
  return Array.isArray(data?.reviews) ? data.reviews : [];
}

export function cleanContent(value: unknown) {
  return String(value || "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])\s*>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function postToNewsItem(post: any) {
  const content = cleanContent(post?.content);
  const image = post?.media?.find((item: any) => item?.type === "image")?.url;
  return {
    slug: post?.slug || post?._id || post?.title || "news",
    category: post?.category || "Academy News",
    date: post?.createdAt
      ? new Date(post.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "",
    title: post?.title || "Academy update",
    excerpt: content.length > 180 ? `${content.slice(0, 177).trim()}...` : content,
    body: content ? content.split(/(?<=[.!?])\s+/).filter(Boolean) : [],
    image: image || "",
  };
}

export function galleryItemToImages(item: any) {
  const media = Array.isArray(item?.media) ? item.media : [];
  return media
    .filter((asset: any) => asset?.type === "image" && asset?.url)
    .map((asset: any, index: number) => ({
      src: asset.url,
      alt: item?.title || item?.description || `Academy gallery image ${index + 1}`,
      category: item?.category || "Academy",
      title: item?.title || "",
    }));
}

export function reviewToTestimonial(review: any) {
  return {
    name: review?.reviewerName || "Academy family",
    role: review?.reviewerTitle || "Student / Parent",
    quote: cleanContent(review?.reviewText),
    rating: Number(review?.rating || 5),
    image: review?.reviewerImage || "",
  };
}
