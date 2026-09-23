import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teens Software Solutions",
  description: "IT Consulting & Digital Transformation Solutions",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.teensitsolutions.com",
  ),
  openGraph: {
    siteName: "Teens Software Solutions",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/ts.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="no-js">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="profile" href="https://gmpg.org/xfn/11" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Roboto:wght@400;500;700&family=Fira+Sans:wght@500;700&display=swap"
        />

        {/* Global Core Libraries */}
        <Script
          id="jquery-core-js"
          src="/wp-includes/js/jquery/jquery.min.js?ver=3.7.1"
          strategy="beforeInteractive"
        />
        <Script
          id="jquery-migrate-js"
          src="/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.4.1"
          strategy="beforeInteractive"
        />
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '924956710682252');
fbq('track', 'PageView');`}
        </Script>
      </head>
      <body>
        {children}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=924956710682252&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
