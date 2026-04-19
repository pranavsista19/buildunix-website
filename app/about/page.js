import AboutExperience from "@/components/about/AboutExperience";
import { siteMetadata } from "@/lib/site-content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteMetadata.aboutTitle,
  description: siteMetadata.aboutDescription,
  path: "/about"
});

export default function AboutPage() {
  return <AboutExperience />;
}
