"use client";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./Tiendas.module.scss";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import FeaturedStores from "@/components/FeaturedStores/FeaturedStores";
import storesJson from "../../constants/stores.json";
import { Store } from "@/utils/types";

export default function Tiendas() {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const storesArr = storesJson.map((s) => {
      return {
        id: s.id,
        photoId: s.photo_id,
        name: s.name,
      };
    });

    setStores(storesArr);
  }, []);

  return (
    <main>
      <section className={styles.page}>
        <div className="container mx-auto">
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            heading={<FormattedMessage id="todasLasTiendas" />}
          />
          <FeaturedStores stores={stores} />
        </div>
      </section>
    </main>
  );
}
