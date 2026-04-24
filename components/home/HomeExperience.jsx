"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";
import { companyEmail } from "@/lib/site-content";
import DemoForm from "@/components/DemoForm";

/* ── Typewriter ─────────────────────────────────────── */
function Typewriter({ words, typeMs = 75, eraseMs = 40, holdMs = 1400 }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [phase, setPhase] = useState("type");

  useEffect(() => {
    const word = words[i];
    let t;
    if (phase === "type") {
      if (txt.length < word.length) {
        t = setTimeout(() => setTxt(word.slice(0, txt.length + 1)), typeMs);
      } else {
        t = setTimeout(() => setPhase("erase"), holdMs);
      }
    } else {
      if (txt.length > 0) {
        t = setTimeout(() => setTxt(txt.slice(0, -1)), eraseMs);
      } else {
        setI((i + 1) % words.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(t);
  }, [txt, phase, i, words, typeMs, eraseMs, holdMs]);

  return (
    <span className={styles.twRotator}>
      {txt}
      <span className={styles.twCaret} aria-hidden="true" />
    </span>
  );
}

/* ── Hero ───────────────────────────────────────────── */
function HeroSection() {
  let btnRAF = null;
  const onBtnMove = (e) => {
    if (btnRAF) return;
    const el = e.currentTarget;
    const cx = e.clientX;
    const cy = e.clientY;
    btnRAF = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${((cx - r.left) / r.width) * 100}%`);
      el.style.setProperty("--y", `${((cy - r.top) / r.height) * 100}%`);
      btnRAF = null;
    });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>
          <span className={styles.heroDot} />
          <span>v0.9 · Pilots shipping in under 7 days</span>
        </div>

        <h1 className={styles.heroTitle}>
          <span>Construction software, built to</span>
          <br />
          <span className={styles.twLine}>
            <Typewriter words={["improve QoS.", "reduce time.", "improve profits."]} />
          </span>
        </h1>

        <p className={styles.heroLede}>
          BuildUNIX digitizes construction execution — phase-locked schedules, evidence-backed
          handoffs, and a logic engine that removes the churn draining your time, margin, and
          quality.
        </p>

        <div className={styles.heroActions}>
          <div className={styles.heroCta}>
            <Link href="/contact" className={`button buttonPrimary ${styles.heroBtn}`} onMouseMove={onBtnMove}>
              Book a pilot
            </Link>
            <Link href="/product" className={`button buttonGhost ${styles.heroBtn}`} onMouseMove={onBtnMove}>
              See the product
            </Link>
          </div>

          <div className={styles.heroMeta}>
            <div className={styles.heroMetaItem}>
              <div className={styles.heroMetaLbl}>Pilot timeline</div>
              <div className={styles.heroMetaVal}><em>&lt; 7 days</em></div>
            </div>
            <div className={styles.heroMetaItem}>
              <div className={styles.heroMetaLbl}>Avg. delay reduction</div>
              <div className={styles.heroMetaVal}><em>31%</em></div>
            </div>
            <div className={styles.heroMetaItem}>
              <div className={styles.heroMetaLbl}>Margin recovery</div>
              <div className={styles.heroMetaVal}><em>₹1.2 Cr / site</em></div>
            </div>
          </div>
        </div>
      </div>

      <a href="#why" className={styles.scrollHint}>
        <span>SCROLL</span>
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}

/* ── Highlights ─────────────────────────────────────── */
function HighlightsSection() {
  const cardRef = useRef(null);

  useEffect(() => {
    let raf = null;
    const handler = (e) => {
      if (raf) return;
      const card = e.currentTarget;
      const cx = e.clientX;
      const cy = e.clientY;
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${cx - r.left}px`);
        card.style.setProperty("--my", `${cy - r.top}px`);
        raf = null;
      });
    };
    const cards = document.querySelectorAll(`.${styles.hlCard}`);
    cards.forEach((c) => c.addEventListener("mousemove", handler, { passive: true }));
    return () => {
      if (raf) cancelAnimationFrame(raf);
      cards.forEach((c) => c.removeEventListener("mousemove", handler));
    };
  }, []);

  const items = [
    {
      ix: "[01] PHASE-LOCK",
      title: "No phase starts without evidence.",
      body: "Our logic engine enforces prerequisites across 14 phases × 5 trades. Prolonged delays become impossible — every handoff is provable.",
      href: "/product#phase-lock",
    },
    {
      ix: "[02] LIVE OPS",
      title: "Site proof from the crew, not the office.",
      body: "GPS-pinned, time-stamped, cryptographically signed photo evidence. Reviewed in minutes from your phone or dashboard.",
      href: "/product#ops",
    },
    {
      ix: "[03] MONEY LOGIC",
      title: "Stop the churn of money mismanagement.",
      body: "Automated reconciliation between BOQ, site consumption, and vendor invoices. Leakage gets flagged before it compounds.",
      href: "/product#features",
    },
  ];

  return (
    <section id="why" className={styles.highlightsSection}>
      <div className="containerWide">
        <div className={styles.sectionHead}>
          <div>
            <div className="sectionLabel">WHY BUILDUNIX</div>
            <h2 className={`sectionTitle ${styles.sectionH2}`}>
              Three places we <em>remove the churn</em>.
            </h2>
          </div>
          <p className={styles.sectionLede}>
            Most construction software digitizes the paperwork. BuildUNIX digitizes the logic
            behind the work — where time, quality, and money actually leak.
          </p>
        </div>

        <div className={styles.hlGrid}>
          {items.map((it) => (
            <Link key={it.ix} href={it.href} className={styles.hlCard}>
              <div className={styles.hlIx}>{it.ix}</div>
              <h3 className={styles.hlTitle}>{it.title}</h3>
              <p className={styles.hlBody}>{it.body}</p>
              <span className={styles.hlMore}>Learn more →</span>
            </Link>
          ))}
        </div>

        <div className={styles.intentStrip}>
          <Link href="/contact" className={styles.intentChip}>
            <span className={styles.intentK}>→</span> Improve QoS
          </Link>
          <Link href="/contact" className={styles.intentChip}>
            <span className={styles.intentK}>→</span> Reduce time
          </Link>
          <Link href="/contact" className={styles.intentChip}>
            <span className={styles.intentK}>→</span> Improve profits
          </Link>
          <Link href="/pricing" className={styles.intentChip}>
            <span className={styles.intentK}>→</span> See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Differentiators ────────────────────────────────── */
function DifferentiatorsSection() {
  return (
    <section className={styles.differSection}>
      <div className="containerWide">
        <div className={styles.sectionHead}>
          <div>
            <div className="sectionLabel">WHY CHOOSE BUILDUNIX</div>
            <h2 className={`sectionTitle ${styles.sectionH2}`}>
              Legacy tools slow you down.
              <br />
              <em>We built the opposite.</em>
            </h2>
          </div>
          <p className={styles.sectionLede}>
            Most construction platforms lock you into rigid templates, stall updates through layered
            approvals, and fail the moment the site goes offline. BuildUNIX was built for the way
            work actually happens on the ground.
          </p>
        </div>

        <div className={styles.differWrap}>
          <div className={styles.differCard}>
            <div className={styles.differTag}>THE STATUS QUO</div>
            <h4 className={styles.differH4}>Rigid. Slow. Disconnected.</h4>
            <div className={styles.differList}>
              {[
                ["Rigid templates", "One-size workflow forces you to bend your project to the software, not the other way around."],
                ["Delayed reports", "Updates crawl through layered approvals, so by the time leadership sees a snag, it's already a week old."],
                ["No offline accommodation", "The moment site signal drops, the app becomes a paperweight. Crews fall back to WhatsApp and paper."],
                ["Cosmetic digitization", "Replaces paper forms, ignores the underlying logic where time and money actually leak."],
              ].map(([strong, rest]) => (
                <div key={strong} className={`${styles.differRow} ${styles.differBad}`}>
                  <span className={styles.differMk}>✕</span>
                  <div><strong>{strong}</strong> — {rest}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.differCard} ${styles.differUs}`}>
            <div className={`${styles.differTag} ${styles.differTagUs}`}>THE BUILDUNIX APPROACH</div>
            <h4 className={styles.differH4}>Flexible. Real-time. Offline-first.</h4>
            <div className={styles.differList}>
              {[
                ["Configurable logic", "Workflows adapt to your project structure, trades, and phase dependencies in hours, not quarters."],
                ["Real-time evidence", "Site proof reaches leadership the instant it's captured. No gatekeepers, no lag, no stale dashboards."],
                ["Offline-first by design", "Crews capture, sign, and log without signal. The moment connection returns, everything syncs automatically."],
                ["Logic-based execution", "Our engine prevents phase churn, reconciles money leakage, and enforces quality at the source."],
              ].map(([strong, rest]) => (
                <div key={strong} className={`${styles.differRow} ${styles.differGood}`}>
                  <span className={styles.differMk}>✓</span>
                  <div><strong>{strong}</strong> — {rest}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ────────────────────────────────────────── */

function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className="containerWide">
        <div className={styles.contactWrap}>
          <div className={styles.contactSide}>
            <div className="sectionLabel">GET STARTED</div>
            <h3 className={styles.contactTitle}>
              Book a <em>pilot</em>.<br />Shipped under a week.
            </h3>
            <p className={styles.contactBody}>
              Tell us where you&apos;re bleeding — quality, time, or money. We&apos;ll configure
              BuildUNIX to your workflow and have your first site live in under seven days.
            </p>
            <div className={styles.contactMeta}>
              <div className={styles.contactMetaRow}>
                <div className={styles.contactMetaK}>EMAIL</div>
                <div className={styles.contactMetaV}>{companyEmail}</div>
              </div>
              <div className={styles.contactMetaRow}>
                <div className={styles.contactMetaK}>SETUP</div>
                <div className={styles.contactMetaV}><em>7 days</em> · typical pilot</div>
              </div>
              <div className={styles.contactMetaRow}>
                <div className={styles.contactMetaK}>BASE</div>
                <div className={styles.contactMetaV}>Bengaluru · Hyderabad</div>
              </div>
            </div>
          </div>
          <DemoForm />
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ──────────────────────────────────────── */
function FinalCTA() {
  let finalRAF = null;
  const onBtnMove = (e) => {
    if (finalRAF) return;
    const el = e.currentTarget;
    const cx = e.clientX;
    const cy = e.clientY;
    finalRAF = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${((cx - r.left) / r.width) * 100}%`);
      el.style.setProperty("--y", `${((cy - r.top) / r.height) * 100}%`);
      finalRAF = null;
    });
  };

  return (
    <section className={styles.finalCta}>
      <h2 className={styles.finalCtaTitle}>
        Built for the <em>ground truth</em>.<br />Shipped this week.
      </h2>
      <div className={styles.finalCtaBtns}>
        <Link href="/contact" className="button buttonPrimary" onMouseMove={onBtnMove}>
          Book a pilot →
        </Link>
        <Link href="/pricing" className="button buttonGhost" onMouseMove={onBtnMove}>
          See pricing
        </Link>
        <Link href="/product" className="button buttonGhost" onMouseMove={onBtnMove}>
          See the product
        </Link>
      </div>
    </section>
  );
}

/* ── Root ───────────────────────────────────────────── */
export default function HomeExperience() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <DifferentiatorsSection />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
