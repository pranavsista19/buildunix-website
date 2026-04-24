"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/components/Reveal.module.css";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  duration = 1,
  start = "top 86%",
  x = 0,
  y = 40,
  scale = 1,
  rotate = 0,
  once = true
}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    if (prefersReducedMotion) {
      ref.current.style.opacity = "1";
      ref.current.style.transform = "none";
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const element = ref.current;

    gsap.set(element, {
      autoAlpha: 0,
      x,
      y,
      scale,
      rotate
    });

    const tween = gsap.to(element, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      duration,
      delay,
      ease: "power4.out",
      onComplete: () => {
        element.style.willChange = "auto";
      }
    });

    tween.pause(0);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once,
      onEnter: () => {
        element.style.willChange = "transform, opacity";
        tween.play(0);
      }
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [delay, duration, once, prefersReducedMotion, rotate, scale, start, x, y]);

  return (
    <Tag ref={ref} className={`${styles.reveal} ${className}`}>
      {children}
    </Tag>
  );
}
