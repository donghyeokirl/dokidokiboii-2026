import * as React from "react";
import * as styles from "./Nebula.module.css";

export const Nebula: React.FC = () => {
  return (
    <div className={styles.nebulaOverlay}>
      <div className={`${styles.blob} ${styles.blobIndigo}`}></div>
      <div className={`${styles.blob} ${styles.blobVioletDeep}`}></div>
      <div className={`${styles.blob} ${styles.blobViolet}`}></div>
      <div className={`${styles.blob} ${styles.blobMagenta}`}></div>
      <div className={`${styles.blob} ${styles.blobPink}`}></div>
      <div className={`${styles.blob} ${styles.blobBlueLeft}`}></div>
      <div className={`${styles.blob} ${styles.blobBlueRight}`}></div>
      <div className={`${styles.blob} ${styles.blobLav}`}></div>
      <div className={`${styles.blob} ${styles.blobPeriwinkle}`}></div>
      <div className={`${styles.blob} ${styles.blobPeriwinkle2}`}></div>
      <div className={`${styles.blob} ${styles.blobLav2}`}></div>
    </div>
  );
};

export default Nebula;
