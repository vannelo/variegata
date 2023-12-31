import { FormattedMessage } from "react-intl";
import Auction from "../Auctions/AuctionItem/AuctionItem";
import Heading, { HeadingAlignEnum, HeadingTypeEnum } from "../Heading/Heading";
import styles from "./FeaturedProduct.module.scss";
import { Auction as AuctionType } from "@/utils/types";
import { motion } from "framer-motion";

interface featuredProductProps {
  product: AuctionType;
}

export default function FeaturedProduct(props: featuredProductProps) {
  const { product } = props;
  const { id, price, name, store, photos, endTime, bids } = product;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
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
              price={price}
              name={name}
              store={store}
              photos={photos}
              endTime={endTime}
              bids={bids}
            />
          </div>
        </div>
        <div
          className={`${styles.left} show-mobile`}
          style={{ backgroundImage: `url(${photos[0].url})` }}
        />
      </div>
    </motion.div>
  );
}
