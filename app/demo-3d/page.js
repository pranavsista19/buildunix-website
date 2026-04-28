"use client";

import BuildunixCommunitySection from "@/components/buildunix-community/index";
import Link from "next/link";
import styles from "./demo-3d.module.css";

export default function Demo3DPage() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className="containerWide">
          <Link href="/product" className={styles.backLink}>
            ← Back to Product
          </Link>
          <div className={styles.titleGroup}>
            <span className="sectionLabel">INTERACTIVE DEMO</span>
            <h1 className={styles.title}>3D Community <em>Visualization</em></h1>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <BuildunixCommunitySection />
      </main>

      <footer className={styles.footer}>
        <div className="containerWide">
          <p className={styles.footerText}>
            This is a live interactive visualization of a project under construction. 
            Hover buildings to see real-time data from the BuildUNIX phase template.
          </p>
          <Link href="/contact" className="button buttonPrimary">
            Book a pilot to see more →
          </Link>
        </div>
      </footer>
    </div>
  );
}
