import HomeExperience from "@/components/home/HomeExperience";
import { siteMetadata } from "@/lib/site-content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteMetadata.homeTitle,
  description: siteMetadata.homeDescription,
  path: "/"
});

export default function HomePage() {
  return <HomeExperience />;
}
