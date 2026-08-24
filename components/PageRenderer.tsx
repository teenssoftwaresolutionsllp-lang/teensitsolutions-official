"use client";

import { useEffect, useRef } from "react";

interface PageRendererProps {
  bodyHtml: string;
  bodyClass: string;
}

export default function PageRenderer({
  bodyHtml,
  bodyClass,
}: PageRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptsRan = useRef(false);

  useEffect(() => {
    // 1. Set body class
    if (bodyClass) {
      document.body.className = bodyClass;
    }

    // 2. Hide preloader immediately
    const hidePreloader = () => {
      const ids = ["ct-loadding", "ct-preloader"];
      const classes = [".ct-loader", ".ct-page-loading-bg", ".preloader"];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
      });
      classes.forEach((cls) => {
        const el = document.querySelector(cls) as HTMLElement;
        if (el) el.style.display = "none";
      });
    };
    hidePreloader();

    // 3. Execute body scripts sequentially
    if (scriptsRan.current) return;
    scriptsRan.current = true;

    const container = containerRef.current;
    if (!container) return;

    const runScripts = async () => {
      await (window as any).__headAssetsReady;
      const scripts = Array.from(container.getElementsByTagName("script"));

      for (const oldScript of scripts) {
        await new Promise<void>((resolve) => {
          const newScript = document.createElement("script");

          // Copy attributes
          for (const attr of Array.from(oldScript.attributes)) {
            newScript.setAttribute(attr.name, attr.value);
          }

          // Copy inline content
          if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
          }

          if (oldScript.parentNode) {
            oldScript.parentNode.replaceChild(newScript, oldScript);
          }

          if (newScript.src) {
            newScript.onload = () => resolve();
            newScript.onerror = () => resolve();
          } else {
            resolve();
          }
        });
      }

      // Trigger jQuery events
      if ((window as any).jQuery) {
        const $ = (window as any).jQuery;
        try {
          $(window).trigger("load");
          $(document).trigger("ready");
          $(window).trigger("resize");
          $(window).trigger("scroll");
        } catch (e) {
          // silent
        }
      }

      hidePreloader();
    };

    // Small delay to let the DOM settle
    requestAnimationFrame(() => {
      runScripts();
    });
  }, [bodyHtml, bodyClass]);

  return (
    <div
      ref={containerRef}
      id="page-content-wrapper"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  );
}
