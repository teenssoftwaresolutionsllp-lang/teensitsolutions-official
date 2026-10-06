"use client";

import { useEffect, useRef } from "react";

interface PageRendererProps {
  bodyHtml: string;
  bodyClass: string;
  seoContentHtml?: string;
}

const newClientSlides: { name: string; detail: string; image?: string }[] = [
  { name: "Diya soaps", detail: "", image: "/diya.png" },
  { name: "Meat In Minutes", detail: "meat delivery app" },
  { name: "Treeko", detail: "Casting app", image: "/image%20(2).jpg" },
  { name: "VNR Infra", detail: "real estate website" },
  { name: "WINC", detail: "Lottery based SaaS" },
] as const;

function addNewClientSlides(root: HTMLElement) {
  const clientsHeading = Array.from(root.querySelectorAll(".ct-text-inner")).find(
    (heading) => heading.textContent?.trim() === "Our Clients",
  );
  const clientsWidgetWrap = clientsHeading?.closest(".elementor-widget-wrap");
  const carousel = clientsWidgetWrap?.querySelector(
    ".ct-client-carousel1 .ct-slick-carousel",
  ) as HTMLElement | null;

  if (!carousel || carousel.dataset.clientListAdded === "true") return;

  const slideMarkup = newClientSlides
    .map(
      ({ name, detail, image }) => `
          <div class="slick-slide">
            <div class="ct-client--image ">
              <a href="#" style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:90px; font-weight:700; color:#0f2a4d; text-decoration:none; font-size:18px; letter-spacing:0.02em; text-align:center; line-height:1.2;">
                ${image ? `<img src="${image}" alt="${name}" style="display:block; width:auto; max-width:100%; height:84px; object-fit:contain;" />` : ""}
                <span>
                  <span style="display:block;">${name}</span>
                  ${detail ? `<small style="display:block; font-size:11px; font-weight:600; opacity:0.85;">${detail}</small>` : ""}
                </span>
              </a>
            </div>
          </div>
        `,
    )
    .join("");

  const temp = document.createElement("div");
  temp.innerHTML = slideMarkup;

  Array.from(temp.children).forEach((node) => {
    carousel.appendChild(node);
  });

  carousel.dataset.clientListAdded = "true";
}

export default function PageRenderer({
  bodyHtml,
  bodyClass,
  seoContentHtml,
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

    const container = containerRef.current;
    if (!container) return;

    addNewClientSlides(container);

    // 3. Execute body scripts sequentially
    if (scriptsRan.current) return;
    scriptsRan.current = true;

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

  const localAssetHtml = bodyHtml.replace(
    /(?:https?:)?\/\/(?:www\.)?teensitsolutions\.com\/wp-content\//g,
    "/wp-content/",
  );

  const renderedHtml = seoContentHtml
    ? localAssetHtml.replace(
        '<div id="content"',
        `<section class="seo-content" aria-label="Page information">${seoContentHtml}</section><div id="content"`,
      )
    : localAssetHtml;

  return (
    <div
      ref={containerRef}
      id="page-content-wrapper"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
