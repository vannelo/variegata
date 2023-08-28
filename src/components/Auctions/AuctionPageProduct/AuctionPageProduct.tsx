import { useState } from "react";
import Link from "next/link";
import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";
import { SlideshowLightbox } from "lightbox.js-react";
import { Auction } from "@/utils/types";
import { motion } from "framer-motion";
import styles from "./AuctionPageProduct.module.scss";
import Timer, { TimerTypeEnum } from "@/components/Timer/Timer";
import ProductTabs from "@/components/Products/ProductTabs/ProductTabs";

interface AuctionPageProductProps {
  readonly product: Auction;
  readonly productId: string;
  // TODO Reaplce with type
  readonly productPhotos: string[];
  readonly highestBid: {
    readonly amount: number;
  };
  readonly isAuctionActive: boolean;
  readonly auctionBidSuccess: boolean;
  // TODO Replace with type
  readonly latestBids: {
    readonly amount: number;
    readonly timestamp: string;
  }[];
  readonly setShowModal: (value: boolean) => void;
}

export default function AuctionPageProduct(props: AuctionPageProductProps) {
  const {
    product,
    productId,
    productPhotos,
    highestBid,
    isAuctionActive,
    auctionBidSuccess,
    latestBids,
    setShowModal,
  } = props;
  const [productImageActive, setProductImageActive] = useState<string>("");
  const [showBidsList, setShowBidsList] = useState<boolean>(false);

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <article className={styles.product}>
          <div className={styles.mainInfo}>
            <div className={styles.left}>
              <div className={styles.gallery}>
                <div className={`${styles.thumbs} hide-mobile`}>
                  {product?.photos.map((photo: any) => (
                    <button
                      key={photo.url}
                      className={styles.thumb}
                      style={{
                        backgroundImage: `url(${photo.url})`,
                      }}
                      onClick={() => setProductImageActive(photo.url)}
                    />
                  ))}
                </div>
                <div className={styles.mainImage}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${
                        productImageActive
                          ? productImageActive
                          : product?.photos[0].url
                      })`,
                    }}
                  >
                    {/* @ts-expect-error Server Component */}
                    <SlideshowLightbox
                      lightboxIdentifier="product"
                      framework="next"
                      images={productPhotos}
                      showControls={false}
                      theme="day"
                      showThumbnails
                    >
                      <button
                        className={styles.fullScreenIcon}
                        data-lightboxjs="product"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                        </svg>
                      </button>
                    </SlideshowLightbox>
                  </div>
                </div>
                <div className={`${styles.thumbs} show-mobile-flex`}>
                  {product?.photos.map((photo: any) => (
                    <button
                      key={photo.url}
                      className={styles.thumb}
                      style={{
                        backgroundImage: `url(${photo.url})`,
                      }}
                      onClick={() => setProductImageActive(photo.url)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <Link href={`/tiendas/${product?.store.slug}`}>
                  <h4 className={styles.store}> {product?.store.name}</h4>
                </Link>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.miniDivider} />
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
                {auctionBidSuccess && (
                  <div className={styles.success}>
                    <div className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1rem"
                        height="1rem"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div className={styles.text}>
                      <FormattedMessage id="subastaOfertaExitosa" />
                    </div>
                  </div>
                )}
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
                {isAuctionActive && (
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
            <ProductTabs />
          </div>
        </article>
      </motion.div>
    </div>
  );
}
