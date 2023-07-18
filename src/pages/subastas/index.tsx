"use client";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./Subastas.module.scss";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import { Product, productsPaginationData } from "@/utils/types";
import productsJson from "../../constants/products.json";
import Auctions from "@/components/Auctions/Auctions";
import Pagination from "@/components/Pagination/Pagination";

export default function Subastas() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsPagesCount, setProductsPagesCount] = useState<number>(0);
  const [productsPageActive, setProductsPageActive] = useState<number>(0);
  const [paginationData, setPaginationData] =
    useState<productsPaginationData>();

  useEffect(() => {
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

    setProducts(productsArr);
    setProductsPagesCount(Math.ceil(productsArr.length / 15));
    if (productsArr.length) {
      setPaginationData({
        length: productsArr.length,
        pageActive: productsPageActive,
      });
    }
  }, [productsPageActive]);

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
