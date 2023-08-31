import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import FeaturedStores from "@/components/Stores/FeaturedStores/FeaturedStores";
import { useAppSelector } from "@/redux/store";
import { getStores } from "@/redux/slices/stores-slice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";

export default function Tiendas() {
  const dispatch = useDispatch();
  const { stores } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch<any>(getStores());
  }, [dispatch]);

  return (
    <Page padding={PagePaddingSize.SMALL} contained>
      <Heading
        type={HeadingTypeEnum.SECONDARY}
        heading={<FormattedMessage id="todasLasTiendas" />}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <FeaturedStores stores={stores} />
      </motion.div>
    </Page>
  );
}
