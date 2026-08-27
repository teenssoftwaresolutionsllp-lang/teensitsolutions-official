import type { Metadata } from "next";
import type { PageData } from "@/lib/pages";

const siteName = "Teens Software Solutions";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.teensitsolutions.com";
const socialImage = "/wp-content/uploads/2021/09/TEENS-LOGO-new.png";

function getDescription(pageData: PageData): string {
  if (pageData.description.trim()) return pageData.description.trim();

  const pageName = pageData.title
    .replace(/\s*[–-]\s*Teens Software Solutions\s*$/i, "")
    .trim();

  return `${pageName} from ${siteName}. Explore our IT consulting, software development, digital marketing, cybersecurity, and business technology solutions.`;
}

export function createPageMetadata(pageData: PageData): Metadata {
  const description = getDescription(pageData);
  const isNotFound = pageData.route === "/404";
  const canonical =
    pageData.route === "/" ? siteUrl : `${siteUrl}${pageData.route}`;

  return {
    title: pageData.title,
    description,
    keywords: [
      "Teens Software Solutions",
      "IT consulting",
      "software development",
      "digital marketing",
      "cybersecurity services",
      pageData.title,
    ],
    alternates: {
      canonical,
    },
    robots: isNotFound
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: pageData.title,
      description,
      url: canonical,
      siteName,
      type: "website",
      locale: "en_US",
      images: [{ url: socialImage, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.title,
      description,
      images: [socialImage],
    },
  };
}