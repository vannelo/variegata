import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Product } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  products: Product[];
  productsLength: number;
}

const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    let count = 0;
    const data = client
      .query({
        query: gql`
          query Product {
            getProducts {
              uuid
              name
              price
              salePrice
            }
          }
        `,
      })
      .then((result) => {
        return result.data.getProducts.map(
          ({ uuid, name, price, salePrice }: Product) => {
            if (count === 9) {
              count = 0;
              count++;
            } else {
              count++;
            }

            return {
              id: uuid,
              photoId: count,
              price: price,
              salePrice: salePrice,
              name: name,
              store: "STORE",
            };
          }
        );
      });
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsLength: 0,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state: State) => {
      state.products = [];
    });
    builder.addCase(
      getProducts.fulfilled,
      (state: State, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.productsLength = action.payload.length;
      }
    );
    builder.addCase(getProducts.rejected, (state: State) => {
      state.products = [];
    });
  },
});

export default productsSlice.reducer;
