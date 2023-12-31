import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import Products from "@/components/Products/Products";
import { ProductsPaginationData } from "@/utils/types";
import Pagination from "@/components/Pagination/Pagination";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getProducts } from "@/redux/slices/products-slice";
import { motion } from "framer-motion";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";

export default function Tienda() {
  const dispatch = useDispatch();
  const { products } = useAppSelector((state) => state.products);
  const [productsPagesCount, setProductsPagesCount] = useState<number>(0);
  const [productsPageActive, setProductsPageActive] = useState<number>(0);
  const [paginationData, setPaginationData] =
    useState<ProductsPaginationData>();

  useEffect(() => {
    if (!products.length) {
      dispatch<any>(getProducts());
    }
    setProductsPagesCount(Math.ceil(products.length / 15));
    if (products.length) {
      setPaginationData({
        length: products.length,
        pageActive: productsPageActive,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsPageActive, products.length]);

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
    <Page padding={PagePaddingSize.SMALL} contained>
      <Heading
        type={HeadingTypeEnum.SECONDARY}
        heading={<FormattedMessage id="todosLosProductos" />}
      />
      {products.length ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Products
            size={15}
            products={products}
            paginationData={paginationData}
          />
        </motion.div>
      ) : (
        <Products size={15} products={products} loading />
      )}
      <Pagination
        productsPageActive={productsPageActive}
        productsPagesCount={productsPagesCount}
        onPageChange={onPageChange}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
      />
    </Page>
  );
}
