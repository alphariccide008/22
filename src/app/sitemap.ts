import type { MetadataRoute } from "next";
import { solutions } from "@/content/solutions";
import { posts } from "@/content/blog";
import { legalDocs } from "@/content/legal";

const base = "https://sabiocast.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/pricing",
    "/about",
    "/contact",
    "/faq",
    "/jobs",
    "/free-trial",
    "/blog",
    "/demos",
    "/player",
    "/docs",
    "/adaptive-bitrate-streaming",
    "/premium-support",
    "/managed-service",
    "/platforms/enterprise",
    "/platforms/webinar",
    "/platforms/learning",
  ];

  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, lastModified: new Date() })),
    ...solutions.map((s) => ({ url: `${base}/solutions/${s.slug}`, lastModified: new Date() })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) })),
    ...legalDocs.map((d) => ({ url: `${base}/legal/${d.slug}`, lastModified: new Date() })),
  ];
}
