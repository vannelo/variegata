import { useEffect, useRef, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import styles from "./Buscar.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Product } from "@/utils/types";
import Products from "@/components/Products/Products";

const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export default function Buscar() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [products, setProducts] = useState<Product[]>();
  const searchTermRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParam = router.query.busqueda;
  const intl = useIntl();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setProducts([]);
      const response = await client.query({
        query: gql`
          query {
            searchProducts(searchTerm: "${searchParam}") {
              _id
              name
              price
              salePrice
              isAuction
              endTime
              photos {
                url
              }
              store {
                name
                slug
              }
            }
          }
        `,
      });
      const products = await response.data.searchProducts
        .filter((product: any) => product.isAuction === false)
        .map(
          ({ _id, name, price, salePrice, isAuction, photos, store }: any) => {
            return {
              id: _id,
              price,
              salePrice,
              name,
              isAuction,
              store,
              photos,
            };
          }
        );
      setProducts(products);
      setIsLoading(false);
    };

    if (searchParam) {
      setIsSearching(true);
      setSearchTerm(searchTerm);
      fetchResults();
    } else {
      setIsSearching(false);
    }

    return () => {
      setIsSearching(false);
      setSearchTerm("");
    };
  }, [searchParam]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("?busqueda=" + searchTermRef.current?.value);
  };

  return (
    <section className={styles.page}>
      <div className="container mx-auto text-center">
        <div className={styles.contact}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Heading
              type={HeadingTypeEnum.SECONDARY}
              align={HeadingAlignEnum.CENTER}
              heading={
                isSearching ? (
                  <FormattedMessage
                    id="buscando"
                    values={{ busqueda: searchParam }}
                  />
                ) : (
                  <FormattedMessage id="queEstasBuscando" />
                )
              }
              subheading={<FormattedMessage id="buscar" />}
            />
            {isSearching ? (
              isLoading ? (
                <Products size={20} products={[]} loading />
              ) : products && products.length > 0 ? (
                <Products size={20} products={products} />
              ) : (
                <p>
                  <FormattedMessage id="sinResultados" />
                </p>
              )
            ) : (
              <div className="max-w-xl mx-auto">
                <div className={styles.search}>
                  <form onSubmit={submitHandler}>
                    <input
                      type="text"
                      placeholder={intl.formatMessage({
                        id: "buscarPlaceholder",
                      })}
                      ref={searchTermRef}
                    />
                    <button type="submit" className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.4rem"
                        height="1.4rem"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
