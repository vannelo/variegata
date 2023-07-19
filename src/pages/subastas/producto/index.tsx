import { useEffect, useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import Link from "next/link";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import Auctions from "@/components/Auctions/Auctions";
import ProductTabs from "@/components/Products/ProductTabs/ProductTabs";
import { SlideshowLightbox } from "lightbox.js-react";
import styles from "./Producto.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getProducts } from "@/redux/slices/products-slice";

export default function Producto() {
  const dispatch = useDispatch();
  const { products } = useAppSelector((state) => state.products);
  const images = [
    {
      src: "/img/products/plant-2-1.jpg",
      alt: "Plant 1",
    },
    {
      src: "/img/products/plant-2-2.jpg",
      alt: "Plant 2",
    },
    {
      src: "/img/products/plant-2-3.jpg",
      alt: "Plant 3",
    },
    {
      src: "/img/products/plant-2-4.jpg",
      alt: "Plant 4",
    },
  ];
  const [imageActive, setImageActive] = useState<string>(
    "/img/products/plant-2-1.jpg"
  );

  useEffect(() => {
    dispatch<any>(getProducts());
  }, [dispatch]);

  return (
    <section className={styles.productPage}>
      <div className="container mx-auto">
        <article className={styles.product}>
          <div className={styles.mainInfo}>
            <div className={styles.left}>
              <div className={styles.gallery}>
                <div className={`${styles.thumbs} hide-mobile`}>
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-2-1.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-2-1.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-2-2.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-2-2.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-2-3.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-2-3.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-2-4.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-2-4.jpg")
                    }
                  />
                </div>
                <div className={styles.mainImage}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${imageActive})`,
                    }}
                  >
                    {/* @ts-expect-error Server Component */}
                    <SlideshowLightbox
                      lightboxIdentifier="product"
                      framework="next"
                      images={images}
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
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-2-1.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-2-1.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-2-2.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-2-2.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-2-3.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-2-3.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-2-4.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-2-4.jpg")
                    }
                  />
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h4 className={styles.store}>
                  <Link href="/tiendas/tienda">Rare Plant Fairy</Link>
                </h4>
                <h3 className={styles.name}>Philodendron Gloriosum</h3>
                <div className={styles.miniDivider} />
                <div className={styles.price}>
                  <FormattedNumber
                    value={2499}
                    style="currency"
                    currency="MXN"
                  />
                </div>
                <div className={styles.description}>
                  <p>
                    Non laboris laboris aute sint minim sunt reprehenderit minim
                    sint dolore mollit aliqua. Ea esse quis excepteur in enim
                    duis enim ad non amet aliqua duis proident ut.
                  </p>
                  <p>
                    Enim nisi consectetur consequat minim et cillum. Officia in
                    ut elit fugiat excepteur ut eiusmod dolor non cillum ut
                    adipisicing id.
                  </p>
                  <p>
                    Magna cupidatat quis excepteur id magna sunt sit magna
                    ipsum.
                  </p>
                </div>
                <div className={styles.timeContainer}>
                  <h4 className={styles.title}>Subasta activa</h4>
                  <div className={`${styles.time} rounded-md`}>
                    <div className={styles.timeSlot}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5rem"
                        height="1.5rem"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                    </div>
                    <div className={styles.timeSlot}>
                      <div className={styles.head}>20</div>
                      <div className={styles.text}>DÍAS</div>
                    </div>
                    <div className={styles.timeSlot}>
                      <div className={styles.head}>20</div>
                      <div className={styles.text}>HORAS</div>
                    </div>
                    <div className={styles.timeSlot}>
                      <div className={styles.head}>14</div>
                      <div className={styles.text}>MINS</div>
                    </div>
                    <div className={styles.timeSlot}>
                      <div className={styles.head}>48</div>
                      <div className={styles.text}>SEGS</div>
                    </div>
                  </div>
                </div>
                <div className={styles.buy}>
                  <button className="rounded-md">Comprar ahora</button>
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
                    <div className={styles.name}>Compartir</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.moreInfo}>
            <ProductTabs />
          </div>
        </article>
        <div className={styles.relatedProducts}>
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            heading={<FormattedMessage id="subastasRelacionadas" />}
          />
          <Auctions size={4} products={products} />
        </div>
      </div>
    </section>
  );
}
