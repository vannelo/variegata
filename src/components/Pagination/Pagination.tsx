import classnames from "classnames";
import styles from "./Pagination.module.scss";
import Icon, { IconNameEnum, IconSizeEnum } from "../UI/Icons/Icon";

interface PaginationProps {
  productsPageActive: number;
  productsPagesCount: number;
  onPageChange: (i: number) => void;
  onPrevClick: (i: number) => void;
  onNextClick: (i: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const {
    productsPageActive,
    productsPagesCount,
    onPageChange,
    onPrevClick,
    onNextClick,
  } = props;

  return (
    <div className={styles.pagination}>
      {productsPageActive > 0 ? (
        <button
          className={styles.prevPage}
          onClick={() => onPrevClick(productsPageActive - 1)}
        >
          <Icon icon={IconNameEnum.CHEVRON_LEFT} size={IconSizeEnum.MEDIUM} />
        </button>
      ) : (
        <button className={styles.spaceBox} />
      )}
      {[...Array(productsPagesCount)].map((e, i) => (
        <button
          key={i}
          className={classnames({
            [styles.pageNumberActive]: productsPageActive === i,
          })}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </button>
      ))}
      {productsPageActive < productsPagesCount - 1 ? (
        <button
          className={styles.nextPage}
          onClick={() => onNextClick(productsPageActive + 1)}
        >
          <Icon icon={IconNameEnum.CHEVRON_RIGHT} size={IconSizeEnum.MEDIUM} />
        </button>
      ) : (
        <button className={styles.spaceBox} />
      )}
    </div>
  );
}
