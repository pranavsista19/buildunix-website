"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandText from "@/components/BrandText";
import styles from "@/components/SiteHeader.module.css";
import { navLinks } from "@/lib/site-content";

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={`containerWide ${styles.inner}`}>
        <div className={styles.brandCluster}>
          <Link className={styles.logoLink} href="/" aria-label="BuildUNIX home">
            <img
              src="/brand/buildunix-logo.png"
              alt="BuildUNIX"
              className={styles.logo}
              width="392"
              height="150"
            />
          </Link>
        </div>

        <div className={styles.navShell}>
          <nav className={styles.desktopNav} aria-label="Primary">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} className={styles.navLink}>
                <BrandText text={item.label} />
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.actions}>
          <Link href="/contact" className="button buttonPrimary">
            Book a Demo
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`}
      >
        <nav className={styles.mobileNav} aria-label="Mobile">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className={styles.mobileLink}>
              <BrandText text={item.label} />
            </Link>
          ))}
        </nav>
        <div className={styles.mobileCtas}>
          <Link href="/contact" className="button buttonPrimary">
            Book a Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
