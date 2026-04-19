"use client";

import styles from "@/components/PhaseProofCard.module.css";

function LockIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 10V7.6C8.5 5.7 10 4.2 12 4.2C14 4.2 15.5 5.7 15.5 7.6V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PhaseProofCard({ className = "" }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <p>Block A {"\u00B7"} Floor 14</p>
            <h3>Slab Casting {"\u2014"} Phase 3 of 7</h3>
          </div>
          <span>Verified</span>
        </div>

        <div className={styles.progress}>
          <div>
            <span>Phase progress</span>
            <strong>43%</strong>
          </div>
          <span className={styles.progressTrack}>
            <span />
          </span>
        </div>

        <div className={styles.photoGrid}>
          {["Pre", "During", "Post"].map((label) => (
            <div key={label} className={styles.photo}>
              <span>{"\u2713"}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        {["PMC Approval", "Client QC", "Safety + MEP"].map((label, index) => (
          <div key={label} className={styles.status}>
            <span>{label}</span>
            <strong className={index === 2 ? styles.pending : styles.approved}>
              {index === 2 ? "Pending" : "Approved"}
            </strong>
          </div>
        ))}
      </div>

      <div className={styles.notice}>
        <LockIcon />
        <div>
          <span>Next phase</span>
          <strong>Locked until QC</strong>
        </div>
      </div>
    </div>
  );
}
