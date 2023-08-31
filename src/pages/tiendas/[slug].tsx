import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getProducts } from "@/redux/slices/products-slice";
import { Auction, Product, Store } from "@/utils/types";
import StorePageLoader from "@/components/Stores/StorePageLoader/StorePageLoader";
import StorePage from "@/components/Stores/StorePage/StorePage";

const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export default function TiendaProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const productSlug = router.query.slug;
  const [loading, setLoading] = useState<boolean>(false);
  const [store, setStore] = useState<Store>();
  const [products, setProducts] = useState<Product[]>();
  const [auctions, setAuctions] = useState<Auction[]>();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const response = await client.query({
        query: gql`
        query  {
          store(slug: "${productSlug}") {
            name
            slug
            description
            logo
            facebook
            instagram
            phone
            products {
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
              }
            }
          }
        }
      `,
      });
      const {
        name,
        slug,
        description,
        logo,
        facebook,
        instagram,
        phone,
        products,
      } = await response.data.store;
      const store = {
        name,
        slug,
        description,
        logo,
        facebook,
        instagram,
        phone,
        products,
      };
      const productsArr = await products
        .filter((product: any) => product.isAuction === false)
        .map(
          ({ _id, name, price, salePrice, isAuction, photos, store }: any) => {
            return {
              id: _id,
              price,
              salePrice,
              name,
              isAuction,
              store: store.name,
              photos,
            };
          }
        );
      const auctionsArr = await products
        .filter((product: any) => product.isAuction === true)
        .map(
          ({
            _id,
            name,
            price,
            salePrice,
            isAuction,
            endTime,
            photos,
            store,
          }: any) => {
            return {
              id: _id,
              price,
              salePrice,
              name,
              isAuction,
              endTime,
              store: store.name,
              photos,
            };
          }
        );

      setStore(store);
      setProducts(productsArr);
      setAuctions(auctionsArr);
      setLoading(false);
    };

    if (productSlug) {
      fetchProduct();
    }

    dispatch<any>(getProducts());
  }, [dispatch, productSlug]);

  return loading ? (
    <StorePageLoader />
  ) : (
    store && products && auctions && (
      <StorePage store={store} products={products} auctions={auctions} />
    )
  );
}
