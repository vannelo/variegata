import { useEffect, useState } from "react";
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
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Product } from "@/utils/types";
import styles from "./Producto.module.scss";

const images = [
  {
    src: "/img/products/plant-1-1.jpg",
    alt: "Plant 1",
  },
  {
    src: "/img/products/plant-1-2.jpg",
    alt: "Plant 2",
  },
  {
    src: "/img/products/plant-1-3.jpg",
    alt: "Plant 3",
  },
  {
    src: "/img/products/plant-1-4.jpg",
    alt: "Plant 4",
  },
];
const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export default function Producto() {
  const dispatch = useDispatch();
  const router = useRouter();
  const productId = router.query.id;
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [imageActive, setImageActive] = useState<string>(
    "/img/products/plant-1-1.jpg"
  );
  const { products } = useAppSelector((state) => state.products);

  // Start logic
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
          }
        }
      `,
        })
        .then((result) => {
          const { _id, name, price, salePrice, description } =
            result.data.product;
          const product = {
            id: _id,
            name,
            photoId: 1,
            price,
            salePrice,
            description,
            store: "Rare Plant Fairy",
          };
          setProduct(product);
          setLoading(false);
        });
    };
    fetchProduct();
    dispatch<any>(getProducts());
  }, [dispatch, productId]);

  return loading ? (
    <p>Cargando...</p>
  ) : (
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
                      backgroundImage: "url(/img/products/plant-1-1.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-1-1.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-1-2.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-1-2.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-1-3.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-1-3.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-1-4.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-1-4.jpg")
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
                      backgroundImage: "url(/img/products/plant-1-1.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-1-1.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-1-2.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-1-2.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-1-3.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-1-3.jpg")
                    }
                  />
                  <button
                    className={styles.thumb}
                    style={{
                      backgroundImage: "url(/img/products/plant-1-4.jpg)",
                    }}
                    onClick={() =>
                      setImageActive("/img/products/plant-1-4.jpg")
                    }
                  />
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h4 className={styles.store}>
                  <Link href="/tiendas/tienda">{product?.store}</Link>
                </h4>
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
            heading={<FormattedMessage id="productosRelacionados" />}
          />
          <Products size={5} products={products} />
        </div>
      </div>
    </section>
  );
}