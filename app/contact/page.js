import ContactExperience from "@/components/contact/ContactExperience";
import { siteMetadata } from "@/lib/site-content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteMetadata.contactTitle,
  description: siteMetadata.contactDescription,
  path: "/contact"
});

export default function ContactPage() {
  return <ContactExperience />;
}
