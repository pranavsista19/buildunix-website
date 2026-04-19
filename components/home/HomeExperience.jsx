"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrandText from "@/components/BrandText";
import BrandWordmark from "@/components/BrandWordmark";
import CountUp from "@/components/CountUp";
import HeroMedia from "@/components/HeroMedia";
import HeroMorph from "@/components/HeroMorph";
import Reveal from "@/components/Reveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import styles from "@/app/home.module.css";
import {
  featureCards,
  heroContent,
  howItWorksSteps,
  problemStats,
  statBarItems,
  trustColumns
} from "@/lib/site-content";

const heatCells = [
  "approved",
  "approved",
  "uploading",
  "approved",
  "awaiting",
  "approved",
  "locked",
  "snag",
  "approved",
  "approved",
  "approved",
  "uploading",
  "approved",
  "locked",
  "approved",
  "approved",
  "awaiting",
  "approved",
  "snag",
  "locked"
];

const dashboardCells = [
  "approved",
  "approved",
  "approved",
  "uploading",
  "approved",
  "approved",
  "awaiting",
  "locked",
  "snag",
  "approved",
  "approved",
  "approved",
  "approved",
  "uploading",
  "approved",
  "approved",
  "approved",
  "uploading",
  "locked",
  "snag",
  "approved",
  "approved",
  "awaiting",
  "approved",
  "approved",
  "locked",
  "locked",
  "uploading",
  "approved",
  "approved",
  "snag",
  "locked",
  "uploading",
  "approved",
  "locked",
  "locked",
  "approved",
  "uploading",
  "approved",
  "approved",
  "locked",
  "locked",
  "snag",
  "approved",
  "uploading",
  "locked",
  "approved",
  "locked"
];

function FeatureIcon({ icon }) {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true"
  };

  if (icon === "camera") {
    return (
      <svg {...commonProps}>
        <path d="M4 9H20V18.5C20 19.3 19.3 20 18.5 20H5.5C4.7 20 4 19.3 4 18.5V9Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 9L9.6 5.5H14.4L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="14.5" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg {...commonProps}>
        <path d="M12 3.5L18.5 6.2V11.5C18.5 15.4 16 18.5 12 20.5C8 18.5 5.5 15.4 5.5 11.5V6.2L12 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.2 12L11.1 13.8L15 9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "snag") {
    return (
      <svg {...commonProps}>
        <path d="M6 20V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 5.5H18L16 9L18 12.5H7V5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "report") {
    return (
      <svg {...commonProps}>
        <path d="M7 3.5H13.5L18.5 8.5V19C18.5 19.8 17.8 20.5 17 20.5H7C6.2 20.5 5.5 19.8 5.5 19V5C5.5 4.2 6.2 3.5 7 3.5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13.5 3.5V8.5H18.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8.8 12.5H15.2M8.8 16H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "lock") {
    return (
      <svg {...commonProps}>
        <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8.5 10V7.6C8.5 5.7 10 4.2 12 4.2C14 4.2 15.5 5.7 15.5 7.6V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="4" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HeatCell({ status, index, className = "" }) {
  return (
    <span
      className={`${styles.heatCell} ${styles[`heat${status[0].toUpperCase()}${status.slice(1)}`]} ${className}`}
      style={{ "--heat-delay": `${index * 45}ms` }}
    />
  );
}

function HeroPanel({ variant = "default" }) {
  const isProofVariant = variant === "proof";

  return (
    <div className={`${styles.heroPanelWrap} ${isProofVariant ? styles.heroPanelWrapProof : ""}`}>
      <div className={`${styles.heroToast} ${isProofVariant ? styles.heroToastProof : ""}`}>
        <span className="statusDot statusApproved" aria-hidden="true" />
        <div>
          <small>PMC Engineer</small>
          <strong>Slab Layout Approved</strong>
        </div>
      </div>

      <div className={`${styles.heroPanelCard} ${isProofVariant ? styles.heroPanelCardProof : ""}`}>
        <div className={styles.heroPanelHeader}>
          <div>
            <p>Prestige Towers {"\u00B7"} Tower A</p>
            <h3>Real-time Heatmap</h3>
          </div>
          <span>Live Sync</span>
        </div>

        <div className={styles.heroHeatGrid}>
          {heatCells.map((cell, index) => (
            <HeatCell key={`${cell}-${index}`} status={cell} index={index} />
          ))}
        </div>

        <div className={styles.heroPanelRows}>
          <div className={styles.heroPanelRow}>
            <span className="statusDot statusUploading" aria-hidden="true" />
            <span>Column RCC Steel</span>
            <strong>Uploading</strong>
          </div>
          <div className={styles.heroPanelRow}>
            <span className="statusDot statusApproved" aria-hidden="true" />
            <span>Slab Reinforcement</span>
            <strong>Approved</strong>
          </div>
          <div className={`${styles.heroPanelRow} ${styles.heroPanelRowDanger}`}>
            <span className="statusDot statusSnag" aria-hidden="true" />
            <span>Lift Wall Clearance</span>
            <strong>Safety Snag</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowVisual({ step }) {
  if (step.id === "structure") {
    return (
      <div className={styles.structureVisual}>
        {["Project", "Block", "Phase", "Instance", "Subphase"].map((node, index) => (
          <span key={node} style={{ "--node-index": index }}>
            {node}
          </span>
        ))}
      </div>
    );
  }

  if (step.id === "upload") {
    return (
      <div className={styles.phoneVisual}>
        {["Pre", "During", "Post"].map((label, index) => (
          <div key={label} className={styles.phoneSlot}>
            <small>{label} Photo</small>
            <span>{index < 2 ? "\u2713" : "Camera"}</span>
          </div>
        ))}
      </div>
    );
  }

  if (step.id === "verify") {
    return (
      <div className={styles.verifyVisual}>
        <div className={styles.verifyPhoto} />
        <div className={styles.verifyMeta}>
          <span>GPS verified</span>
          <span>PMC identity locked</span>
          <span>UTC timestamp stored</span>
        </div>
        <button type="button">Approve Work</button>
      </div>
    );
  }

  if (step.id === "track") {
    return (
      <div className={styles.trackVisual}>
        {dashboardCells.slice(0, 42).map((cell, index) => (
          <HeatCell key={`${cell}-${index}`} status={cell} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.reportVisual}>
      <div className={styles.reportPage}>
        <span>9:00 PM Report</span>
        <strong>Prestige Towers {"\u00B7"} Daily Site Narrative</strong>
        <div />
        <div />
        <div />
      </div>
      <div className={styles.reportPulse}>AI generated</div>
    </div>
  );
}

function PlatformDashboard() {
  return (
    <div className={styles.platformDashboardShell}>
      <aside className={styles.platformSidebar}>
        <strong><BrandWordmark /></strong>
        {["Dashboard", "Projects", "Phases", "Snags", "Reports"].map((item, index) => (
          <span key={item} className={index === 0 ? styles.platformNavActive : ""}>
            {item}
          </span>
        ))}
      </aside>

      <div className={styles.platformMain}>
        <div className={styles.platformTop}>
          <h3>Prestige Towers {"\u2014"} Overview</h3>
          <span>9:00 PM Report Ready</span>
        </div>

        <div className={styles.platformStats}>
          {[
            ["14", "Active Phases"],
            ["6", "Open Snags"],
            ["87%", "Approved"],
            ["3", "Stalled"]
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.platformHeatmap}>
          {dashboardCells.map((cell, index) => (
            <HeatCell key={`${cell}-${index}`} status={cell} index={index} />
          ))}
          <span className={styles.platformHeatmapNote}>AI report generated at 9 PM</span>
        </div>
      </div>
    </div>
  );
}

function PlatformMobile() {
  return (
    <div className={styles.platformMobileShell}>
      <div className={styles.platformMobileHeader}>
        <h3>Flat Finishing {"\u2014"} A101</h3>
        <span>2 Snags</span>
      </div>

      {["Pre-work", "During work", "Post-work"].map((label, index) => (
        <div key={label} className={styles.platformMobileStage}>
          <small>{label}</small>
          <div className={index === 2 ? styles.platformMobilePending : ""}>
            {index === 2 ? "Tap to capture" : "\u2713"}
          </div>
        </div>
      ))}

      <button type="button">Submit for PMC Verification</button>
      <button type="button">Save Draft</button>
    </div>
  );
}

function BeforeAfterStage() {
  return (
    <div className={styles.cinematicStage}>
      <div className={styles.beforePane}>
        <div className={styles.beforeBubble}>Bhaiya column ka photo bhejo jaldi</div>
        <div className={styles.beforeBubble}>Approved karo, pour ruk gaya hai</div>
        <div className={styles.beforeBubble}>1 missed call at 2:14 AM</div>
      </div>

      <div className={styles.afterPane}>
        <div className={styles.afterCard}>
          <div>
            <h3>Column RCC Steel</h3>
            <span>Approved</span>
          </div>
          <p>Captured 10:45 AM {"\u2713"}</p>
          <p>Verified 1:20 PM {"\u2713"}</p>
          <strong>Jatin (PMC)</strong>
          <i />
        </div>
      </div>

      <div className={styles.cinematicDivider} />
      <div className={styles.cinematicMessage}>
        <h2>Construction communication looks like this.</h2>
        <p><BrandText text="BuildUNIX makes it look like this." /></p>
      </div>
      <div className={styles.cinematicLabels}>
        <span>Before</span>
        <span><BrandWordmark /></span>
      </div>
    </div>
  );
}

export default function HomeExperience() {
  const heroRef = useRef(null);
  const heroCopyRef = useRef(null);
  const workflowRef = useRef(null);
  const proofRef = useRef(null);
  const platformRef = useRef(null);
  const cinematicRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      const stepState = { value: 0 };
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-enter]",
          { autoAlpha: 0, y: 42, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.15,
            stagger: 0.12,
            ease: "power4.out"
          }
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.05
          }
        })
          .to(heroCopyRef.current, { yPercent: -6, autoAlpha: 0.94 }, 0)
          .to("[data-hero-media]", { scale: 1.03 }, 0);

        gsap.fromTo(
          proofRef.current.querySelectorAll("[data-proof-motion]"),
          { autoAlpha: 0, y: 54, rotateX: 8 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.16,
            ease: "power4.out",
            scrollTrigger: {
              trigger: proofRef.current,
              start: "top 72%",
              once: true
            }
          }
        );

        workflowRef.current
          .querySelectorAll("[data-workflow-step]")
          .forEach((step, index) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 58%",
              end: "bottom 48%",
              onEnter: () => {
                stepState.value = index;
                setActiveStep(index);
              },
              onEnterBack: () => {
                stepState.value = index;
                setActiveStep(index);
              }
            });
          });

        gsap.timeline({
          scrollTrigger: {
            trigger: platformRef.current,
            start: "top 72%",
            end: "bottom 55%",
            scrub: 1.2
          }
        })
          .fromTo("[data-platform-dashboard]", { x: -90, rotate: -2, autoAlpha: 0 }, { x: 0, rotate: 0, autoAlpha: 1 }, 0)
          .fromTo("[data-platform-mobile]", { x: 100, y: 60, rotate: 3, autoAlpha: 0 }, { x: 0, y: 0, rotate: 0, autoAlpha: 1 }, 0.08);

        gsap.timeline({
          scrollTrigger: {
            trigger: cinematicRef.current,
            start: "top 74%",
            once: true
          }
        })
          .fromTo(`.${styles.beforePane}`, { xPercent: -18, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 1, ease: "power4.out" }, 0)
          .fromTo(`.${styles.afterPane}`, { xPercent: 18, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 1, ease: "power4.out" }, 0)
          .fromTo(`.${styles.cinematicMessage}`, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85, ease: "power4.out" }, 0.35);
      });

      return () => ctx.revert();
    });

    mm.add("(max-width: 991px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-enter]",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power4.out" }
        );
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <section ref={heroRef} className={styles.hero}>
        <HeroMedia />
        <div className={`containerWide ${styles.heroGrid}`}>
          <div ref={heroCopyRef} className={styles.heroCopy}>
            <div className={styles.heroPilotPill} data-hero-enter>
              <span aria-hidden="true" />
              Live on a {"\u20B9"}1,200 Cr pilot project
            </div>
            <h1 className={styles.heroTitle} data-hero-enter>
              <span>{heroContent.headlineLead}</span>
              <HeroMorph />
            </h1>
            <p className={styles.heroBody} data-hero-enter>
              <BrandText text={heroContent.subheadline} />
            </p>
            <div className={styles.heroActions} data-hero-enter>
              <Link href="/contact" className="button buttonPrimary">
                {heroContent.primaryCta} <span className="buttonArrow">{"\u2192"}</span>
              </Link>
              <a href="#platform" className={styles.heroSecondaryAction}>
                Explore Platform <span className="buttonArrow">{"\u2193"}</span>
              </a>
            </div>
            <div className={styles.heroSignals} data-hero-enter>
              <span><FeatureIcon icon="shield" /> Phase-lock enforcement</span>
              <span><FeatureIcon icon="camera" /> Photo-evidence required</span>
              <span><FeatureIcon icon="heatmap" /> 3-department QC</span>
            </div>
            <p className={styles.heroProof} data-hero-enter>
              <BrandText text={heroContent.proof} />
            </p>
          </div>
        </div>
        <a href="#problem" className={styles.scrollHint}>
          <span aria-hidden="true" />
          <span>Scroll</span>
        </a>
      </section>

      <section ref={proofRef} className={styles.proofSection}>
        <div className={`containerWide ${styles.proofGrid}`}>
          <div className={styles.proofCopy} data-proof-motion>
            <div className={styles.proofPill}>Pilot-backed execution system</div>
            <SplitTextReveal as="h2" className={styles.proofTitle} type="words">
              The Construction OS that enforces quality.
            </SplitTextReveal>
            <p className={styles.proofBody}>
              <BrandText text="BuildUNIX is the phase-locked, photo-verified execution platform for real estate developers, PMCs, and contractors. Every action is timestamped, geo-tagged, and signed off before the next phase can begin." />
            </p>
            <div className={styles.proofActions}>
              <Link href="/contact" className="button buttonPrimary">
                Book a Demo <span className="buttonArrow">{"\u2192"}</span>
              </Link>
              <a href="#how-it-works" className="textCta">
                See how it works
              </a>
            </div>
          </div>
          <div className={styles.proofVisual} data-proof-motion>
            <div className={styles.proofVisualDeck}>
              <div className={styles.proofHeatmapCard}>
                <HeroPanel variant="proof" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className={`section ${styles.problemSection}`}>
        <div className="container">
          <div className={styles.problemIntro}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              The Problem
            </span>
            <SplitTextReveal as="h2" className={styles.problemTitle} type="words">
              Construction is still managed with screenshots, voice notes, and forgotten WhatsApp groups.
            </SplitTextReveal>
          </div>

          <div className={styles.problemGrid}>
            {problemStats.map((stat, index) => (
              <Reveal
                key={stat.value}
                className={`cardSurface ${styles.problemCard}`}
                delay={index * 0.08}
                y={54}
              >
                <h3 className={stat.accent ? styles.problemValueAccent : ""}>{stat.value}</h3>
                <p><BrandText text={stat.label} /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" ref={workflowRef} className={styles.workflowSection}>
        <div className={`containerWide ${styles.workflowIntro}`}>
          <span className="sectionLabel">
            <span className="eyebrowRule" aria-hidden="true" />
            Workflow Execution
          </span>
          <SplitTextReveal as="h2" className={styles.workflowTitle} type="words">
            From chaos to clarity, in five enforced steps.
          </SplitTextReveal>
        </div>

        <div className={styles.workflowDesktop}>
          <div className={`containerWide ${styles.workflowStage}`}>
            <div className={styles.workflowRail}>
              {howItWorksSteps.map((step, index) => (
                <article
                  key={step.id}
                  data-workflow-step
                  className={`${styles.workflowStep} ${activeStep === index ? styles.workflowStepActive : ""}`}
                >
                  <span>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p><BrandText text={step.body} /></p>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.workflowVisualShell} aria-live="polite">
              {howItWorksSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`${styles.workflowVisual} ${activeStep === index ? styles.workflowVisualActive : ""}`}
                >
                  <WorkflowVisual step={step} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`containerWide ${styles.workflowMobile}`}>
          {howItWorksSteps.map((step, index) => (
            <Reveal key={step.id} className={`cardSurface ${styles.workflowMobileCard}`} delay={index * 0.08}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p><BrandText text={step.body} /></p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="platform" ref={platformRef} className={`section ${styles.platformSection}`}>
        <div className="containerWide">
          <div className={styles.platformIntro}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              Inside the Platform
            </span>
            <SplitTextReveal as="h2" className="sectionTitle" type="words">
              One dashboard. One mobile app. Zero ambiguity.
            </SplitTextReveal>
          </div>
          <div className={styles.platformShowcase}>
            <div className={styles.platformDashboard} data-platform-dashboard>
              <PlatformDashboard />
            </div>
            <div className={styles.platformMobile} data-platform-mobile>
              <PlatformMobile />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={`section ${styles.featuresSection}`}>
        <div className="containerWide">
          <span className="sectionLabel">
            <span className="eyebrowRule" aria-hidden="true" />
            System Specifications
          </span>
          <SplitTextReveal as="h2" className={styles.featuresTitle} type="words">
            Every feature serves one goal: zero rework, zero excuses.
          </SplitTextReveal>

          <div className={styles.featureGrid}>
            {featureCards.map((feature, index) => (
              <Reveal
                key={feature.title}
                className={`cardSurface ${styles.featureCard} ${index === 0 || index === 3 ? styles.featureCardWide : ""}`}
                delay={index * 0.06}
                y={46}
              >
                <div className={styles.featureIconWrap}>
                  <FeatureIcon icon={feature.icon === "offline" ? "lock" : feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.trustSection}`}>
        <div className="containerWide">
          <div className={styles.trustIntro}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              <BrandText text="Why BuildUNIX" />
            </span>
            <SplitTextReveal as="h2" className="sectionTitle" type="words">
              Built for the site. Tested on a {"\u20B9"}1,200 Cr project.
            </SplitTextReveal>
          </div>
          <div className={styles.trustColumns}>
            {trustColumns.map((column, index) => (
              <Reveal key={column.title} as="article" className={styles.trustColumn} delay={index * 0.08}>
                <span>0{index + 1}</span>
                <h3>{column.title}</h3>
                <p><BrandText text={column.body} /></p>
              </Reveal>
            ))}
          </div>
          <div className={styles.statBar}>
            {statBarItems.map((item) => (
              <div key={item.label} className={styles.statItem}>
                <strong>
                  <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={cinematicRef} className={styles.cinematicSection}>
        <div className="containerWide">
          <BeforeAfterStage />
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <Reveal className={styles.ctaCard}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              Book the walkthrough
            </span>
            <h2>Your PMC firm deserves better than WhatsApp.</h2>
            <p><BrandText text="Book a 30-minute demo and see BuildUNIX running on a live construction project." /></p>
            <Link href="/contact" className="button buttonDark">
              Book Your Demo <span className="buttonArrow">{"\u2192"}</span>
            </Link>
            <p className={styles.ctaEmail}>
              Or email us directly at <a href="mailto:info@buildunix.com">info@buildunix.com</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
