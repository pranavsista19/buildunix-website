import styles from "./CommunicationComparison.module.css";
import Reveal from "@/components/Reveal";

export default function CommunicationComparison() {
  return (
    <section className={styles.section}>
      <div className="containerWide">
        <div className={styles.comparisonWrapper}>
          {/* Status Quo Side */}
          <div className={styles.side}>
            <div className={styles.sideLabel}>THE STATUS QUO</div>
            <div className={styles.chatStack}>
              <div className={styles.chatBubble}>
                Bhaiya column ka photo bhejo jaldi
              </div>
              <div className={styles.chatBubble}>
                Kab se wait kar rahe hain slab report ka?
              </div>
              <div className={styles.missedCall}>
                1 missed call at 2:14 AM
              </div>
              <div className={styles.chatBubble}>
                Drawing missing hai, kaam ruka hua hai.
              </div>
            </div>
          </div>

          {/* BuildUNIX Side */}
          <div className={`${styles.side} ${styles.sideBuildunix}`}>
            <div className={styles.sideLabel}>THE BUILDUNIX WAY</div>
            <div className={styles.statusStack}>
              <div className={styles.statusCard}>
                <div className={styles.statusHeader}>
                  <span className={styles.statusTitle}>Column RCC Steel</span>
                  <span className={styles.statusBadge}>APPROVED</span>
                </div>
                <div className={styles.statusMeta}>Verified 1:20 PM ✓</div>
                <div className={styles.statusAssignee}>Jatin (PMC)</div>
              </div>

              <div className={styles.statusCard}>
                <div className={styles.statusHeader}>
                  <span className={styles.statusTitle}>Slab Casting</span>
                  <span className={`${styles.statusBadge} ${styles.badgePending}`}>AWAITING PMC</span>
                </div>
                <div className={styles.statusMeta}>Evidence Uploaded 11:45 AM</div>
                <div className={styles.statusAssignee}>Contractor Team</div>
              </div>
            </div>
          </div>

          {/* Overlay Badge */}
          <div className={styles.overlayBadge}>
            <div className={styles.badgeContent}>
              Construction communication looks like this.
              <br />
              <span className={styles.accentText}>BuildUNIX makes it look like this.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
