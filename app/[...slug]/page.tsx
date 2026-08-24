import type { Metadata } from "next";
import { getPageData } from "@/lib/pages";
import HeadInjector from "@/components/HeadInjector";
import PageRenderer from "@/components/PageRenderer";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = "/" + slug.join("/");
  const pageData = getPageData(route);

  if (!pageData) {
    return { title: "Page Not Found – Teens Software Solutions" };
  }

  return {
    title: pageData.title,
    description:
      pageData.description || `${pageData.title} - Teens Software Solutions`,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const route = "/" + slug.join("/");
  const pageData = getPageData(route);

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <HeadInjector pageData={pageData} />
      <PageRenderer
        bodyHtml={pageData.bodyHtml}
        bodyClass={pageData.bodyClass}
      />
    </>
  );
}
