import { createAsyncThunk } from "@reduxjs/toolkit";
import productsJson from "../../constants/products.json";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { productsFetched } from "../slices/products-slice";

const fetchProducts = createAsyncThunk(
  "permissions/fetchPermissions",
  async () => {
    const dispatch = useDispatch<AppDispatch>();
    const productsArr = productsJson.map((p) => {
      return {
        id: p.id,
        photoId: p.photo_id,
        price: p.price,
        salePrice: p.sale_price,
        name: p.name,
        store: p.store,
      };
    });
    dispatch(
      productsFetched([
        {
          id: "asd",
          photoId: 1,
          price: 199,
          salePrice: 299,
          name: "asd",
          store: "asd",
        },
      ])
    );
  }
);

export default fetchProducts;
