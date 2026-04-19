"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function SmoothScrollProvider({ children }) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduced-motion");
      return () => document.documentElement.classList.remove("reduced-motion");
    }

    document.documentElement.classList.remove("reduced-motion");
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.1
    });

    lenis.on("scroll", ScrollTrigger.update);
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]');

      if (!link) {
        return;
      }

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(target, {
        offset: -96
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [prefersReducedMotion, pathname]);

  return children;
}
