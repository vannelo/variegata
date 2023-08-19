import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Store } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  stores: Store[];
}

const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export const getStores = createAsyncThunk("stores/getStores", async () => {
  const response = await client.query({
    query: gql`
      query Store {
        getStores {
          _id
          slug
          name
          city
          description
          facebook
          instagram
          logo
          phone
        }
      }
    `,
  });
  const stores = await response.data.getStores.map(
    ({
      _id,
      slug,
      name,
      city,
      description,
      facebook,
      instagram,
      logo,
      phone,
    }: any) => {
      return {
        id: _id,
        slug,
        name,
        city,
        description,
        facebook,
        instagram,
        logo,
        phone,
      };
    }
  );

  return stores;
});

const storesSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
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
      }
    );
    builder.addCase(getStores.rejected, (state: State) => {
      state.stores = [];
    });
  },
});

export default storesSlice.reducer;
