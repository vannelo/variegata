import Link from "next/link";
import styles from "./Product.module.scss";
import { Product } from "@/utils/types";
import { FormattedNumber } from "react-intl";

export default function Product(props: Product) {
  const { id, photoId, price, salePrice, name, store } = props;
  return (
    <article className={`${styles.product} rounded-md`} key={id}>
      <Link href={`/productos/producto/${id}`}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(/img/products/plant-${photoId}-1.jpg)`,
          }}
        >
          <div
            className={styles.imgBack}
            style={{
              backgroundImage: `url(/img/products/plant-${photoId}-4.jpg)`,
            }}
          />
          {salePrice !== 0 && (
            <div className={`${styles.sale} rounded-full`}>Oferta</div>
          )}
        </div>
      </Link>
      <div className={`${styles.info} p-4`}>
        {salePrice ? (
          <div className={`${styles.price} ${styles.priceSale}`}>
            <FormattedNumber
              value={salePrice}
              style="currency"
              currency="MXN"
            />
            <span className={styles.oldPrice}>
              /<FormattedNumber value={price} style="currency" currency="MXN" />
            </span>
          </div>
        ) : (
          <div className={styles.price}>
            <FormattedNumber value={price} style="currency" currency="MXN" />
          </div>
        )}

        <div className={styles.name}>
          <Link href={`/productos/producto/${id}`}>
            <h4>{name}</h4>
          </Link>
        </div>
        <div className={styles.miniDivider} />
        <div className={styles.seller}>
          <Link href="/tiendas/tienda">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
            </svg>
            {store}
          </Link>
        </div>
      </div>
    </article>
  );
}
