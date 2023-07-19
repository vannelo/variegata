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

export default function Subastas() {
  const dispatch = useDispatch();
  const { products, productsLength } = useAppSelector(
    (state) => state.products
  );
  const [productsPagesCount, setProductsPagesCount] = useState<number>(0);
  const [productsPageActive, setProductsPageActive] = useState<number>(0);
  const [paginationData, setPaginationData] =
    useState<ProductsPaginationData>();

  useEffect(() => {
    dispatch<any>(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setProductsPagesCount(Math.ceil(productsLength / 15));
    if (productsLength) {
      setPaginationData({
        length: productsLength,
        pageActive: productsPageActive,
      });
    }
  }, [productsPageActive, productsLength]);

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
        <Auctions
          size={16}
          products={products}
          paginationData={paginationData}
        />
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
