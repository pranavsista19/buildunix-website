"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import styles from "@/components/SiteHeader.module.css";
import { navLinks } from "@/lib/site-content";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dispMapUrl, setDispMapUrl] = useState("");
  const [shrunk, setShrunk] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [hoverBounds, setHoverBounds] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Generate displacement map for Liquid Glass refraction
    const width = 1200; // Generate a wide enough map
    const height = 100;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = (x / width) * 2 - 1;
        const ny = (y / height) * 2 - 1;
        const edgeDist = Math.max(Math.abs(nx), Math.abs(ny));
        const edgeFalloff = Math.pow(edgeDist, 2.5);
        const dispX = nx * edgeFalloff;
        const dispY = ny * edgeFalloff;
        const r = Math.round(128 + dispX * 80);
        const g = Math.round(128 + dispY * 80);
        const i = (y * width + x) * 4;
        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = 128;
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    setDispMapUrl(canvas.toDataURL("image/png"));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("bx-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingDown = currentScrollY > lastScrollY;
          
          if (currentScrollY > 40) {
            setScrolled(true);
            if (scrollingDown) {
              setShrunk(true);
            } else {
              setShrunk(false);
            }
          } else {
            setScrolled(false);
            setShrunk(false);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Detect Safari/Firefox to apply fallback if SVG backdrop-filter is unsupported
    const testEl = document.createElement("div");
    testEl.style.cssText = "backdrop-filter: url(#test)";
    const supportsAdvancedGlass = testEl.style.backdropFilter !== "";
    if (!supportsAdvancedGlass) {
      document.documentElement.classList.add("glass-fallback");
    }
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("bx-theme", next);
  };

  const closeMenu = () => setMenuOpen(false);

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
        if (!target) { window.location.hash = targetId; return; }
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
        window.history.replaceState(null, "", href);
        window.scrollTo({ top, behavior: "smooth" });
      }, 220);
      return;
    }
    closeMenu();
    if (isHashLink && pathname !== "/") { event.preventDefault(); router.push(href); }
  };

  const handleMouseEnter = (e) => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = e.currentTarget.getBoundingClientRect();
    
    const verticalPadding = 8;
    const horizontalPadding = 16;
    
    setHoverBounds({
      left: linkRect.left - navRect.left - horizontalPadding, 
      width: linkRect.width + (horizontalPadding * 2),
      top: (linkRect.top - navRect.top) - verticalPadding,
      height: linkRect.height + (verticalPadding * 2)
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${shrunk ? styles.shrunk : ""}`}>
      {/* Layer 1: SVG filter definition (hidden) */}
      <svg className={styles.glassFilters} aria-hidden="true">
        <defs>
          <filter id="liquid-glass-nav" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feImage id="displacement-map" href={dispMapUrl} result="dispMap" />
            <feDisplacementMap in="SourceGraphic" in2="dispMap" scale="18" xChannelSelector="R" yChannelSelector="G" result="refracted" />
            <feGaussianBlur in="refracted" stdDeviation="12" result="blurred" />
            <feSpecularLighting in="dispMap" surfaceScale="4" specularConstant="0.8" specularExponent="20" result="specular">
              <feDistantLight azimuth="315" elevation="60" />
            </feSpecularLighting>
            <feComposite in="specular" in2="blurred" operator="over" result="combined" />
            <feComposite in="combined" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Glass Layers */}
      <div className={styles.glassRefractionLayer}></div>
      <div className={styles.glassTintLayer}></div>
      <div className={styles.glassSpecularLayer}></div>
      <div className={styles.glassBorderLayer}></div>

      {/* Content Layer */}
      <div className={styles.navContent}>
        <div className={`containerWide ${styles.inner}`}>
          <div className={styles.logo} aria-label="BuildUNIX">
            <img src="/brand/buildunix-logo 2.svg" alt="BuildUNIX" className={styles.brandLogoImg} />
          </div>

          <nav className={styles.desktopNav} aria-label="Primary" ref={navRef} onMouseLeave={handleMouseLeave}>
            {/* Sliding Liquid Glass Bubble */}
            <div 
              className={`${styles.navHoverBubble} ${isHovering ? styles.bubbleActive : ""}`} 
              style={
                hoverBounds 
                  ? { left: hoverBounds.left, width: hoverBounds.width, top: hoverBounds.top, height: hoverBounds.height } 
                  : {}
              } 
            />

            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? styles.navLinkActive : ""}`}
                onMouseEnter={handleMouseEnter}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.headerCta}>
              Book a pilot <span className={styles.headerCtaArrow}>&rarr;</span>
            </Link>
            <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((c) => !c)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-navigation" className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`}>
        <div className={styles.mobilePanelHeader}>
          <span className={styles.mobilePanelLabel}>Menu</span>
          <button type="button" className={styles.mobileBackButton} aria-label="Close navigation menu" onClick={closeMenu}>
            <span aria-hidden="true">←</span>
          </button>
        </div>
        <nav className={styles.mobileNav} aria-label="Mobile">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className={styles.mobileLink} onClick={(event) => handleMobileNavClick(event, item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileCtas}>
          <Link href="/contact" className="button buttonPrimary" onClick={closeMenu}>
            Book a pilot
          </Link>
          <button className={styles.mobileThemeToggle} onClick={toggleTheme}>
            {theme === "dark" ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>
      </div>
    </header>
  );
}
