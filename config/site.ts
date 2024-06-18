import { SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Anicode",
  description:
    "Animate code snippets and create beautiful presentations with Anicode.",
  url: site_url,
  ogImage: `${site_url}/og.png`,
  links: {
    twitter: "https://twitter.com/ajmalmohad_",
    github: "https://github.com/ajmalmohad/anicode",
  },
};

export const footerLinks = [
  {
    title: "Product",
    items: [
      { title: "About", href: "#" },
      { title: "Github", href: "#" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
];
