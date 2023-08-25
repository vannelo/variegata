import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getProducts } from "@/redux/slices/products-slice";
import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import Auctions from "@/components/Auctions/Auctions";
import ProductTabs from "@/components/Products/ProductTabs/ProductTabs";
import { SlideshowLightbox } from "lightbox.js-react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Auction, Bid } from "@/utils/types";
import styles from "./Producto.module.scss";
import Timer, { TimerTypeEnum } from "@/components/Timer/Timer";
import ProductPageLoader from "@/components/Products/ProductPageLoader/ProductPageLoader";
import { motion } from "framer-motion";
import classnames from "classnames";
import CurrencyInput from "react-currency-input-field";

const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      _id
      name
      price
      salePrice
      description
      endTime
      photos {
        url
      }
      bids {
        _id
        amount
        timestamp
      }
      store {
        name
        slug
        description
        logo
        facebook
        instagram
        phone
      }
    }
  }
`;

const CREATE_BID = gql`
  mutation CreateBid($productId: String!, $amount: Float!) {
    createBid(
      bidInput: { productId: $productId, userId: "user-ui", amount: $amount }
    ) {
      amount
    }
  }
`;

export default function Producto() {
  const dispatch = useDispatch();
  const router = useRouter();
  const productId = router.query.id;
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT, {
    variables: { productId },
  });
  const [product, setProduct] = useState<Auction>();
  const [productImageActive, setProductImageActive] = useState<string>();
  const [productPhotos, setProductPhotos] = useState<string[]>([]);
  const { auctions } = useAppSelector((state) => state.products);
  const [
    createBid,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_BID, {
    refetchQueries: [GET_PRODUCT, "GetProduct"],
    errorPolicy: "all",
  });
  const [formError, setFormError] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAuctionActive, setIsAuctionActive] = useState<boolean>(true);
  const [isBidsListActive, setIsBidsListActive] = useState<boolean>(false);
  const [lastBids, setLastBids] = useState<Bid[]>([]);
  const [highestBid, setHighestBid] = useState<Bid>({} as Bid);

  // First render fetch
  useEffect(() => {
    dispatch<any>(getProducts());
  }, []);

  // Fetch product
  useEffect(() => {
    const mapProduct = (product: any) => {
      const productMapped = {
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        endTime: product.endTime,
        store: product.store.name,
        photos: product.photos,
        bids: product.bids,
      };
      const sortedBids = [...product.bids];
      sortedBids.sort((a: Bid, b: Bid) => b.amount - a.amount);
      const end = new Date(product.endTime);
      const now = new Date();
      setIsAuctionActive(!(end < now));
      setProduct(productMapped);
      setProductImageActive(product.photos[0].url);
      setProductPhotos(
        product?.photos.map((photo: any) => {
          return {
            src: photo.url,
          };
        })
      );
      setLastBids(sortedBids.slice(0, 3));
      setHighestBid(sortedBids[0]);
    };

    if (productData) {
      mapProduct(productData.product);
    }
  }, [productData]);

  // Bid mutation
  useEffect(() => {
    if (showModal) {
      inputRef?.current?.focus();
    }
    if (mutationData) {
      setShowModal(false);
    }
    if (mutationError) {
      const errorData = JSON.parse(JSON.stringify(mutationError));
      setFormError(JSON.parse(errorData.message).message);
    }
  }, [mutationData, mutationError, showModal]);

  // Create bid handler
  const postBid = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const convertedAmount = Number(
      inputRef?.current?.value.replace(/[^0-9.-]+/g, "")
    );
    if (!inputRef?.current?.value) {
      setFormError("Ingresa una cantidad");
      return;
    }
    createBid({ variables: { productId: productId, amount: convertedAmount } });
  };

  // Product not found or fetch error
  if (productError) {
    // Redirect to 404
    console.log(productError);
    router.push("/404");
  }

  return productLoading ? (
    <ProductPageLoader />
  ) : (
    product && (
      <section className={styles.productPage}>
        {showModal && (
          <div className={styles.modal}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.modalContent}>
                <div className={styles.modalClose}>
                  <button onClick={() => setShowModal(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </button>
                </div>
                <div className={styles.modalHeader}>
                  <div className={styles.modalIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2rem"
                      height="2rem"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z" />
                      <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z" />
                    </svg>
                  </div>
                  <div className={styles.modalTitle}>
                    <h4>
                      <FormattedMessage id="subastaHacerOferta" />
                    </h4>
                  </div>
                  <div className={styles.modalText}>
                    <p>
                      <FormattedMessage id="subastaOfertaTexto" />
                    </p>
                  </div>
                  {formError && (
                    <div className={styles.modalError}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5rem"
                        height="1.5rem"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                      <p>{formError}</p>
                    </div>
                  )}
                  <div className={styles.modalForm}>
                    <form onSubmit={postBid}>
                      <CurrencyInput
                        id="amount"
                        prefix="$"
                        name="amount"
                        placeholder="Cantidad a ofertar"
                        decimalsLimit={2}
                        className={classnames(styles.input, {
                          [styles.danger]: formError,
                        })}
                        ref={inputRef}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setDisabled(!event.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className={classnames("rounded-md", {
                          [styles.disabled]: disabled,
                        })}
                        disabled={disabled}
                      >
                        {mutationLoading ? (
                          <svg
                            width="1rem"
                            height="1rem"
                            viewBox="0 0 13 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.spinner}
                          >
                            <path
                              d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                              stroke="white"
                            />
                          </svg>
                        ) : (
                          <FormattedMessage id="subastaOfertar" />
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
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
                    {mutationData && (
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
                          onClick={() => setIsBidsListActive((prev) => !prev)}
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
                            {isBidsListActive ? (
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
                        {isBidsListActive && (
                          <div className={styles.list}>
                            {lastBids.map((bid) => (
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
                                values={{ pujas: product.bids.length }}
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className={styles.relatedProducts}>
              <Heading
                type={HeadingTypeEnum.SECONDARY}
                heading={<FormattedMessage id="subastasRelacionadas" />}
              />
              <Auctions size={4} products={auctions} />
            </div>
          </motion.div>
        </div>
      </section>
    )
  );
}
