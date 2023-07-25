import Auction from "../Auctions/Auction/Auction";
import Heading, { HeadingAlignEnum, HeadingTypeEnum } from "../Heading/Heading";
import styles from "./FeaturedProduct.module.scss";
import { Product } from "@/utils/types";

interface featuredProductProps {
  product: Product;
}

export default function FeaturedProduct(props: featuredProductProps) {
  const { product } = props;
  const { uuid, photoId, price, salePrice, name, store } = product;
  return (
    <div className={`${styles.featured} rounded-md`}>
      <div
        className={`${styles.left} hide-mobile`}
        style={{ backgroundImage: `url(img/products/plant-${photoId}-3.jpg)` }}
      />
      <div className={styles.right}>
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          align={HeadingAlignEnum.CENTER}
          heading="Última oportunidad"
          subheading="Próxima subasta finalizando"
        />
        <div className={styles.productBox}>
          <Auction
            id={uuid}
            uuid={uuid}
            photoId={photoId}
            price={price}
            salePrice={salePrice}
            name={name}
            store={store}
          />
        </div>
      </div>
      <div
        className={`${styles.left} show-mobile`}
        style={{ backgroundImage: `url(img/products/plant-${photoId}-3.jpg)` }}
      />
    </div>
  );
}
