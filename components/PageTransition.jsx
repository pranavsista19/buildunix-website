"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/PageTransition.module.css";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const initialPath = useRef(pathname);
  const [animate, setAnimate] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [showStage, setShowStage] = useState(false);

  useEffect(() => {
    if (initialPath.current === pathname) {
      return undefined;
    }

    setAnimate(true);
    setShowBar(true);
    setShowStage(true);

    const fadeTimer = window.setTimeout(() => {
      setAnimate(false);
    }, 520);

    const barTimer = window.setTimeout(() => {
      setShowBar(false);
    }, 900);

    const stageTimer = window.setTimeout(() => {
      setShowStage(false);
    }, 640);

    initialPath.current = pathname;

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(barTimer);
      window.clearTimeout(stageTimer);
    };
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden="true"
        className={`${styles.progressBar} ${showBar ? styles.progressBarVisible : ""}`}
      />
      <div
        aria-hidden="true"
        className={`${styles.stageGlow} ${showStage ? styles.stageGlowVisible : ""}`}
      />
      <div key={pathname} className={`${styles.page} ${animate ? styles.pageAnimated : ""}`}>
        {children}
      </div>
    </>
  );
}
