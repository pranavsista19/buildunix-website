import styles from "@/components/AssetSlot.module.css";

export default function AssetSlot({
  eyebrow = "Upload slot",
  title,
  description,
  variant = "light"
}) {
  return (
    <div className={`${styles.slot} ${variant === "dark" ? styles.slotDark : ""}`}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
