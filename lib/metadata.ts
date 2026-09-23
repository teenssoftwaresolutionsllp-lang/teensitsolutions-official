import type { Metadata } from "next";
import type { PageData } from "@/lib/pages";

const siteName = "Teens Software Solutions";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.teensitsolutions.com";
const socialImage = "/wp-content/uploads/2021/09/TEENS-LOGO-new.png";

function getDescription(pageData: PageData): string {
  if (pageData.metaDescription?.trim()) {
    return pageData.metaDescription.trim();
  }
  if (pageData.description.trim()) return pageData.description.trim();
  const pageName = pageData.title
    .replace(/\s*[–-]\s*Teens Software Solutions\s*$/i, "")
    .trim();

  return `${pageName} from ${siteName}. Explore our IT consulting, software development, digital marketing, cybersecurity, and business technology solutions.`;
}

export function createPageMetadata(pageData: PageData): Metadata {
  const description = getDescription(pageData);
  const title = pageData.metaTitle?.trim() || pageData.title;
  const keywords = [
    "Teens Software Solutions",
    ...(pageData.route === "/"
      ? [
          "IT company in Hyderabad",
          "Software company in Hyderabad",
          "Software development company in Hyderabad",
          "IT company in Madhapur",
          "Web development company in Hyderabad",
          "Mobile app development company in Hyderabad",
          "Ecommerce development company in Hyderabad",
          "Digital marketing company in Hyderabad",
          "SEO company in Hyderabad",
          "Cybersecurity company in Hyderabad",
          "IT outsourcing company in Hyderabad",
          "IT services in Hyderabad",
          "Custom software development Hyderabad",
          "Software developers in Hyderabad",
          "Software solutions company in Hyderabad",
          "Custom software development company in Hyderabad",
          "Best software development company in Madhapur",
          "Mobile app development services in Hyderabad",
          "Web development services in Madhapur Hyderabad",
          "Custom ecommerce development company Hyderabad",
        ]
      : [
          "IT consulting",
          "software development",
          "digital marketing",
          "cybersecurity services",
        ]),
    pageData.focusKeyword,
    title,
  ].filter((keyword): keyword is string => Boolean(keyword));
  const isNotFound = pageData.route === "/404";
  const canonical =
    pageData.route === "/" ? siteUrl : `${siteUrl}${pageData.route}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: isNotFound
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      type: "website",
      locale: "en_US",
      images: [{ url: socialImage, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}