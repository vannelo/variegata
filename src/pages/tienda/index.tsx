import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./Tienda.module.scss";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import Products from "@/components/Products/Products";
import { productsPaginationData } from "@/utils/types";
import Pagination from "@/components/Pagination/Pagination";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getProducts } from "@/redux/slices/products-slice";

export default function Tienda() {
  const dispatch = useDispatch();
  const { products, productsLength } = useAppSelector(
    (state) => state.products
  );
  const [productsPagesCount, setProductsPagesCount] = useState<number>(0);
  const [productsPageActive, setProductsPageActive] = useState<number>(0);
  const [paginationData, setPaginationData] =
    useState<productsPaginationData>();

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
    <main>
      <section className={styles.page}>
        <div className="container mx-auto">
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            heading={<FormattedMessage id="todosLosProductos" />}
          />
          <Products
            size={15}
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
    </main>
  );
}
