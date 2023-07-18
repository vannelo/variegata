"use client";
import classnames from "classnames";
import styles from "./Pagination.module.scss";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      ) : (
        <button className={styles.spaceBox} />
      )}
    </div>
  );
}
