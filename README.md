# Teens Software Solutions LLP - Next.js Official Website

This is the Next.js version of the Teens Software Solutions website, migrated directly from a static WordPress export.

## Project Structure & Architecture

The project is structured to load pages dynamically using static WordPress template parts with Next.js App Router routing:

1. **Next.js Page Routes**:
   - [`app/page.tsx`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/app/page.tsx): Renders the home page.
   - [`app/[...slug]/page.tsx`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/app/[...slug]/page.tsx): Dynamic catch-all router that handles all other subpages automatically.
   - [`app/not-found.tsx`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/app/not-found.tsx): Custom 404 page handler.

2. **Page Content & Data**:
   - Located in the [`data/pages/`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/data/pages/) folder. This contains individual JSON files for each of the 109 routes, storing page HTML content, specific metadata, body CSS classes, and style tags.
   - [`data/routes.json`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/data/routes.json): The central registry mapping routes to page metadata.

3. **Static Assets**:
   - Located in the [`public/`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/public/) folder (including [`public/wp-content/`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/public/wp-content/) and [`public/wp-includes/`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/public/wp-includes/)). These house all stylesheets, fonts, icons, JavaScript libraries, and theme assets.

4. **Contact Form Submissions Database**:
   - Located in [`data/submissions.json`](file:///c:/Users/Balaji%20Marpally/teensitsolutions-official/data/submissions.json). Local contact form submissions are captured by a route handler and appended here.

---

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Whenever you push something run this command:
npx vercel --prod

The installation **succeeded**. The problem is that PowerShell has not found the npm global binary folder in your **PATH** yet.

First, **close this PowerShell window completely**, open a **new PowerShell**, and run:

```powershell
vercel --version
```

If it still says not recognized, run:

```powershell
npx vercel --version
```

Then you can log in using:

```powershell
npx vercel login
```

For your current project, you can actually use `npx` for everything without fixing PATH:

```powershell
npx vercel login
```

Then:

```powershell
npx vercel
```

### Your first deployment

When it asks:

```text
Set up and deploy? → Y
Which scope? → select prolicious-team
Link to existing project? → 
```

* Select **YES** if your Vercel project already exists under `prolicious-team`
* Select **NO** if you want this command to create the Vercel project

Then for future production updates:

```powershell
npx vercel --prod
```

### If you want to fix `vercel` permanently

Run:

```powershell
npm config get prefix
```

Copy the result. Then add that directory to your Windows **User PATH**, restart PowerShell, and:

```powershell
vercel
```

should work directly.

**For now, don't waste time fixing PATH. Just run:**

```powershell
npx vercel login
```

and continue.
