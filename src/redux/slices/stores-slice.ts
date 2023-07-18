import { Store } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import storesJson from "../../constants/stores.json";

interface State {
  stores: Store[];
  storesLength: number;
}

export const getStores = createAsyncThunk("stores/getStores", async () => {
  const storesArr = storesJson.map(({ id, photo_id, name }) => {
    return {
      id,
      photoId: photo_id,
      name,
    };
  });
  return storesArr;
});

const storesSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    storesLength: 0,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStores.pending, (state: State) => {
      state.stores = [];
    });
    builder.addCase(
      getStores.fulfilled,
      (state: State, action: PayloadAction<Store[]>) => {
        state.stores = action.payload;
        state.storesLength = action.payload.length;
      }
    );
    builder.addCase(getStores.rejected, (state: State) => {
      state.stores = [];
    });
  },
});

export default storesSlice.reducer;
