import styles from "./FeaturedStores.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Store } from "@/utils/types";
import { motion } from "framer-motion";

interface StoresProps {
  stores: Store[];
}

export default function Stores(props: StoresProps) {
  const { stores } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className={`${styles.stores} grid lg:grid-cols-4 grid-cols-1 gap-6`}>
        {stores.map(({ slug, logo, name }) => (
          <div className={styles.store} key={slug}>
            <Link href={`/tiendas/${slug}`}>
              <Image src={logo} width={800} height={300} alt={name} />
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
