import type { MetadataRoute } from "next";
import { getWritingSlugs } from "@/data/writing";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/projects/averqen",
    "/projects/atlascore",
    "/projects/vaanidesk",
    "/about",
    "/writing",
    ...getWritingSlugs().map((slug) => `/writing/${slug}`),
    "/contact",
    "/resume",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route.startsWith("/projects/")
          ? 0.9
          : route.startsWith("/writing/")
            ? 0.75
            : 0.7,
  }));
}
