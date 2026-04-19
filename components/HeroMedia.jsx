"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/HeroMedia.module.css";

export default function HeroMedia() {
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mediaQuery.matches);

    syncMotion();
    mediaQuery.addEventListener("change", syncMotion);

    return () => mediaQuery.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || reducedMotion || videoFailed) {
      return undefined;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "auto";
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
  }, [reducedMotion, videoFailed]);

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
          preload="auto"
          poster="/media/hero/buildunix-hero-poster.png"
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
