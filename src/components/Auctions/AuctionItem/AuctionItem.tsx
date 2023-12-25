import Link from "next/link";
import styles from "./AuctionItem.module.scss";
import { Auction } from "@/utils/types";
import Image from "next/image";
import Timer, { TimerTypeEnum } from "@/components/Timer/Timer";
import Icon, { IconNameEnum, IconSizeEnum } from "@/components/UI/Icons/Icon";

export default function AuctionItem(props: Auction) {
  const { id, name, store, photos, endTime } = props;
  const mainPhotoURL = photos[0].url;
  const secondaryPhotoURL = photos.length > 1 ? photos[1].url : photos[0].url;
  const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return (
    <article className={styles.product} key={id}>
      <Link href={`/subastas/producto/${id}`}>
        <div className={styles.imageContainer}>
          <Image
            alt={name}
            src={mainPhotoURL}
            fill
            sizes={sizes}
            quality={20}
            style={{
              objectFit: "cover",
            }}
          />
          <Image
            alt={name}
            src={secondaryPhotoURL}
            fill
            sizes={sizes}
            quality={20}
            style={{
              objectFit: "cover",
            }}
            className={styles.imageHover}
          />
        </div>
      </Link>
      <Timer type={TimerTypeEnum.GRID} id={`timer${id}`} endTime={endTime} />
      <div className={styles.info}>
        <div className={styles.name}>
          <Link href="/subastas/producto">
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
