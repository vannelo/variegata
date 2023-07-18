import styles from "./FeaturedStores.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Store } from "@/utils/types";

interface StoresProps {
  stores: Store[];
}

export default function Stores(props: StoresProps) {
  const { stores } = props;
  return (
    <div className={`${styles.stores} grid lg:grid-cols-4 grid-cols-1 gap-6`}>
      {stores.map(({ id, photoId }) => (
        <div className={styles.store} key={id}>
          <Link href="/tiendas/tienda">
            <Image
              src={`/img/stores/store-logo-${photoId}.png`}
              width={800}
              height={300}
              alt="Variegata Store"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
