import type { MetadataRoute } from "next";
import { ORGANIZATION } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ORGANIZATION.name,
    short_name: ORGANIZATION.name,
    description: "Tech You Trust — Web, Mobile & Brand solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#03080e",
    theme_color: "#03080e",
    icons: [
      {
        src: "/genitech-icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/genitech-icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
