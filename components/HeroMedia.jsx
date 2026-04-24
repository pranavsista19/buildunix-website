"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/HeroMedia.module.css";

export default function HeroMedia() {
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mediaQuery.matches);

    syncMotion();
    mediaQuery.addEventListener("change", syncMotion);

    return () => mediaQuery.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(mediaQuery.matches);

    syncMobile();
    mediaQuery.addEventListener("change", syncMobile);

    return () => mediaQuery.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || reducedMotion || videoFailed) {
      return undefined;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = isMobile ? "metadata" : "auto";
    video.load();

    const startPlayback = () => {
      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    startPlayback();

    video.addEventListener("canplay", startPlayback);

    return () => {
      video.removeEventListener("canplay", startPlayback);
    };
  }, [isMobile, reducedMotion, videoFailed]);

  return (
    <div className={styles.media} data-hero-media>
      {!reducedMotion && !videoFailed ? (
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "metadata" : "auto"}
          poster="/media/hero/buildunix-hero-poster-opt.webp"
          onError={() => {
            setVideoFailed(true);
          }}
          aria-hidden="true"
        >
          <source src="/media/hero/buildunix-hero.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div className={styles.poster} aria-hidden="true" />
      <div className={styles.structureGlow} aria-hidden="true" />
      <div className={styles.structureGrid} aria-hidden="true" />
      <div className={styles.texture} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />
    </div>
  );
}
