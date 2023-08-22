import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products-slice";
import storesReducer from "./slices/stores-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    stores: storesReducer,
  },
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
