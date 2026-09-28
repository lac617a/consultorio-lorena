import { absoluteUrl, site } from "@/lib/site";

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (!site.isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/q/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
