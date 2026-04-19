"use client";

import { useEffect, useState } from "react";
import styles from "@/components/HeroMorph.module.css";
import { heroContent } from "@/lib/site-content";

const HOLD_DELAY = 3000;
const OUT_DURATION = 360;
const IN_DURATION = 800;

export default function HeroMorph() {
  const [currentText, setCurrentText] = useState(heroContent.initialHeadlineTail);
  const [mode, setMode] = useState("idle");

  useEffect(() => {
    let isActive = true;
    const timerIds = [];

    const wait = (delay) =>
      new Promise((resolve) => {
        const timerId = window.setTimeout(resolve, delay);
        timerIds.push(timerId);
      });

    const runLoop = async () => {
      let showingInitial = true;

      while (isActive) {
        setCurrentText(
          showingInitial
            ? heroContent.initialHeadlineTail
            : heroContent.finalHeadlineTail
        );
        setMode("idle");

        await wait(HOLD_DELAY);
        if (!isActive) {
          break;
        }

        setMode("out");

        await wait(OUT_DURATION);
        if (!isActive) {
          break;
        }

        showingInitial = !showingInitial;
        setCurrentText(
          showingInitial
            ? heroContent.initialHeadlineTail
            : heroContent.finalHeadlineTail
        );
        setMode("in");

        await wait(IN_DURATION);
        if (!isActive) {
          break;
        }

        setMode("idle");
      }
    };

    runLoop();

    return () => {
      isActive = false;
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  return (
    <span
      className={`${styles.line} ${currentText === heroContent.initialHeadlineTail ? styles.initial : styles.final} ${mode === "out" ? styles.outgoing : ""} ${mode === "in" ? styles.incoming : ""}`}
      aria-label={`${heroContent.headlineLead} ${currentText}`}
    >
      {currentText.split(" ").map((word, wordIndex) => (
        <span
          key={`${currentText}-${word}-${wordIndex}`}
          className={styles.word}
          aria-hidden="true"
        >
          {(word === "BuildUNIX" || word === "BuildUnix"
            ? [
                { value: "Build", className: "" },
                { value: "UNIX", className: styles.unixCharacter }
              ]
            : [{ value: word, className: "" }]
          ).map((segment, segmentIndex) =>
            segment.value.split("").map((character, characterIndex) => (
              <span
                key={`${currentText}-${word}-${segmentIndex}-${characterIndex}`}
                className={`${styles.character} ${segment.className}`}
                style={{ "--char-index": wordIndex * 12 + segmentIndex * 5 + characterIndex }}
              >
                {character}
              </span>
            ))
          )}
        </span>
      ))}
    </span>
  );
}
