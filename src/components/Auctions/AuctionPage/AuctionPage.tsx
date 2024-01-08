import { useState } from "react";
import Link from "next/link";
import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";
import { Auction, Bid } from "@/utils/types";
import styles from "./AuctionPage.module.scss";
import Timer, { TimerTypeEnum } from "@/components/Timer/Timer";
import ProductTabs from "@/components/Products/ProductTabs/ProductTabs";
import { useSession } from "next-auth/react";
import AuctionPageGallery from "./AuctionPageGallery/AuctionPageGallery";
import AuctionPagePrice from "./AuctionPagePrice/AuctionPagePrice";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";
import Animated from "@/components/Layout/Animated/Animated";

interface AuctionPageProps {
  readonly product: Auction;
  readonly productId: string;
  readonly productPhotos: string[];
  readonly highestBid: Bid;
  readonly isAuctionActive: boolean;
  readonly auctionBidSuccess: boolean;
  readonly latestBids: Bid[];
  readonly setShowModal: (value: boolean) => void;
}

export default function AuctionPage({
  product,
  productId,
  highestBid,
  isAuctionActive,
  auctionBidSuccess,
  latestBids,
  setShowModal,
}: AuctionPageProps) {
  const { data: session } = useSession();
  const [showBidsList, setShowBidsList] = useState<boolean>(false);

  return (
    <Page padding={PagePaddingSize.EXTRA_SMALL}>
      <Animated>
        <article className={styles.product}>
          <div className={styles.mainInfo}>
            <div className={styles.left}>
              <AuctionPageGallery product={product} />
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <Link href={`/tiendas/${product?.store.slug}`}>
                  <h4 className={styles.store}> {product?.store.name}</h4>
                </Link>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.miniDivider} />
                <AuctionPagePrice
                  highestBid={highestBid}
                  isAuctionActive={isAuctionActive}
                  auctionBidSuccess={auctionBidSuccess}
                />
                <div className={styles.description}>
                  <p>{product.description}</p>
                </div>
                {product.bids.length > 0 && (
                  <div className={styles.bids}>
                    <button
                      className={styles.title}
                      onClick={() => setShowBidsList((prev) => !prev)}
                    >
                      <div className={styles.icon}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1rem"
                          height="1rem"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                        </svg>
                        <FormattedMessage id="subastaHistorial" />
                      </div>
                      <div className={styles.plus}>
                        {showBidsList ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5rem"
                            height="1.5rem"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5rem"
                            height="1.5rem"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        )}
                      </div>
                    </button>
                    {showBidsList && (
                      <div className={styles.list}>
                        {latestBids.map((bid) => (
                          <div className={styles.item} key={bid.amount}>
                            <div className={styles.user}>Allan</div>
                            <div className={styles.amount}>
                              <FormattedNumber
                                value={bid.amount}
                                style="currency"
                                currency="MXN"
                              />
                            </div>
                            <div className={styles.date}>
                              <FormattedDate
                                value={bid.timestamp}
                                day="numeric"
                                month="long"
                                year="numeric"
                                hour="numeric"
                                minute="numeric"
                                second="numeric"
                              />
                            </div>
                          </div>
                        ))}
                        <div className={styles.more}>
                          <FormattedMessage
                            id="subastaYMas"
                            values={{ ofertas: product.bids.length }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {product.endTime && (
                  <Timer
                    type={TimerTypeEnum.PRODUCT}
                    id={`timer${productId}`}
                    endTime={product.endTime}
                  />
                )}
                {!session && (
                  <p className={styles.noAccount}>
                    Para poder hacer una oferta necesitas tener una cuenta. Crea
                    una cuenta{" "}
                    <Link
                      href="https://variegata.auth.us-east-1.amazoncognito.com/signup?client_id=2au11v1bl3u0binafkofa7ajfd&scope=openid&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fcognito&state=YR4VmnFdCq-86HAvXC55D0v9Om9oT1kwbbPJCafaPa8"
                      className={styles.link}
                    >
                      aquí
                    </Link>
                  </p>
                )}
                {isAuctionActive && session && (
                  <>
                    <div className={styles.buy}>
                      <button
                        className="rounded-md"
                        onClick={() => setShowModal(true)}
                      >
                        <FormattedMessage id="subastaHacerOferta" />
                      </button>
                    </div>
                    <div className={styles.actions}>
                      <button className={styles.action}>
                        <div className={styles.icon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.2rem"
                            height="1.2rem"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                          </svg>
                        </div>
                        <div className={styles.name}>
                          <FormattedMessage id="productoCompartir" />
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.moreInfo}>
            <ProductTabs product={product} />
          </div>
        </article>
      </Animated>
    </Page>
  );
}
