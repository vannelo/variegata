import { useEffect, useState } from "react";
import styles from "./Auctions.module.scss";
import Auction from "./Auction/Auction";
import { Auction as AuctionType, ProductsPaginationData } from "@/utils/types";
import AuctionLoader from "./AuctionLoader/AuctionLoader";
import { motion } from "framer-motion";

interface auctionsProps {
  size: number;
  products: AuctionType[];
  paginationData?: ProductsPaginationData;
  loading?: boolean;
}

export default function Auctions(props: auctionsProps) {
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
        className={`${styles.productsGrid} grid lg:grid-cols-4 grid-cols-1 gap-6`}
      >
        {Array.from(Array(size ?? 12)).map(() => (
          <AuctionLoader key={Math.random()} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div
        className={`${styles.productsGrid} grid lg:grid-cols-4 grid-cols-1 gap-6`}
      >
        {isPaginationActive
          ? products
              .slice(slideIndex, sliceEnd)
              .map(({ id, name, price, store, photos, endTime, bids }) => (
                <Auction
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  store={store}
                  photos={photos}
                  endTime={endTime}
                  bids={bids}
                />
              ))
          : products
              .slice(0, size)
              .map(({ id, name, price, store, photos, endTime, bids }) => (
                <Auction
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  store={store}
                  photos={photos}
                  endTime={endTime}
                  bids={bids}
                />
              ))}
      </div>
    </motion.div>
  );
}
