import { Review as ReviewType } from "@/utils/types";
import Review from "./Review/Review";
import styles from "./Reviews.module.scss";

interface ReviewsProps {
  reviews: ReviewType[];
}

export default function Reviews(props: ReviewsProps) {
  const { reviews } = props;

  return (
    <div className={styles.reviews}>
      {reviews.length > 0 ? (
        reviews.map((review: ReviewType) => (
          <Review rating={review.rating} comment={review.comment} />
        ))
      ) : (
        <p>No hay reviews</p>
      )}
    </div>
  );
}
