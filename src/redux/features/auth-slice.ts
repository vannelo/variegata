import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};
type AuthState = {
  isAuth: boolean;
  email: string;
};

const initialState = {
  value: {
    isAuth: false,
    email: "",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          email: action.payload,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
