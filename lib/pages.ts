import fs from "fs";
import path from "path";

export interface ScriptItem {
  src: string | null;
  content: string;
  type?: string;
}

export interface PageData {
  route: string;
  slugKey: string;
  relPath: string;
  title: string;
  description: string;
  bodyClass: string;
  headStyles: string[];
  bodyHtml: string;
  scripts?: ScriptItem[];
}

export interface RouteIndexItem {
  route: string;
  slugKey: string;
  title: string;
  description: string;
  relPath: string;
}

export function routeToSlugKey(route: string): string {
  if (route === "/" || route === "") return "__home__";
  if (route === "/404") return "__404__";
  return route.replace(/^\//, "").replace(/\//g, "___");
}

export function getAllRoutes(): RouteIndexItem[] {
  try {
    const routesPath = path.join(process.cwd(), "data", "routes.json");
    if (!fs.existsSync(routesPath)) return [];
    const content = fs.readFileSync(routesPath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading routes.json:", err);
    return [];
  }
}

export function getPageData(route: string): PageData | null {
  try {
    const slugKey = routeToSlugKey(route);
    const filePath = path.join(process.cwd(), "data", "pages", `${slugKey}.json`);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading page data for route ${route}:`, err);
    return null;
  }
}
