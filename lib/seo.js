import { companyEmail, siteMetadata, siteUrl } from "@/lib/site-content";

export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteMetadata.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: "/og/buildunix-og.svg",
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
}

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteMetadata.name,
  description: siteMetadata.homeDescription,
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, Android, Web",
  offers: {
    "@type": "Offer",
    price: "Contact for pricing",
    priceCurrency: "INR"
  },
  url: siteUrl,
  email: companyEmail
};
