import type { PageData } from "@/lib/pages";

/**
 * Server component that renders page-specific <head> styles and links.
 * This ensures CSS is in the initial HTML response (no FOUC).
 */
export default function HeadStyles({ pageData }: { pageData: PageData }) {
  if (!pageData.headStyles || pageData.headStyles.length === 0) return null;

  // Separate CSS (links + styles) from scripts
  const cssTags: string[] = [];
  const scriptTags: string[] = [];

  for (const tag of pageData.headStyles) {
    if (tag.trimStart().startsWith("<script")) {
      scriptTags.push(tag);
    } else {
      cssTags.push(tag);
    }
  }

  // Join all CSS tags into one string for server-side rendering in <head>
  const cssHtml = cssTags.join("\n");

  // Join head script tags - these contain config vars needed by body scripts
  const scriptHtml = scriptTags.join("\n");

  return (
    <>
      <head>
        {/* Render all CSS links and inline styles server-side */}
        <ServerStyles html={cssHtml} />
        {/* Render head config scripts server-side */}
        {scriptHtml && <ServerStyles html={scriptHtml} />}
      </head>
    </>
  );
}

function ServerStyles({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
      style={{ display: "none" }}
    />
  );
}
