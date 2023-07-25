import { useEffect, useState } from "react";
import styles from "./Auctions.module.scss";
import Auction from "./Auction/Auction";
import { Product, ProductsPaginationData } from "@/utils/types";

interface auctionsProps {
  size: number;
  products: Product[];
  paginationData?: ProductsPaginationData;
}

export default function Auctions(props: auctionsProps) {
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
      className={`${styles.productsGrid} grid lg:grid-cols-4 grid-cols-1 gap-6`}
    >
      {isPaginationActive
        ? products
            .slice(slideIndex, sliceEnd)
            .map(({ uuid, photoId, name, price, salePrice, store }) => (
              <Auction
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
              <Auction
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
