"use client";

import { useEffect, useRef } from "react";
import type { PageData } from "@/lib/pages";

interface PageRendererProps {
  pageData: PageData;
}

export default function PageRenderer({ pageData }: PageRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Update body class
    if (pageData.bodyClass) {
      document.body.className = pageData.bodyClass;
    } else {
      document.body.removeAttribute("class");
    }

    // 2. Inject page-specific head styles and scripts
    const injectedHeadElements: HTMLElement[] = [];
    if (pageData.headStyles && pageData.headStyles.length > 0) {
      for (const styleStr of pageData.headStyles) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = styleStr;
        const el = tempDiv.firstChild as HTMLElement;
        if (!el) continue;

        const id = el.getAttribute("id");
        const href = el.getAttribute("href");
        const src = el.getAttribute("src");

        // Avoid duplicates
        if (id && document.getElementById(id)) continue;
        if (href && document.querySelector(`link[href="${href}"]`)) continue;
        if (src && document.querySelector(`script[src="${src}"]`)) continue;

        el.setAttribute("data-page-injected", "true");
        document.head.appendChild(el);
        injectedHeadElements.push(el);

        // If it's a head script, we want to execute it if it's inline
        if (el.tagName === "SCRIPT" && !src && el.innerHTML) {
          try {
            const inlineScript = document.createElement("script");
            inlineScript.text = el.innerHTML;
            document.head.appendChild(inlineScript);
            injectedHeadElements.push(inlineScript);
          } catch (e) {
            console.warn("Error running head inline script:", e);
          }
        }
      }
    }

    // 3. Sequential script execution for body scripts
    const container = containerRef.current;
    if (container) {
      const runBodyScripts = async () => {
        const scripts = container.getElementsByTagName("script");
        const scriptsArray = Array.from(scripts);

        for (const oldScript of scriptsArray) {
          await new Promise<void>((resolve) => {
            const newScript = document.createElement("script");

            // Copy all attributes
            for (let i = 0; i < oldScript.attributes.length; i++) {
              const attr = oldScript.attributes[i];
              newScript.setAttribute(attr.name, attr.value);
            }

            // Copy content
            if (oldScript.innerHTML) {
              newScript.innerHTML = oldScript.innerHTML;
            }

            // Replace script to execute it
            if (oldScript.parentNode) {
              oldScript.parentNode.replaceChild(newScript, oldScript);
            }

            if (newScript.src) {
              newScript.onload = () => resolve();
              newScript.onerror = () => resolve();
            } else {
              // Wait brief moment for inline scripts to parse
              setTimeout(() => resolve(), 5);
            }
          });
        }

        // 4. Trigger jQuery events once all scripts have run
        if (typeof window !== "undefined" && (window as any).jQuery) {
          const $ = (window as any).jQuery;
          try {
            $(window).trigger("load");
            $(document).trigger("ready");
            $(window).trigger("resize");
            $(window).trigger("scroll");
            $(".ct-loader").fadeOut("fast");
            $(".ct-page-loading-bg").fadeOut("fast");
            $("#ct-loadding").fadeOut("fast");
          } catch (e) {
            console.warn("jQuery trigger warning:", e);
          }
        }

        // Fallback: hide preloader directly
        const loader = document.getElementById("ct-loadding");
        if (loader) loader.style.display = "none";
        const ctLoader = document.querySelector(".ct-loader") as HTMLElement | null;
        if (ctLoader) ctLoader.style.display = "none";
      };

      // Run scripts after page content is in DOM
      setTimeout(() => {
        runBodyScripts();
      }, 50);
    }

    return () => {
      // Cleanup head elements
      injectedHeadElements.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, [pageData]);

  return (
    <div
      ref={containerRef}
      id="page-content-wrapper"
      dangerouslySetInnerHTML={{ __html: pageData.bodyHtml }}
    />
  );
}
