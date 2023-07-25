import styles from "./Products.module.scss";
import { Product as ProductType, ProductsPaginationData } from "@/utils/types";
import Product from "./Product/Product";
import { useEffect, useState } from "react";

interface productsProps {
  size: number;
  products: ProductType[];
  paginationData?: ProductsPaginationData;
}

export default function Products(props: productsProps) {
  const { size, products, paginationData } = props;
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

  return (
    <div
      className={`${styles.productsGrid} grid lg:grid-cols-5 grid-cols-1 gap-6`}
    >
      {isPaginationActive
        ? products
            .slice(slideIndex, sliceEnd)
            .map(({ uuid, photoId, name, price, salePrice, store }) => (
              <Product
                key={uuid}
                id={uuid}
                uuid={uuid}
                photoId={photoId}
                name={name}
                price={price}
                salePrice={salePrice}
                store={store}
              />
            ))
        : products
            .slice(0, size)
            .map(({ uuid, photoId, name, price, salePrice, store }) => (
              <Product
                key={uuid}
                id={uuid}
                uuid={uuid}
                photoId={photoId}
                name={name}
                price={price}
                salePrice={salePrice}
                store={store}
              />
            ))}
    </div>
  );
}
