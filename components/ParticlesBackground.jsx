import styles from "@/components/ParticlesBackground.module.css";

const particles = [
  { top: "18%", left: "8%", size: "13rem", opacity: 0.18, duration: "34s", delay: "-6s", color: "var(--color-ember)" },
  { top: "24%", left: "28%", size: "9rem", opacity: 0.24, duration: "40s", delay: "-12s", color: "var(--color-warm-white)" },
  { top: "30%", left: "78%", size: "12rem", opacity: 0.16, duration: "37s", delay: "-9s", color: "var(--color-text-muted)" },
  { top: "42%", left: "14%", size: "16rem", opacity: 0.32, duration: "46s", delay: "-18s", color: "var(--color-ember-light)" },
  { top: "50%", left: "88%", size: "10rem", opacity: 0.2, duration: "35s", delay: "-7s", color: "var(--color-stone-border)" },
  { top: "60%", left: "36%", size: "18rem", opacity: 0.18, duration: "52s", delay: "-20s", color: "var(--color-ember)" },
  { top: "68%", left: "70%", size: "14rem", opacity: 0.22, duration: "44s", delay: "-11s", color: "var(--color-warm-white)" },
  { top: "78%", left: "18%", size: "11rem", opacity: 0.19, duration: "48s", delay: "-16s", color: "var(--color-text-secondary)" },
  { top: "84%", left: "56%", size: "15rem", opacity: 0.28, duration: "42s", delay: "-14s", color: "var(--color-ember-light)" },
  { top: "88%", left: "84%", size: "9rem", opacity: 0.3, duration: "39s", delay: "-5s", color: "var(--color-ember)" },
  { top: "36%", left: "54%", size: "8rem", opacity: 0.15, duration: "31s", delay: "-4s", color: "var(--color-warm-white)" },
  { top: "64%", left: "6%", size: "12rem", opacity: 0.21, duration: "45s", delay: "-15s", color: "var(--color-stone-border)" }
];

export default function ParticlesBackground() {
  return (
    <div className={styles.particleField} aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={`${particle.top}-${particle.left}-${index}`}
          className={styles.particle}
          style={{
            "--particle-top": particle.top,
            "--particle-left": particle.left,
            "--particle-size": particle.size,
            "--particle-opacity": particle.opacity,
            "--particle-duration": particle.duration,
            "--particle-delay": particle.delay,
            "--particle-color": particle.color
          }}
        />
      ))}
    </div>
  );
}
