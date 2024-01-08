import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getProducts } from "@/redux/slices/products-slice";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import Products from "@/components/Products/Products";
import ProductTabs from "@/components/Products/ProductTabs/ProductTabs";
import { SlideshowLightbox } from "lightbox.js-react";
import { Product } from "@/utils/types";
import styles from "./Producto.module.scss";
import ProductPageLoader from "@/components/Products/ProductPageLoader/ProductPageLoader";
import { motion } from "framer-motion";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";
import { useSession } from "next-auth/react";
import Icon, { IconNameEnum, IconSizeEnum } from "@/components/UI/Icons/Icon";

const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export default function ProductoProfile() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const productId = router.query.id;
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [imageActive, setImageActive] = useState<string | undefined>(
    product?.photos[0].url
  );
  const { products } = useAppSelector((state) => state.products);
  const productPhotosUrls = product?.photos.map((photo: any) => {
    return {
      src: photo.url,
    };
  });

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      client
        .query({
          query: gql`
        query GetProduct {
          product(id: "${productId}") {
            _id
            name
            price
            salePrice
            description
            photos {
              url
            }
            store {
              name
              slug
              description
              logo
              facebook
              instagram
              phone
              reviews {
                _id
                rating
                comment
              }
            }
          }
        }
      `,
        })
        .then((result) => {
          const { _id, name, price, salePrice, description, photos, store } =
            result.data.product;
          const product = {
            id: _id,
            name,
            photoId: 1,
            price,
            salePrice,
            description,
            store,
            photos: photos,
          };
          setProduct(product);
          setLoading(false);
        });
    };
    fetchProduct();
    dispatch<any>(getProducts());
  }, [dispatch, productId]);

  console.log("product", product);

  if (!product) return null;
  if (loading) return <ProductPageLoader />;

  return (
    <Page padding={PagePaddingSize.MEDIUM} contained>
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
                      onClick={() => setImageActive(photo.url)}
                    />
                  ))}
                </div>
                <div className={styles.mainImage}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${
                        imageActive ? imageActive : product?.photos[0].url
                      })`,
                    }}
                  >
                    {/* @ts-expect-error Server Component */}
                    <SlideshowLightbox
                      lightboxIdentifier="product"
                      framework="next"
                      images={productPhotosUrls}
                      showControls={false}
                      theme="day"
                      showThumbnails
                    >
                      <button
                        className={styles.fullScreenIcon}
                        data-lightboxjs="product"
                      >
                        <Icon
                          icon={IconNameEnum.EXPAND}
                          size={IconSizeEnum.SMALL}
                        />
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
                      onClick={() => setImageActive(photo.url)}
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
                <h3 className={styles.name}>{product?.name}</h3>
                <div className={styles.miniDivider} />
                <div className={styles.price}>
                  {product?.price && (
                    <FormattedNumber
                      value={product.price}
                      style="currency"
                      currency="MXN"
                    />
                  )}
                </div>
                <div className={styles.description}>
                  <p>{product?.description}</p>
                </div>
                {session ? (
                  <>
                    <div className={styles.buy}>
                      <button className="rounded-md">
                        <FormattedMessage id="productoComprar" />
                      </button>
                    </div>
                    <div className={styles.actions}>
                      <button className={styles.action}>
                        <div className={styles.icon}>
                          <Icon
                            icon={IconNameEnum.SHARE}
                            size={IconSizeEnum.SMALL}
                          />
                        </div>
                        <div className={styles.name}>
                          <FormattedMessage id="productoCompartir" />
                        </div>
                      </button>
                    </div>
                  </>
                ) : (
                  <p className={styles.noAccount}>Próximamente...</p>
                )}
              </div>
            </div>
          </div>
          {product && (
            <div className={styles.moreInfo}>
              <ProductTabs product={product} />
            </div>
          )}
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
            heading={<FormattedMessage id="productosRelacionados" />}
          />
          <Products size={5} products={products} />
        </div>
      </motion.div>
    </Page>
  );
}
