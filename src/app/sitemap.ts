import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const SITE_UPDATED = new Date("2026-06-03");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://captas.cl";
  const staticRoutes = ["", "/trabajo", "/estudio", "/servicios", "/contacto"];
  const projectRoutes = projects.map((p) => `/trabajo/${p.slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: SITE_UPDATED,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/trabajo/") ? 0.8 : 0.9,
  }));
}
