"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function SmoothScrollProvider({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Native scroll refresh for ScrollTrigger
    const onScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Anchor click handler — native scrollIntoView
    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const headerH = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
      window.scrollTo({ top, behavior: "smooth" });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [prefersReducedMotion]);

  return children;
}
