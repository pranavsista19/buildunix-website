"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BrandText from "@/components/BrandText";
import styles from "@/components/SiteHeader.module.css";
import { navLinks, siteMetadata } from "@/lib/site-content";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleMobileNavClick = (event, href) => {
    const isHashLink = href.startsWith("/#");

    if (isHashLink && pathname === "/") {
      event.preventDefault();
      closeMenu();

      const targetId = href.replace("/#", "");

      window.setTimeout(() => {
        const target = document.getElementById(targetId);
        const header = document.querySelector("header");
        const headerHeight = header ? header.getBoundingClientRect().height : 0;

        if (!target) {
          window.location.hash = targetId;
          return;
        }

        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

        window.history.replaceState(null, "", href);
        window.scrollTo({ top, behavior: "smooth" });
      }, 220);

      return;
    }

    closeMenu();

    if (isHashLink && pathname !== "/") {
      event.preventDefault();
      router.push(href);
    }
  };

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
          <span className={styles.brandTagline}>{siteMetadata.tagline}</span>
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
        <div className={styles.mobilePanelHeader}>
          <span className={styles.mobilePanelLabel}>Menu</span>
          <button
            type="button"
            className={styles.mobileBackButton}
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <span aria-hidden="true">←</span>
          </button>
        </div>
        <nav className={styles.mobileNav} aria-label="Mobile">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.mobileLink}
              onClick={(event) => handleMobileNavClick(event, item.href)}
            >
              <BrandText text={item.label} />
            </Link>
          ))}
        </nav>
        <div className={styles.mobileCtas}>
          <Link href="/contact" className="button buttonPrimary" onClick={closeMenu}>
            Book a Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
