import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import Button, { ButtonTypeEnum } from "@/components/UI/Button/Button";
import Auctions from "@/components/Auctions/Auctions";
import FeaturedProduct from "@/components/FeaturedProduct/FeaturedProduct";
import Products from "@/components/Products/Products";
import FeaturedStores from "@/components/Stores/FeaturedStores/FeaturedStores";
import { getProducts } from "@/redux/slices/products-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getStores } from "@/redux/slices/stores-slice";
import { motion } from "framer-motion";
import { Auction } from "@/utils/types";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";
import Header from "@/components/Layout/Header/Header";
import Section from "@/components/Layout/Section/Section";
import Contact, { ContactThemeEnum } from "@/components/Contact/Contact";
import Icon, { IconNameEnum } from "@/components/UI/Icons/Icon";

export default function Home() {
  const dispatch = useDispatch();
  const { products, auctions } = useAppSelector((state) => state.products);
  const { stores } = useAppSelector((state) => state.stores);
  const [featuredProduct, setFeaturedProduct] = useState<Auction>();
  const [headerBg, setHeaderBg] = useState<number>();

  // Fetch products and stores
  useEffect(() => {
    dispatch<any>(getProducts());
    dispatch<any>(getStores());
  }, [dispatch]);
  useEffect(() => {
    setHeaderBg(Math.floor(Math.random() * (6 - 1 + 1) + 1));
  }, []);
  useEffect(() => {
    if (auctions.length) {
      setFeaturedProduct(auctions[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <Page padding={PagePaddingSize.NONE}>
      {headerBg && <Header headerBg={headerBg} />}
      <Section className="container mx-auto py-10 text-center">
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          heading={<FormattedMessage id="ultimasSubastas" />}
        />
        {products.length ? (
          <Auctions size={8} products={auctions} />
        ) : (
          <Auctions size={8} products={auctions} loading />
        )}
        <Button type={ButtonTypeEnum.FLAT} href="/subastas">
          <>
            <FormattedMessage id="verMas" />
            <Icon icon={IconNameEnum.CHEVRON_RIGHT} />
          </>
        </Button>
      </Section>
      {featuredProduct && (
        <Section className="container mx-auto py-10 text-center">
          <FeaturedProduct product={featuredProduct} />
        </Section>
      )}
      <Section className="container mx-auto py-10 text-center">
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          align={HeadingAlignEnum.CENTER}
          heading={<FormattedMessage id="productosPopulares" />}
        />
        {products.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Products size={10} products={products} />
          </motion.div>
        ) : (
          <Products size={10} products={products} loading />
        )}
        <Button type={ButtonTypeEnum.FLAT} href="/tienda">
          <>
            <FormattedMessage id="verMas" />
            <Icon icon={IconNameEnum.CHEVRON_RIGHT} />
          </>
        </Button>
      </Section>
      <Section className="container mx-auto py-10 text-center">
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          heading={<FormattedMessage id="tiendasDestacadas" />}
        />
        <FeaturedStores stores={stores} />
      </Section>
      <Section>
        <Contact theme={ContactThemeEnum.DARK} />
      </Section>
    </Page>
  );
}
