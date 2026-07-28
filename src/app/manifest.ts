import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio Kova",
    short_name: "Kova",
    description:
      "Architecture, interiors, visualization, documentation, and making held as one continuous practice.",
    start_url: "/uk",
    display: "standalone",
    background_color: "#f0ede5",
    theme_color: "#181613",
  };
}
