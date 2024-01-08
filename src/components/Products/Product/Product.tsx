import Link from "next/link";
import styles from "./Product.module.scss";
import { Product } from "@/utils/types";
import { FormattedMessage, FormattedNumber } from "react-intl";
import Image from "next/image";
import Icon, {
  IconColorEnum,
  IconNameEnum,
  IconSizeEnum,
} from "@/components/UI/Icons/Icon";

export default function Product(props: Product) {
  const { id, price, salePrice, name, store, photos } = props;
  return (
    <article className={`${styles.product} rounded-md`} key={id}>
      <Link href={`/productos/producto/${id}`}>
        <div className={styles.imageContainer}>
          <Image
            alt="Product image"
            src={photos[0].url}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={20}
            style={{
              objectFit: "cover",
            }}
          />
          <Image
            alt="Product image"
            src={photos.length > 1 ? photos[1].url : photos[0].url}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={20}
            style={{
              objectFit: "cover",
            }}
            className={styles.imageHover}
          />
          {salePrice && (
            <div className={`${styles.sale} rounded-full`}>
              <FormattedMessage id="productoOferta" />
            </div>
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
          <Link href={`/tiendas/${store.slug}`}>
            <Icon icon={IconNameEnum.STORE} size={IconSizeEnum.SMALL} />
            {store.name}
          </Link>
        </div>
      </div>
    </article>
  );
}
