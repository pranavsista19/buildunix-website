"use client";

import Link from "next/link";
import BrandText from "@/components/BrandText";
import PhaseProofCard from "@/components/PhaseProofCard";
import Reveal from "@/components/Reveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import styles from "@/app/about/about.module.css";
import {
  whyBuildUnixFit,
  whyBuildUnixMoat,
  whyBuildUnixReasons,
  whyBuildUnixStats
} from "@/lib/site-content";

import CommunicationComparison from "@/components/about/CommunicationComparison";

export default function AboutExperience() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`containerWide ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className="sectionLabel" data-invert="true">
              <span className="eyebrowRule" aria-hidden="true" />
              <BrandText text="Why BuildUNIX" />
            </span>
            <SplitTextReveal as="h1" className={styles.heroTitle} type="words">
              Built for the projects where execution mistakes are expensive.
            </SplitTextReveal>
            <p className={styles.heroBody}>
              <BrandText text="BuildUNIX replaces verbal approvals, untracked defects, and screenshot-driven updates with hard-gated sequencing, tamper-proof photo evidence, live visibility, and automatic reporting." />
            </p>

          </div>

          <Reveal className={styles.heroShowcase} x={80} y={20}>
            <PhaseProofCard />
          </Reveal>
        </div>
      </section>

      <CommunicationComparison />

      <section className={`section ${styles.reasonsSection}`}>
        <div className={`containerWide ${styles.reasonsGrid}`}>
          <div className={styles.stickyIntro}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              Reasons To Use It
            </span>
            <h2 className="sectionTitle">
              <BrandText text="What changes when the site runs through BuildUNIX." />
            </h2>
            <p className="sectionBody">
              The product is not another dashboard. It is an enforcement layer
              for how PMC-led construction should already operate.
            </p>
          </div>

          <div className={styles.reasonCards}>
            {whyBuildUnixReasons.map((reason, index) => (
              <Reveal
                key={reason.title}
                as="article"
                className={`cardSurface ${styles.reasonCard}`}
                delay={index * 0.06}
                x={index % 2 === 0 ? 46 : -46}
                y={34}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3><BrandText text={reason.title} /></h3>
                <p><BrandText text={reason.body} /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className="containerWide">
          <div className={styles.statsShell}>
            <div className={styles.statsIntro}>
              <span className="sectionLabel">
                <span className="eyebrowRule" aria-hidden="true" />
                Proof Points
              </span>
              <SplitTextReveal as="h2" className={styles.statsTitle} type="words">
                The business case shows up before the project is over.
              </SplitTextReveal>
            </div>

            <div className={styles.statsGrid}>
              {whyBuildUnixStats.map((item, index) => (
                <Reveal key={item.value} className={styles.statCard} delay={index * 0.08}>
                  <strong>{item.value}</strong>
                  <p><BrandText text={item.label} /></p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.fitSection}`}>
        <div className={`containerWide ${styles.fitGrid}`}>
          <Reveal className={styles.fitCopy} x={-60} y={20}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              Best Fit
            </span>
            <SplitTextReveal as="h2" className="sectionTitle" type="words">
              Built for Indian PMC-led construction, not generic task tracking.
            </SplitTextReveal>
          </Reveal>

          <div className={styles.fitCards}>
            {whyBuildUnixFit.map((item, index) => (
              <Reveal key={item.title} className={styles.fitCard} delay={index * 0.09} x={50}>
                <h3><BrandText text={item.title} /></h3>
                <p><BrandText text={item.body} /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.moatSection}`}>
        <div className="containerWide">
          <div className={styles.sectionIntro}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              Why It Sticks
            </span>
            <SplitTextReveal as="h2" className="sectionTitle" type="words">
              More than a dashboard. It becomes the project record.
            </SplitTextReveal>
          </div>

          <div className={styles.moatGrid}>
            {whyBuildUnixMoat.map((item, index) => (
              <Reveal key={item.title} className={styles.moatCard} delay={index * 0.08}>
                <span>0{index + 1}</span>
                <h3><BrandText text={item.title} /></h3>
                <p><BrandText text={item.body} /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
