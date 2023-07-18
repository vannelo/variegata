import Review from "./Review/Review";
import styles from "./Reviews.module.scss";

export default function Reviews() {
  return (
    <div className={styles.reviews}>
      <Review />
    </div>
  );
}
