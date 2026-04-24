import Link from "next/link";
import styles from "@/components/SiteFooter.module.css";
import { footerColumns, siteMetadata } from "@/lib/site-content";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="containerWide">
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <div className={styles.logo} aria-label="BuildUNIX">
              <img
                src="/brand/buildunix-logo 2.svg"
                alt="BuildUNIX"
                className={styles.brandLogoImg}
              />
            </div>
            <p className={styles.tagline}>{siteMetadata.tagline}</p>
            <p className={styles.meta}>Hyderabad, India · 2026</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className={styles.linkColumn}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <div className={styles.linkList}>
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("mailto:");
                  return isExternal ? (
                    <a key={link.label} href={link.href} className={styles.footerLink}>{link.label}</a>
                  ) : (
                    <Link key={link.label} href={link.href} className={styles.footerLink}>{link.label}</Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomStrip}>
          <div>© 2026 BUILDUNIX · DIGITIZING CONSTRUCTION EXECUTION</div>
        </div>
      </div>
    </footer>
  );
}
