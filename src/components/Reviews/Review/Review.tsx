import Icon, {
  IconColorEnum,
  IconNameEnum,
  IconSizeEnum,
} from "@/components/UI/Icons/Icon";
import styles from "./Review.module.scss";

interface ReviewProps {
  readonly rating: number;
  readonly comment: string;
}

export default function Review(props: ReviewProps) {
  const { rating, comment } = props;

  return (
    <div className={styles.review}>
      <div className={styles.stars}>
        {new Array(rating).fill("").map((_, index) => (
          <div className={styles.star} key={index}>
            <Icon
              icon={IconNameEnum.STAR}
              size={IconSizeEnum.SMALL}
              color={IconColorEnum.PRIMARY}
            />
          </div>
        ))}
      </div>
      <div className={styles.customer}>
        Yiddha Martinez |<span className={styles.gray}> Agosto 26, 2023</span>
      </div>
      <div className={styles.text}>
        <p>{comment}</p>
      </div>
    </div>
  );
}
