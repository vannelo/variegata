import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./Subastas.module.scss";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import { ProductsPaginationData } from "@/utils/types";
import Auctions from "@/components/Auctions/Auctions";
import Pagination from "@/components/Pagination/Pagination";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getProducts } from "@/redux/slices/products-slice";
import { motion } from "framer-motion";

export default function Subastas() {
  const dispatch = useDispatch();
  const { auctions } = useAppSelector((state) => state.products);
  const [productsPagesCount, setProductsPagesCount] = useState<number>(0);
  const [productsPageActive, setProductsPageActive] = useState<number>(0);
  const [paginationData, setPaginationData] =
    useState<ProductsPaginationData>();

  useEffect(() => {
    if (!auctions.length) {
      dispatch<any>(getProducts());
    }
    setProductsPagesCount(Math.ceil(auctions.length / 15));
    if (auctions.length) {
      setPaginationData({
        length: auctions.length,
        pageActive: productsPageActive,
      });
    }
  }, [productsPageActive, auctions.length]);

  const onPageChange = (i: number) => {
    setProductsPageActive(i);
  };
  const onPrevClick = (i: number) => {
    setProductsPageActive(i);
  };
  const onNextClick = (i: number) => {
    setProductsPageActive(i);
  };

  return (
    <section className={styles.page}>
      <div className="container mx-auto">
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          heading={<FormattedMessage id="todasLasSubastas" />}
        />
        {auctions.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Auctions
              size={16}
              products={auctions}
              paginationData={paginationData}
            />
          </motion.div>
        ) : (
          <Auctions size={16} products={auctions} loading />
        )}
        <Pagination
          productsPageActive={productsPageActive}
          productsPagesCount={productsPagesCount}
          onPageChange={onPageChange}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      </div>
    </section>
  );
}
