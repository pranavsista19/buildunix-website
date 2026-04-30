import { DM_Mono, Epilogue, Syne } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import PageTransition from "@/components/PageTransition";
import ParticlesBackground from "@/components/ParticlesBackground";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { siteMetadata, siteUrl } from "@/lib/site-content";
import { softwareApplicationJsonLd } from "@/lib/seo";

const headingFont = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  preload: true,
  variable: "--font-heading"
});

const bodyFont = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-body"
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
  variable: "--font-mono"
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteMetadata.homeTitle,
  description: siteMetadata.homeDescription,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png"
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteMetadata.homeOgTitle,
    description: siteMetadata.homeOgDescription,
    url: "/",
    siteName: siteMetadata.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${siteUrl}/og/buildunix-og.svg`,
        width: 1200,
        height: 630,
        alt: siteMetadata.homeOgTitle
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF6F1" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0D0B" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="msapplication-TileImage" content="/favicon.png" />
        <link
          rel="preload"
          href="/media/hero/buildunix-hero-poster.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      >
        <a className="skipLink" href="#main-content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationJsonLd)
          }}
        />
        <SmoothScrollProvider>

          <div className="siteShell">
            <SiteHeader />
            <div id="scroll-sentinel" style={{position:"absolute",top:0,height:1,width:"100%",pointerEvents:"none"}} aria-hidden="true" />
            <PageTransition>
              <main id="main-content">{children}</main>
            </PageTransition>
            <SiteFooter />
          </div>
        </SmoothScrollProvider>
        <Script 
          src="https://api.landinghero.ai/public/assistant-widget.js" 
          data-project-id="mDOm7vPZd4sZ5qup3Z88"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}