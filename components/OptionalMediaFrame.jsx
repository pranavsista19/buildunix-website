"use client";

import { useState } from "react";
import styles from "@/components/OptionalMediaFrame.module.css";

export default function OptionalMediaFrame({
  src,
  alt,
  eyebrow,
  title,
  description,
  ratio = "4 / 3",
  variant = "light",
  className = ""
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`${styles.frame} ${className}`}
      data-variant={variant}
      style={{ aspectRatio: ratio }}
    >
      <div className={styles.placeholder}>
        <span className={styles.placeholderEyebrow}>{eyebrow}</span>
        <strong className={styles.placeholderTitle}>{title}</strong>
        <p className={styles.placeholderDescription}>{description}</p>
      </div>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width="800"
          height="600"
          className={`${styles.image} ${loaded ? styles.imageLoaded : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
