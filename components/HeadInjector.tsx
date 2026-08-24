"use client";

import { useEffect } from "react";
import type { PageData } from "@/lib/pages";

declare global {
  interface Window {
    __headAssetsReady?: Promise<void>;
  }
}

/**
 * Injects exported WordPress head assets after hydration.
 * React cannot execute scripts supplied through dangerouslySetInnerHTML, and
 * a page component cannot render another <head> inside the document body.
 */
export default function HeadInjector({ pageData }: { pageData: PageData }) {
  useEffect(() => {
    const tags = pageData.headStyles ?? [];
    if (tags.length === 0) return;

    const parser = new DOMParser();
    const nodes = tags.flatMap((tag) => {
      const documentFragment = parser.parseFromString(tag, "text/html");
      return Array.from(documentFragment.head.children);
    });
    const addedNodes: Element[] = [];

    const loadScripts = async () => {
      for (const node of nodes) {
        if (node.tagName.toLowerCase() !== "script") continue;

        const scriptId = node.getAttribute("id");
        const scriptSource = node.getAttribute("src");
        if (
          (scriptId &&
            document.querySelector(`script#${CSS.escape(scriptId)}`)) ||
          (scriptSource &&
            document.querySelector(`script[src="${CSS.escape(scriptSource)}"]`))
        ) {
          continue;
        }

        const script = document.createElement("script");
        for (const attribute of Array.from(node.attributes)) {
          script.setAttribute(attribute.name, attribute.value);
        }
        script.textContent = node.textContent;

        await new Promise<void>((resolve) => {
          script.addEventListener("load", () => resolve(), { once: true });
          script.addEventListener("error", () => resolve(), { once: true });
          document.body.appendChild(script);
          if (!script.src) resolve();
        });
        addedNodes.push(script);
      }
    };

    for (const node of nodes) {
      if (node.tagName.toLowerCase() === "script") continue;
      const asset = document.head.querySelector(
        `[data-exported-asset="${CSS.escape(node.outerHTML)}"]`,
      );
      if (asset) continue;
      const clone = node.cloneNode(true) as HTMLElement;
      clone.setAttribute("data-exported-asset", node.outerHTML);
      document.head.appendChild(clone);
      addedNodes.push(clone);
    }

    window.__headAssetsReady = loadScripts();

    return () => {
      for (const node of addedNodes) node.remove();
      delete window.__headAssetsReady;
    };
  }, [pageData]);

  return null;
}
