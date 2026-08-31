import type { Metadata } from "next";
import { getPageData } from "@/lib/pages";
import { createPageMetadata } from "@/lib/metadata";
import HeadInjector from "@/components/HeadInjector";
import PageRenderer from "@/components/PageRenderer";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = getPageData("/");
  if (!pageData) return { title: "Teens Software Solutions" };

  return createPageMetadata(pageData);
}

export default async function HomePage() {
  const pageData = getPageData("/");
  if (!pageData) {
    notFound();
  }

  return (
    <>
      <HeadInjector pageData={pageData} />
      <PageRenderer
        bodyHtml={pageData.bodyHtml}
        bodyClass={pageData.bodyClass}
        seoContentHtml={pageData.seoContentHtml}
      />
    </>
  );
}
