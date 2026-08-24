import { getPageData } from "@/lib/pages";
import PageRenderer from "@/components/PageRenderer";

export default function NotFoundPage() {
  const pageData = getPageData("/404");
  if (pageData) {
    return <PageRenderer pageData={pageData} />;
  }

  return (
    <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "sans-serif" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ color: "#0066cc", textDecoration: "underline" }}>Return Home</a>
    </div>
  );
}
