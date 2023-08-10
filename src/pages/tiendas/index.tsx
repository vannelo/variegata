import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./Tiendas.module.scss";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import FeaturedStores from "@/components/FeaturedStores/FeaturedStores";
import { useAppSelector } from "@/redux/store";
import { getStores } from "@/redux/slices/stores-slice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export default function Tiendas() {
  const dispatch = useDispatch();
  const { stores } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch<any>(getStores());
  }, [dispatch]);

  return (
    <main>
      <section className={styles.page}>
        <div className="container mx-auto">
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
        </div>
      </section>
    </main>
  );
}
