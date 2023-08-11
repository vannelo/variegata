import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Product } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  products: Product[];
  auctions: Product[];
}

const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    let count = 0;

    const productsResponse = await client.query({
      query: gql`
        query Product {
          getProducts {
            _id
            name
            price
            salePrice
            isAuction
          }
        }
      `,
    });
    const products = await productsResponse.data.getProducts
      .filter((product: any) => product.isAuction === false)
      .map(({ _id, name, price, salePrice, isAuction }: any) => {
        if (count === 9) {
          count = 0;
          count++;
        } else {
          count++;
        }

        return {
          id: _id,
          photoId: count,
          price: price,
          salePrice: salePrice,
          name: name,
          isAuction: isAuction,
          store: "STORE",
        };
      });

    const auctionsResponse = await client.query({
      query: gql`
        query Product {
          getProducts {
            _id
            name
            price
            salePrice
            isAuction
          }
        }
      `,
    });
    const auctions = await auctionsResponse.data.getProducts
      .filter((product: any) => product.isAuction === true)
      .map(({ _id, name, price, salePrice, isAuction }: any) => {
        if (count === 9) {
          count = 0;
          count++;
        } else {
          count++;
        }

        return {
          id: _id,
          photoId: count,
          price: price,
          salePrice: salePrice,
          name: name,
          isAuction: isAuction,
          store: "STORE",
        };
      });

    return { products, auctions };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsLength: 0,
    auctions: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state: State) => {
      state.products = [];
    });
    builder.addCase(
      getProducts.fulfilled,
      (state: State, action: PayloadAction<any>) => {
        state.products = action.payload.products;
        state.auctions = action.payload.auctions;
      }
    );
    builder.addCase(getProducts.rejected, (state: State) => {
      state.products = [];
    });
  },
});

export default productsSlice.reducer;
