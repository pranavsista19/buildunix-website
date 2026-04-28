"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import BrandText from "@/components/BrandText";
import {
  featureCards,
  howItWorksSteps,
  roles,
  statBarItems,
  phaseNames,
  testimonials,
  faqs,
} from "@/lib/site-content";
import styles from "@/app/product/product.module.css";

/* ── Icons ──────────────────────────────────────────── */
const iconMap = {
  flow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="5" rx="1" /><rect x="16" y="3" width="5" height="5" rx="1" />
      <rect x="9.5" y="16" width="5" height="5" rx="1" />
      <path d="M5.5 8v3a1 1 0 001 1h9a1 1 0 001-1V8" /><line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  snag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  heatmap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="4" height="4" rx="0.5" /><rect x="10" y="3" width="4" height="4" rx="0.5" />
      <rect x="17" y="3" width="4" height="4" rx="0.5" /><rect x="3" y="10" width="4" height="4" rx="0.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" /><rect x="17" y="10" width="4" height="4" rx="0.5" />
      <rect x="3" y="17" width="4" height="4" rx="0.5" /><rect x="10" y="17" width="4" height="4" rx="0.5" />
      <rect x="17" y="17" width="4" height="4" rx="0.5" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  offline: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" /><path d="M5 12.55a10.94 10.94 0 015.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0122.56 9" /><path d="M1.42 9a15.91 15.91 0 014.7-2.88" />
      <path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
};

const STATUS_CONFIG = {
  locked:    { color: "#6b7e95", label: "Locked" },
  uploading: { color: "#F0A020", label: "Uploading" },
  awaiting:  { color: "#3D85E8", label: "Awaiting PMC" },
  approved:  { color: "#0DAF72", label: "Approved" },
  snag:      { color: "#E53535", label: "Snag" },
};

/* ── Interactive Heatmap ────────────────────────────── */
const INITIAL_GRID = [
  ["approved","approved","approved"],
  ["approved","approved","awaiting"],
  ["approved","uploading","locked"],
  ["approved","awaiting","locked"],
  ["awaiting","locked","locked"],
  ["snag","locked","locked"],
  ["locked","locked","locked"],
  ["locked","locked","locked"],
];
const TOWERS = ["Tower A", "Tower B", "Tower C"];
const STATUS_CYCLE = ["locked","uploading","awaiting","approved","snag"];

function InteractiveHeatmap() {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [tooltip, setTooltip] = useState(null);

  const cycleStatus = (pi, ci) => {
    setGrid(prev => {
      const next = prev.map(r => [...r]);
      const current = next[pi][ci];
      const idx = STATUS_CYCLE.indexOf(current);
      next[pi][ci] = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
      return next;
    });
  };

  return (
    <div className={styles.heatmapCard}>
      <div className={styles.heatmapHeader}>
        <div className={styles.heatmapTitle}>
          <span className={styles.heatmapDot} />
          Live site heatmap
        </div>
        <div className={styles.heatmapCols}>
          {TOWERS.map(t => <span key={t}>{t}</span>)}
        </div>
      </div>
      <div className={styles.heatmapGrid}>
        {phaseNames.slice(0, 8).map((phase, pi) => (
          <div key={phase} className={styles.heatmapRow}>
            <span className={styles.heatmapPhase}>{phase}</span>
            <div className={styles.heatmapCells}>
              {grid[pi].map((status, ci) => (
                <button
                  key={ci}
                  className={styles.heatmapCell}
                  style={{ background: STATUS_CONFIG[status].color }}
                  title={`${phase} · ${TOWERS[ci]} · ${STATUS_CONFIG[status].label}`}
                  onClick={() => cycleStatus(pi, ci)}
                  onMouseEnter={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    const cr = e.currentTarget.closest(`.${styles.heatmapCard}`).getBoundingClientRect();
                    setTooltip({ pi, ci, phase, status, x: r.left - cr.left + r.width / 2, y: r.top - cr.top - 8 });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  aria-label={`${phase}, ${TOWERS[ci]}: ${STATUS_CONFIG[status].label}. Click to cycle status.`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {tooltip && (
        <div
          className={styles.heatmapTooltip}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <span className={styles.heatmapTooltipDot} style={{ background: STATUS_CONFIG[tooltip.status].color }} />
          <div>
            <div className={styles.heatmapTooltipPhase}>{tooltip.phase}</div>
            <div className={styles.heatmapTooltipTower}>{TOWERS[tooltip.ci]} · {STATUS_CONFIG[tooltip.status].label}</div>
            <div className={styles.heatmapTooltipHint}>Click to cycle</div>
          </div>
        </div>
      )}

      <div className={styles.heatmapLegend}>
        {Object.entries(STATUS_CONFIG).map(([k, v]) => (
          <span key={k} className={styles.heatmapLegendItem}>
            <span style={{ background: v.color }} className={styles.heatmapLegendDot} />
            {v.label}
          </span>
        ))}
      </div>
      <p className={styles.heatmapHint}>Click any cell to cycle its status</p>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`containerWide ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <Reveal y={20}>
            <span className="sectionLabel">PRODUCT OVERVIEW</span>
          </Reveal>
          <SplitTextReveal as="h1" className={styles.heroTitle} type="words">
            The construction OS. Built for how sites actually run.
          </SplitTextReveal>
          <Reveal y={16} delay={0.18}>
            <p className={styles.heroBody}>
              <BrandText text="BuildUNIX enforces the sequencing, evidence, accountability, and reporting that Indian PMC firms need — without adding manual overhead to the team." />
            </p>
          </Reveal>

        </div>

        <Reveal className={styles.heroVisual} x={60} y={20} delay={0.1}>
          <InteractiveHeatmap />
        </Reveal>
      </div>

      <Reveal className={styles.heroStats} y={20} delay={0.3}>
        {statBarItems.map((s) => (
          <div key={s.label} className={styles.heroStat}>
            <strong>{s.prefix ?? ""}{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ── Phase Lock ─────────────────────────────────────── */
function PhaseLockSection() {
  return (
    <section id="phase-lock" className={`section ${styles.phaseLockSection}`}>
      <div className="containerWide">
        <div className={styles.phaseLockGrid}>
          <Reveal className={styles.phaseLockCopy} x={-50} y={20}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              [01] PHASE-LOCK
            </span>
            <h2 className="sectionTitle">
              No phase starts without <em>evidence</em>.
            </h2>
            <p className="sectionBody">
              Our dependency engine hard-gates every phase template across all trades. No subphase can begin unless its predecessors are PMC-approved. No verbal override. No workaround.
            </p>
            <div className={styles.phaseLockStats}>
              <div className={styles.phaseLockStat}><strong>Template</strong><span>Phase sequencing</span></div>
              <div className={styles.phaseLockStat}><strong>6</strong><span>Dependency types</span></div>
              <div className={styles.phaseLockStat}><strong>128+</strong><span>Subphases tracked</span></div>
            </div>
          </Reveal>

          <div className={styles.phaseListWrap}>
            {phaseNames.map((name, i) => (
              <Reveal key={name} className={styles.phaseItem} delay={i * 0.04} x={40}>
                <span className={styles.phaseNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.phaseName}>{name}</span>
                <span className={styles.phaseStatus}>
                  {i < 4 ? <span className={styles.phaseApproved}>✓ Approved</span>
                   : i === 4 ? <span className={styles.phaseAwaiting}>● Awaiting PMC</span>
                   : i === 5 ? <span className={styles.phaseUploading}>↑ Uploading</span>
                   : <span className={styles.phaseLocked}>⊘ Locked</span>}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Live Ops ───────────────────────────────────────── */
function LiveOpsSection() {
  const pillars = [
    { num: "01", title: "Native camera only", body: "Gallery uploads are hard-blocked. Every photo must come from the device camera at capture time — eliminating backdated or substituted evidence." },
    { num: "02", title: "Cryptographic integrity", body: "GPS coordinates, UTC timestamp, uploader identity, and a SHA-256 hash are embedded the moment the shutter fires. Nothing is editable after capture." },
    { num: "03", title: "Pre · During · Post slots", body: "Every subphase requires three mandatory photo slots. PMC Engineers review all three before a single tap approves or blocks the next phase." },
    { num: "04", title: "Offline-first sync", body: "When site signal drops, photos queue on-device with full metadata intact. The moment connection returns, everything syncs in chronological order automatically." },
  ];

  return (
    <section id="ops" className={`section ${styles.opsSection}`}>
      <div className="containerWide">
        <Reveal className={styles.opsHead}>
          <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />[02] LIVE OPS</span>
          <h2 className="sectionTitle">Site proof from the crew, <em>not the office</em>.</h2>
          <p className="sectionBody">Tamper-proof, GPS-pinned, cryptographically signed photo evidence — reviewed in minutes, not days.</p>
        </Reveal>
        <div className={styles.opsPillars}>
          {pillars.map((p, i) => (
            <Reveal key={p.num} className={styles.opsPillar} delay={i * 0.08} y={30}>
              <span className={styles.opsPillarNum}>{p.num}</span>
              <h3 className={styles.opsPillarTitle}>{p.title}</h3>
              <p className={styles.opsPillarBody}>{p.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.opsPhotoMock} y={30} delay={0.15}>
          <PhotoEvidenceMock />
        </Reveal>
      </div>
    </section>
  );
}

function PhotoEvidenceMock() {
  return (
    <div className={styles.photoCard}>
      <div className={styles.photoCardHeader}>
        <div className={styles.photoCardMeta}>
          <span className={styles.photoCardTag}>PHOTO EVIDENCE</span>
          <span className={styles.photoCardPhase}>Slab · Floor 3 · Flat A301</span>
        </div>
        <div className={styles.photoCardBadge}>✓ PMC APPROVED</div>
      </div>
      <div className={styles.photoSlots}>
        {["PRE", "DURING", "POST"].map((slot, i) => (
          <div key={slot} className={`${styles.photoSlot} ${i === 2 ? styles.photoSlotPending : styles.photoSlotDone}`}>
            <div className={styles.photoSlotLabel}>{slot}</div>
            {i < 2 ? (
              <>
                <div className={styles.photoSlotImg}><div className={styles.photoSlotImgInner} /></div>
                <div className={styles.photoSlotMeta}>
                  <span>12.9583°N · 77.6401°E</span>
                  <span>UTC 08:47:22</span>
                  <span className={styles.photoSlotHash}>SHA-256 · verified</span>
                </div>
              </>
            ) : (
              <div className={styles.photoSlotPendingMsg}>Awaiting capture</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── How It Works ───────────────────────────────────── */
function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const step = howItWorksSteps[active];

  return (
    <section id="how-it-works" className={`section ${styles.howSection}`}>
      <div className="containerWide">
        <Reveal className={styles.howHead}>
          <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />HOW IT WORKS</span>
          <SplitTextReveal as="h2" className="sectionTitle" type="words">
            Five steps from chaos to controlled execution.
          </SplitTextReveal>
        </Reveal>
        <div className={styles.howLayout}>
          <div className={styles.howSteps}>
            {howItWorksSteps.map((s, i) => (
              <button key={s.id} className={`${styles.howStep} ${i === active ? styles.howStepActive : ""}`} onClick={() => setActive(i)}>
                <span className={styles.howStepNum}>{s.label}</span>
                <div className={styles.howStepContent}>
                  <span className={styles.howStepTitle}>{s.title}</span>
                  {i === active && <p className={styles.howStepBody}>{s.body}</p>}
                </div>
                <span className={styles.howStepArrow}>→</span>
              </button>
            ))}
          </div>
          <div className={styles.howPanel}>
            <div className={styles.howPanelNum}>{step.label}</div>
            <h3 className={styles.howPanelTitle}>{step.title}</h3>
            <p className={styles.howPanelBody}>{step.body}</p>
            <div className={styles.howPanelVisual}><StepVisual id={step.visual} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepVisual({ id }) {
  const statusColors = { locked:"#6b7e95", uploading:"#F0A020", awaiting:"#3D85E8", approved:"#0DAF72", snag:"#E53535" };
  const visuals = {
    structure: (
      <div className={styles.visualStructure}>
        {[["PROJECT","Greenfield Residences"],["BLOCKS","Tower A · Tower B · Tower C"],["PHASES","Phase template"],["DEPENDENCIES","Pre-configured ✓"]].map(([k,v]) => (
          <div key={k} className={styles.vsRow}><span className={styles.vsLabel}>{k}</span><span className={styles.vsVal}>{v}</span></div>
        ))}
      </div>
    ),
    upload: (
      <div className={styles.visualUpload}>
        {["PRE","DURING","POST"].map(s => (
          <div key={s} className={styles.vuSlot}><div className={styles.vuSlotIcon}>📷</div><span>{s}</span></div>
        ))}
      </div>
    ),
    verify: (
      <div className={styles.visualVerify}>
        <div className={styles.vvNotif}>
          <span className={styles.vvNotifDot} />
          <div><div className={styles.vvNotifTitle}>Inspection required</div><div className={styles.vvNotifSub}>Slab Layout · Floor 3 · A301</div></div>
        </div>
        <div className={styles.vvActions}>
          <span className={styles.vvApprove}>✓ Approve</span>
          <span className={styles.vvSnag}>⚑ Raise Snag</span>
        </div>
      </div>
    ),
    track: (
      <div className={styles.visualTrack}>
        <div className={styles.vtLegend}>
          {Object.entries(statusColors).map(([k,v]) => (
            <span key={k} className={styles.vtLegendItem}><span style={{background:v}} className={styles.vtDot} />{k}</span>
          ))}
        </div>
        <div className={styles.vtGrid}>
          {["approved","approved","uploading","awaiting","snag","locked","locked","locked"].map((s,i) => (
            <div key={i} className={styles.vtCell} style={{background:statusColors[s]}} />
          ))}
        </div>
      </div>
    ),
    report: (
      <div className={styles.visualReport}>
        <div className={styles.vrHeader}><span className={styles.vrTag}>AI DAILY REPORT</span><span className={styles.vrTime}>Delivered 9:00 PM</span></div>
        <div className={styles.vrLines}>
          {["Site activity summary","Photo gallery (48 images)","3 open snags","Progress: 63%"].map(l => (
            <div key={l} className={styles.vrLine}>{l}</div>
          ))}
        </div>
      </div>
    ),
  };
  return visuals[id] ?? null;
}

/* ── Features ───────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section id="features" className={`section ${styles.featuresSection}`}>
      <div className="containerWide">
        <Reveal className={styles.featuresHead}>
          <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />[03] FEATURES</span>
          <SplitTextReveal as="h2" className="sectionTitle" type="words">
            Stop the churn of <em>money mismanagement</em>.
          </SplitTextReveal>
          <p className="sectionBody">Six capabilities that enforce accountability where Indian construction projects actually lose time, quality, and margin.</p>
        </Reveal>
        <div className={styles.featuresGrid}>
          {featureCards.map((f, i) => (
            <Reveal key={f.title} className={styles.featureCard} delay={i * 0.07} y={28}>
              <div className={styles.featureIcon}>{iconMap[f.icon]}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ── Testimonials ───────────────────────────────────── */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className={`section ${styles.testimonialsSection}`}>
      <div className="containerWide">
        <div className={styles.testimonialsLayout}>
          <Reveal className={styles.testimonialsLeft} x={-40} y={20}>
            <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />PROOF</span>
            <h2 className={styles.testimonialsTitle}>
              Builders are<br /><em>shipping faster.</em>
            </h2>
          </Reveal>

          <div className={styles.testimonialsRight}>
            <Reveal key={active} className={styles.testimonialCard} y={16} delay={0.05}>
              <blockquote className={styles.testimonialQuote}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className={styles.testimonialAttrib}>
                <div className={styles.testimonialName}>{t.name}</div>
                <div className={styles.testimonialRole}>{t.role}</div>
                <div className={styles.testimonialCompany}>{t.company}</div>
              </div>
            </Reveal>

            <div className={styles.testimonialsNav}>
              <div className={styles.testimonialsDots}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.testimonialsDot} ${i === active ? styles.testimonialsDotActive : ""}`}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className={styles.testimonialsArrows}>
                <button
                  className={styles.testimonialsArrow}
                  onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
                  aria-label="Previous"
                >←</button>
                <button
                  className={styles.testimonialsArrow}
                  onClick={() => setActive((active + 1) % testimonials.length)}
                  aria-label="Next"
                >→</button>
              </div>
            </div>
          </div>
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
            <h2 className={styles.faqTitle}>
              Answers to the<br /><em>real questions.</em>
            </h2>
            <p className={styles.faqSubtitle}>Still have questions? Contact our team for more info.</p>
          </Reveal>

          <div className={styles.faqList}>
            {faqs.map((item, i) => (
              <Reveal key={i} className={styles.faqItem} delay={i * 0.05} y={16}>
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

/* ── Final CTA ──────────────────────────────────────── */


/* ── Root ───────────────────────────────────────────── */
export default function ProductExperience() {
  return (
    <>
      <HeroSection />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="containerWide">
          <div className="sectionLabel">BETA FEATURE</div>
          <h2 className="sectionTitle" style={{ marginBottom: "1.5rem" }}>3D Community <em>Visualization</em></h2>
          <p className="sectionBody" style={{ marginBottom: "2rem" }}>
            Explore your project in a fully interactive 3D environment. This beta feature allows PMs and clients to visualize construction progress, identify zones, and navigate the site layout with architectural precision.
          </p>
          <div style={{ marginBottom: "0" }}>
            <Link href="/demo-3d" className="button buttonPrimary">
              View 3D Demo <span className="buttonArrow">→</span>
            </Link>
          </div>
        </div>
      </section>
      <PhaseLockSection />
      <LiveOpsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
