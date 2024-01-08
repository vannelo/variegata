import Link from "next/link";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import styles from "./StorePage.module.scss";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import Products from "@/components/Products/Products";
import Auctions from "@/components/Auctions/Auctions";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";
import { Auction, Product, Store } from "@/utils/types";
import Icon, { IconColorEnum, IconNameEnum } from "@/components/UI/Icons/Icon";

interface StorePageProps {
  readonly store: Store;
  readonly products: Product[];
  readonly auctions: Auction[];
}

export default function StorePage(props: StorePageProps) {
  const { store, products, auctions } = props;

  return (
    <Page padding={PagePaddingSize.MEDIUM} contained>
      <section className={styles.storePage}>
        <div className={styles.logo}>
          {store && (
            <Image
              src={store.logo}
              width={1400}
              height={933}
              alt={store.name}
              className={styles.img}
            />
          )}
        </div>
        {store && (
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            align={HeadingAlignEnum.CENTER}
            heading={store?.name}
          />
        )}
        <div className={styles.socials}>
          {store?.facebook && (
            <Link href={store?.facebook}>
              <div className={styles.social}>
                <Icon icon={IconNameEnum.FACEBOOK} />
              </div>
            </Link>
          )}
          {store?.instagram && (
            <Link href={store?.instagram}>
              <div className={styles.social}>
                <Icon icon={IconNameEnum.INSTAGRAM} />
              </div>
            </Link>
          )}
          {store?.phone && (
            <Link href={store?.phone}>
              <div className={styles.social}>
                <Icon icon={IconNameEnum.WHATSAPP} />
              </div>
            </Link>
          )}
        </div>
        <div className={styles.bio}>
          <p>{store?.description}</p>
        </div>
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          heading={<FormattedMessage id="todosLosProductos" />}
        />
        {products && <Products size={15} products={products} />}
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          heading={<FormattedMessage id="todasLasSubastas" />}
        />
        {auctions && <Auctions size={15} products={auctions} />}
      </section>
    </Page>
  );
}
