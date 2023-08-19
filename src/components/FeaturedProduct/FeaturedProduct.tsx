import { FormattedMessage } from "react-intl";
import Auction from "../Auctions/Auction/Auction";
import Heading, { HeadingAlignEnum, HeadingTypeEnum } from "../Heading/Heading";
import styles from "./FeaturedProduct.module.scss";
import { Auction as AuctionType } from "@/utils/types";

interface featuredProductProps {
  product: AuctionType;
}

export default function FeaturedProduct(props: featuredProductProps) {
  const { product } = props;
  const { id, photoId, price, salePrice, name, store, photos, endTime } =
    product;
  return (
    <div className={`${styles.featured} rounded-md`}>
      <div
        className={`${styles.left} hide-mobile`}
        style={{ backgroundImage: `url(${photos[0].url})` }}
      />
      <div className={styles.right}>
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          align={HeadingAlignEnum.CENTER}
          heading={<FormattedMessage id="destacadoTitulo" />}
          subheading={<FormattedMessage id="destacadoSubtitulo" />}
        />
        <div className={styles.productBox}>
          <Auction
            id={id}
            photoId={photoId}
            price={price}
            salePrice={salePrice}
            name={name}
            store={store}
            photos={photos}
            endTime={endTime}
          />
        </div>
      </div>
      <div
        className={`${styles.left} show-mobile`}
        style={{ backgroundImage: `url(${photos[0].url})` }}
      />
    </div>
  );
}
