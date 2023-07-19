import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import productsReducer from "./slices/products-slice";
import storesReducer from "./slices/stores-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    stores: storesReducer,
  },
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
