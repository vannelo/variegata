import { useEffect, useState } from "react";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import styles from "./Index.module.scss";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import Button, {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonTypeEnum,
} from "@/components/Button/Button";
import Auctions from "@/components/Auctions/Auctions";
import FeaturedProduct from "@/components/FeaturedProduct/FeaturedProduct";
import Products from "@/components/Products/Products";
import FeaturedStores from "@/components/FeaturedStores/FeaturedStores";
import { Product } from "@/utils/types";
import { getProducts } from "@/redux/slices/products-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getStores } from "@/redux/slices/stores-slice";
import { motion } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { stores } = useAppSelector((state) => state.stores);
  const [featuredProduct, setFeaturedProduct] = useState<Product>();
  const [headerBg, setHeaderBg] = useState<number>();

  // Fetch products and stores
  useEffect(() => {
    dispatch<any>(getProducts());
    dispatch<any>(getStores());
  }, [dispatch]);
  useEffect(() => {
    setHeaderBg(Math.floor(Math.random() * (5 - 1 + 1) + 1));
  }, []);
  useEffect(() => {
    if (products.length) {
      setFeaturedProduct(products[1]);
    }
  }, [products]);

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <header className={styles.header}>
          {headerBg && (
            <Image
              priority
              alt="Variegata Plantas de Boutique"
              src={`/img/stock-${headerBg}.jpg`}
              fill
              quality={90}
              style={{
                objectFit: "cover",
                zIndex: -1,
              }}
            />
          )}
          <div className={`container mx-auto ${styles.headerFlex}`}>
            <div className={styles.content}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Heading
                  type={HeadingTypeEnum.PRIMARY}
                  heading={<FormattedMessage id="variegata" />}
                  subheading={<FormattedMessage id="homeHeading" />}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <Button
                  size={ButtonSizeEnum.MEDIUM}
                  color={ButtonColorEnum.PRIMARY}
                  href="/productos"
                >
                  <>
                    <FormattedMessage id="explorarCatalogo" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                    </svg>
                  </>
                </Button>
              </motion.div>
            </div>
          </div>
        </header>
      </motion.div>
      <section className={styles.auctionSection}>
        <div className="container mx-auto">
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            heading={<FormattedMessage id="ultimasSubastas" />}
          />
          {products.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Auctions size={8} products={products} />
            </motion.div>
          ) : (
            <Auctions size={8} products={products} loading />
          )}
          <div className="text-center">
            <Button type={ButtonTypeEnum.FLAT} href="/subastas">
              <>
                <FormattedMessage id="verMas" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </>
            </Button>
          </div>
        </div>
      </section>
      <section className={styles.featuredSection}>
        <div className="container mx-auto">
          {featuredProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <FeaturedProduct product={featuredProduct} />
            </motion.div>
          )}
        </div>
      </section>
      <section className={styles.productsSection}>
        <div className="container mx-auto">
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            align={HeadingAlignEnum.CENTER}
            heading={<FormattedMessage id="productosPopulares" />}
          />
          {products.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Products size={10} products={products} />
            </motion.div>
          ) : (
            <Products size={10} products={products} loading />
          )}

          <div className="text-center">
            <Button type={ButtonTypeEnum.FLAT} href="/tienda">
              <>
                <FormattedMessage id="verMas" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </>
            </Button>
          </div>
        </div>
      </section>
      <section className={styles.storesSection}>
        <div className="container mx-auto">
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            heading={<FormattedMessage id="tiendasDestacadas" />}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <FeaturedStores stores={stores} />
          </motion.div>
        </div>
      </section>
      <section className={styles.contactSection}>
        <div className="container mx-auto">
          <div className={`${styles.contact} max-w-xl mx-auto`}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Heading
                type={HeadingTypeEnum.SECONDARY}
                align={HeadingAlignEnum.CENTER}
                heading={<FormattedMessage id="quieresVender" />}
                subheading={<FormattedMessage id="contacto" />}
              />
              <p>
                <FormattedMessage id="contactoText" />
              </p>
              <div className={styles.cta}>
                <Button
                  size={ButtonSizeEnum.SMALL}
                  color={ButtonColorEnum.PRIMARY}
                  href="mailto:variegatamx@gmail.com"
                >
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                    </svg>
                    <FormattedMessage id="mail" />
                  </>
                </Button>
                <Button
                  type={ButtonTypeEnum.FLAT}
                  size={ButtonSizeEnum.SMALL}
                  href="https://wa.me/525560708070?text=Hola,%20me%20interesa%20vender%20en%20Variegata."
                >
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                    <FormattedMessage id="contactoWhatsApp" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                  </>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
