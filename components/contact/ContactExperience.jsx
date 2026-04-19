"use client";

import BrandText from "@/components/BrandText";
import DemoForm from "@/components/DemoForm";
import Reveal from "@/components/Reveal";
import styles from "@/app/contact/contact.module.css";
import { contactReasons } from "@/lib/site-content";

export default function ContactExperience() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`containerWide ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className="sectionLabel" data-invert="true">
              <span className="eyebrowRule" aria-hidden="true" />
              Book a Demo
            </span>
            <h1 className={styles.heroTitle}>
              <BrandText text="Let's show you BuildUNIX on a real site." />
            </h1>
            <p className={styles.heroBody}>
              30 minutes. No sales pressure. A live walkthrough of the platform
              on an active construction project.
            </p>
          </div>

          <Reveal className={styles.heroShowcase} x={70} y={20}>
            <div className={styles.heroSignal}>
              <span>Demo format</span>
              <strong>Dependency engine, live heatmap, photo evidence, snag lifecycle.</strong>
              <p>Built for PMC firms, developers, and project teams evaluating execution control.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.contentSection}`}>
        <div className={`containerWide ${styles.grid}`}>
          <Reveal className={styles.formColumn} x={-60} y={30}>
            <div className={styles.formShell}>
              <span className={styles.formKicker}>Request access to the walkthrough</span>
              <h2 className={styles.formTitle}>
                <BrandText text="Book your BuildUNIX demo" />
              </h2>
              <p className={styles.formBody}>
                Tell us a little about your firm and project. We&apos;ll reach
                out within 24 hours.
              </p>
              <DemoForm />
            </div>
          </Reveal>

          <Reveal className={styles.sidebar} x={70} y={30} delay={0.08}>
            <div className={styles.sidebarSticky}>
              <h2 className={styles.sidebarTitle}>Why book a demo?</h2>
              <div className={styles.reasonList}>
                {contactReasons.map((reason, index) => (
                  <article key={reason.title} className={styles.reasonCard}>
                    <span>0{index + 1}</span>
                    <h3><BrandText text={reason.title} /></h3>
                    <p><BrandText text={reason.body} /></p>
                  </article>
                ))}
              </div>
              <div className={styles.emailCard}>
                <p>
                  Prefer email? Reach us at{" "}
                  <a href="mailto:info@buildunix.com">info@buildunix.com</a>
                </p>
                <p>We respond within 24 hours.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
