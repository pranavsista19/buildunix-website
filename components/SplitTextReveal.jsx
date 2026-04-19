"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function SplitTextReveal({
  as: Tag = "h1",
  children,
  className = "",
  delay = 0,
  start = "top 88%",
  type = "words",
  stagger = 0.04,
  yPercent = 110
}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    if (prefersReducedMotion) {
      ref.current.style.opacity = "1";
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    let split;
    let trigger;
    let tween;

    try {
      split = new SplitType(ref.current, {
        types: type
      });

      const targets =
        type.includes("chars") && split.chars.length > 0
          ? split.chars
          : type.includes("lines") && split.lines.length > 0
            ? split.lines
            : split.words;

      if (!targets || targets.length === 0) {
        ref.current.style.opacity = "1";
        return undefined;
      }

      gsap.set(ref.current, { opacity: 1 });
      gsap.set(targets, {
        yPercent,
        opacity: 0,
        rotateX: 14,
        transformOrigin: "0% 100%"
      });

      tween = gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.15,
        delay,
        ease: "power4.out",
        stagger
      });

      tween.pause(0);

      trigger = ScrollTrigger.create({
        trigger: ref.current,
        start,
        once: true,
        onEnter: () => tween.play(0)
      });
    } catch (error) {
      ref.current.style.opacity = "1";
    }

    return () => {
      trigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [delay, prefersReducedMotion, stagger, start, type, yPercent]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
