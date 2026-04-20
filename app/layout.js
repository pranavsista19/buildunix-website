import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import PageTransition from "@/components/PageTransition";
import ParticlesBackground from "@/components/ParticlesBackground";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { siteMetadata, siteUrl } from "@/lib/site-content";
import { softwareApplicationJsonLd } from "@/lib/seo";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-heading"
});

const bodyFont = Manrope({
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
    icon: "/brand/buildunix-icon.png",
    shortcut: "/brand/buildunix-icon.png",
    apple: "/brand/buildunix-icon.png"
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
    <html lang="en">
      <head>
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
          <ParticlesBackground />
          <div className="siteShell">
            <SiteHeader />
            <PageTransition>
              <main id="main-content">{children}</main>
            </PageTransition>
            <SiteFooter />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}