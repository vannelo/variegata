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
    const response = await client.query({
      query: gql`
        query Product {
          getProducts {
            _id
            name
            price
            salePrice
            isAuction
            photos {
              url
            }
          }
        }
      `,
    });
    const products = await response.data.getProducts
      .filter((product: any) => product.isAuction === false)
      .map(({ _id, name, price, salePrice, isAuction, photos }: any) => {
        return {
          id: _id,
          price: price,
          salePrice: salePrice,
          name: name,
          isAuction: isAuction,
          store: "STORE",
          photos: photos,
        };
      });

    const auctions = await response.data.getProducts
      .filter((product: any) => product.isAuction === true)
      .map(({ _id, name, price, salePrice, isAuction, photos }: any) => {
        return {
          id: _id,
          price: price,
          salePrice: salePrice,
          name: name,
          isAuction: isAuction,
          store: "STORE",
          photos: photos,
        };
      });

    return { products, auctions };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    auctions: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state: State) => {
      state.products = [];
      state.auctions = [];
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
      state.auctions = [];
    });
  },
});

export default productsSlice.reducer;
