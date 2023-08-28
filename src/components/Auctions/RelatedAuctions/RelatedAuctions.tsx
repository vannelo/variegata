import { FormattedMessage } from "react-intl";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import Auctions from "@/components/Auctions/Auctions";
import styles from "./RelatedAuctions.module.scss";
import { motion } from "framer-motion";
import { Auction } from "@/utils/types";

interface RelatedAuctionsProps {
  readonly auctions: Auction[];
}

export default function RelatedAuctions(props: RelatedAuctionsProps) {
  const { auctions } = props;

  return (
    <div className={`${styles.relatedProducts} container mx-auto`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          heading={<FormattedMessage id="subastasRelacionadas" />}
        />
        <Auctions size={4} products={auctions} />
      </motion.div>
    </div>
  );
}
