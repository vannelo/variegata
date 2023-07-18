import { Product } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsJson from "../../constants/products.json";

interface State {
  products: Product[];
  productsLength: number;
}

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const productsArr = productsJson.map(
      ({ id, photo_id, price, sale_price, name, store }) => {
        return {
          id: id,
          photoId: photo_id,
          price: price,
          salePrice: sale_price,
          name: name,
          store: store,
        };
      }
    );
    return productsArr;
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
