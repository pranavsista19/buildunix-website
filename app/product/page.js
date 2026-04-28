import ProductExperience from "@/components/product/ProductExperience";
import { siteMetadata } from "@/lib/site-content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product — BuildUNIX Construction Execution Platform",
  description:
    "See how BuildUNIX enforces phase-locked construction sequencing, mandates tamper-proof photo evidence, tracks snags formally, and generates AI daily reports automatically.",
  path: "/product"
});

export default function ProductPage() {
  return <ProductExperience />;
}
