import type { PageData } from "@/lib/pages";

/**
 * Server component that renders page-specific <head> styles and links.
 * This ensures CSS is in the initial HTML response (no FOUC).
 */
export default function HeadStyles({ pageData }: { pageData: PageData }) {
  if (!pageData.headStyles || pageData.headStyles.length === 0) return null;

  const styleNodes = pageData.headStyles.flatMap((tag, index) => {
    const linkMatch = tag.match(/^\s*<link\s+([^>]+)>/i);
    if (linkMatch) {
      const rel = getAttribute(linkMatch[1], "rel");
      const href = getAttribute(linkMatch[1], "href");
      if (!href || !rel) return [];

      return [
        <link
          key={`${index}-${href}`}
          rel={rel}
          href={href}
          type={getAttribute(linkMatch[1], "type") || undefined}
          media={getAttribute(linkMatch[1], "media") || undefined}
        />,
      ];
    }

    const styleMatch = tag.match(
      /^\s*<style(?:\s[^>]*)?>([\s\S]*?)<\/style>\s*$/i,
    );
    if (!styleMatch) return [];

    return [
      <style
        key={`${index}-style`}
        dangerouslySetInnerHTML={{ __html: styleMatch[1] }}
      />,
    ];
  });

  return <>{styleNodes}</>;
}

function getAttribute(attributes: string, name: string): string | null {
  const match = attributes.match(
    new RegExp(`${name}=["']([^"']*)["']`, "i"),
  );
  return match?.[1] ?? null;
}
