"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import BrandText from "@/components/BrandText";
import { pricingTiers, faqs, testimonials } from "@/lib/site-content";
import styles from "@/app/pricing/pricing.module.css";
import { useState } from "react";

/* ── Hero ───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <Reveal y={20}>
          <span className="sectionLabel">PRICING</span>
        </Reveal>
        <SplitTextReveal as="h1" className={styles.heroTitle} type="words">
          Simple pricing. No surprises.
        </SplitTextReveal>
        <Reveal y={16} delay={0.15}>
          <p className={styles.heroBody}>
            Start with a free 30-day pilot on your first project. No credit card, no commitment. A BuildUNIX engineer configures everything.
          </p>
        </Reveal>
        <Reveal y={12} delay={0.25}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Free pilot · Ships in under 7 days · No setup cost
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Pricing Cards ──────────────────────────────────── */
function PricingSection() {
  return (
    <section className={`section ${styles.pricingSection}`}>
      <div className="containerWide">
        <div className={styles.pricingGrid}>
          {pricingTiers.map((tier, i) => (
            <Reveal
              key={tier.id}
              className={`${styles.pricingCard} ${tier.highlight ? styles.pricingCardHighlight : ""}`}
              delay={i * 0.1}
              y={28}
            >
              {tier.highlight && (
                <div className={styles.pricingBadge}>Most popular</div>
              )}
              <div className={styles.pricingCardHead}>
                <div className={styles.pricingTierName}>{tier.name}</div>
                <div className={styles.pricingPrice}>
                  <span className={styles.pricingAmount}>{tier.price}</span>
                  <span className={styles.pricingPeriod}>{tier.period}</span>
                </div>
                <p className={styles.pricingDesc}>{tier.description}</p>
              </div>

              <Link
                href={tier.ctaHref}
                className={`button ${tier.highlight ? "buttonAccent" : "buttonGhost"} ${styles.pricingCta}`}
              >
                {tier.cta} <span className="buttonArrow">→</span>
              </Link>

              <div className={styles.pricingDivider} />

              <ul className={styles.pricingFeatures}>
                {tier.features.map((f) => (
                  <li key={f} className={styles.pricingFeature}>
                    <span className={styles.pricingCheck}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Comparison Table ───────────────────────────────── */
function ComparisonSection() {
  const rows = [
    { label: "Projects", pilot: "1", pro: "Up to 10", enterprise: "Unlimited" },
    { label: "Blocks per project", pilot: "Up to 3", pro: "Unlimited", enterprise: "Unlimited" },
    { label: "Construction phases", pilot: "14 phases", pro: "14 + custom", enterprise: "14 + custom" },
    { label: "User roles", pilot: "3 roles", pro: "All 7", enterprise: "All 7" },
    { label: "AI daily reports", pilot: "—", pro: "✓", enterprise: "✓ Custom templates" },
    { label: "Snag system", pilot: "Basic", pro: "Full 4-type", enterprise: "Full 4-type" },
    { label: "Offline field mode", pilot: "✓", pro: "✓", enterprise: "✓" },
    { label: "Live heatmap", pilot: "✓", pro: "✓", enterprise: "✓ Multi-company" },
    { label: "API access", pilot: "—", pro: "—", enterprise: "✓" },
    { label: "Support", pilot: "Email", pro: "Priority < 4hr", enterprise: "Dedicated engineer" },
    { label: "Onboarding", pilot: "Self-serve", pro: "Guided setup", enterprise: "On-site training" },
    { label: "SLA", pilot: "—", pro: "—", enterprise: "✓ Custom" },
  ];

  return (
    <section className={`section ${styles.compareSection}`}>
      <div className="containerWide">
        <Reveal className={styles.compareHead}>
          <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />COMPARE PLANS</span>
          <h2 className="sectionTitle">Everything, side by side.</h2>
        </Reveal>

        <Reveal className={styles.tableWrap} y={24} delay={0.1}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thLabel}>Feature</th>
                <th className={styles.th}>Pilot</th>
                <th className={`${styles.th} ${styles.thHighlight}`}>Professional</th>
                <th className={styles.th}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className={styles.tr}>
                  <td className={styles.tdLabel}>{row.label}</td>
                  <td className={styles.td}>{row.pilot}</td>
                  <td className={`${styles.td} ${styles.tdHighlight}`}>{row.pro}</td>
                  <td className={styles.td}>{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Trust Strip ────────────────────────────────────── */
function TrustSection() {
  const points = [
    { label: "No credit card", body: "The 30-day pilot is fully free. No payment info required to get started." },
    { label: "Ships in < 7 days", body: "A BuildUNIX engineer configures your project and trains the team. Ready in a week." },
    { label: "Cancel any time", body: "No lock-in contracts on Professional. Cancel with 30 days' notice, no penalty." },
    { label: "₹0 manual reporting", body: "AI daily reports are included in every paid plan. No extra cost, no manual effort." },
  ];

  return (
    <section className={`section ${styles.trustSection}`}>
      <div className="containerWide">
        <div className={styles.trustGrid}>
          {points.map((p, i) => (
            <Reveal key={p.label} className={styles.trustCard} delay={i * 0.07} y={20}>
              <span className={styles.trustCheck}>✓</span>
              <h3 className={styles.trustLabel}>{p.label}</h3>
              <p className={styles.trustBody}>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className={`section ${styles.faqSection}`}>
      <div className="containerWide">
        <div className={styles.faqLayout}>
          <Reveal className={styles.faqLeft} x={-40} y={20}>
            <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />FAQ</span>
            <h2 className={styles.faqTitle}>Answers to the<br /><em>real questions.</em></h2>
            <p className={styles.faqSubtitle}>
              Still have questions?{" "}
              <Link href="/contact" className={styles.faqLink}>Talk to our team →</Link>
            </p>
          </Reveal>

          <div className={styles.faqList}>
            {faqs.map((item, i) => (
              <Reveal key={i} className={styles.faqItem} delay={i * 0.04} y={14}>
                <button
                  className={`${styles.faqQuestion} ${open === i ? styles.faqQuestionOpen : ""}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <span className={`${styles.faqChevron} ${open === i ? styles.faqChevronOpen : ""}`}>+</span>
                </button>
                {open === i && (
                  <div className={styles.faqAnswer}>{item.a}</div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <Reveal className={styles.ctaCard}>
          <span className="sectionLabel">START TODAY</span>
          <h2 className={styles.ctaTitle}>
            <BrandText text="Your first pilot is free. Ship in under a week." />
          </h2>
          <p className={styles.ctaBody}>
            No credit card. No commitment. A BuildUNIX engineer sets everything up and stays available throughout the 30 days.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className="button buttonPrimary">
              Start free pilot <span className="buttonArrow">→</span>
            </Link>
            <Link href="/product" className="button buttonGhost">
              See the product
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Root ───────────────────────────────────────────── */
export default function PricingExperience() {
  return (
    <>
      <HeroSection />
      <PricingSection />
      <ComparisonSection />
      <TrustSection />
      <FAQSection />
      <CtaSection />
    </>
  );
}
