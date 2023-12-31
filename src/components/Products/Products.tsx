import styles from "./Products.module.scss";
import { Product as ProductType, ProductsPaginationData } from "@/utils/types";
import Product from "./Product/Product";
import { useEffect, useState } from "react";
import ProductLoader from "./ProductLoader/ProductLoader";

interface productsProps {
  size: number;
  products: ProductType[];
  paginationData?: ProductsPaginationData;
  loading?: boolean;
}

export default function Products(props: productsProps) {
  const { size, products, paginationData, loading } = props;
  const [slideIndex, setSliceIndex] = useState<number>(0);
  const [sliceEnd, setSliceEnd] = useState<number>(size);
  const isPaginationActive = Boolean(paginationData);

  useEffect(() => {
    if (isPaginationActive && paginationData) {
      if (paginationData.pageActive === 0) {
        setSliceIndex(0);
        setSliceEnd(size);
      } else {
        const newSliceIndex = size * paginationData.pageActive;
        const newSliceEnd = Math.floor(newSliceIndex + size);
        setSliceIndex(newSliceIndex);
        setSliceEnd(newSliceEnd);
      }
    }
  }, [isPaginationActive, paginationData, size]);

  if (loading) {
    return (
      <div
        className={`${styles.productsGrid} grid lg:grid-cols-5 grid-cols-1 gap-6`}
      >
        {Array.from(Array(size ?? 12)).map(() => (
          <ProductLoader key={Math.random()} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${styles.productsGrid} grid lg:grid-cols-5 grid-cols-1 gap-6`}
    >
      {isPaginationActive
        ? products
            .slice(slideIndex, sliceEnd)
            .map(({ id, name, price, salePrice, store, photos }) => (
              <Product
                key={id}
                id={id}
                name={name}
                price={price}
                salePrice={salePrice}
                store={store}
                photos={photos}
              />
            ))
        : products
            .slice(0, size)
            .map(({ id, name, price, salePrice, store, photos }) => (
              <Product
                key={id}
                id={id}
                name={name}
                price={price}
                salePrice={salePrice}
                store={store}
                photos={photos}
              />
            ))}
    </div>
  );
}
