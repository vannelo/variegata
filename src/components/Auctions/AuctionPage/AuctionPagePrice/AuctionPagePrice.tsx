import { FormattedMessage, FormattedNumber } from "react-intl";
import { Bid } from "@/utils/types";
import styles from "./AuctionPagePrice.module.scss";
import Icon, {
  IconColorEnum,
  IconNameEnum,
  IconSizeEnum,
} from "@/components/UI/Icons/Icon";

interface AuctionPagePriceProps {
  readonly highestBid: Bid;
  readonly isAuctionActive: boolean;
  readonly auctionBidSuccess: boolean;
}

export default function AuctionPagePrice({
  highestBid,
  isAuctionActive,
  auctionBidSuccess,
}: AuctionPagePriceProps) {
  return (
    <div className={styles.auctionPagePrice}>
      {highestBid ? (
        <div className={styles.price}>
          <FormattedNumber
            value={highestBid.amount}
            style="currency"
            currency="MXN"
          />
          <div className={styles.bestBid}>
            {isAuctionActive ? (
              <FormattedMessage id="pujaMasAlta" />
            ) : (
              <FormattedMessage id="pujaGanadora" />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.price}>
          <FormattedNumber value={0} style="currency" currency="MXN" />
          <div className={styles.bestBid}>
            <FormattedMessage id="sinOfertas" />
          </div>
        </div>
      )}
      {auctionBidSuccess && (
        <div className={styles.success}>
          <Icon
            icon={IconNameEnum.CHECK}
            size={IconSizeEnum.SMALL}
            color={IconColorEnum.SUCCCESS}
          />
          <div className={styles.text}>
            <FormattedMessage id="subastaOfertaExitosa" />
          </div>
        </div>
      )}
    </div>
  );
}
