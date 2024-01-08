import { useEffect, useRef, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import styles from "./ProductSearch.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Product } from "@/utils/types";
import Products from "@/components/Products/Products";
import Icon, { IconNameEnum } from "@/components/UI/Icons/Icon";

const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export default function ProductSearch() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("?busqueda=" + searchTermRef.current?.value);
  };

  return (
    <div>
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
                  <Icon icon={IconNameEnum.SEARCH} />
                </button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
