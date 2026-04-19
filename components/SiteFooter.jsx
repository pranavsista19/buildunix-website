import Link from "next/link";
import BrandText from "@/components/BrandText";
import BrandWordmark from "@/components/BrandWordmark";
import styles from "@/components/SiteFooter.module.css";
import { footerColumns, siteMetadata } from "@/lib/site-content";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="containerWide">
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <img
              src="/brand/buildunix-logo.png"
              alt="BuildUNIX"
              className={styles.logo}
              width="392"
              height="150"
            />
            <p className={styles.tagline}>{siteMetadata.tagline}</p>
            <p className={styles.meta}>Hyderabad, India {"\u00B7"} 2026</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className={styles.linkColumn}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <div className={styles.linkList}>
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("mailto:");

                  return isExternal ? (
                    <a key={link.label} href={link.href} className={styles.footerLink}>
                      <BrandText text={link.label} />
                    </a>
                  ) : (
                    <Link key={link.label} href={link.href} className={styles.footerLink}>
                      <BrandText text={link.label} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomStrip}>
          {"\u00A9"} 2026 <BrandWordmark />. All rights reserved. Built for Indian PMC firms.
        </div>
      </div>
    </footer>
  );
}
