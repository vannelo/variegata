import Image from "next/image";
import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import { FormattedMessage } from "react-intl";
import Button, {
  ButtonColorEnum,
  ButtonSizeEnum,
} from "@/components/UI/Button/Button";

interface HeaderProps {
  readonly headerBg: number;
}

export default function Header(props: HeaderProps) {
  const { headerBg } = props;
  return (
    <header className={styles.header}>
      <>
        <div className={styles.imageBg}></div>
        <Image
          priority
          alt="Variegata Plantas de Boutique"
          src={`/img/stock-${headerBg}.jpg`}
          fill
          quality={90}
          style={{
            objectFit: "cover",
            zIndex: -1,
            backgroundColor: "black",
          }}
        />
      </>
      <div className={`container mx-auto ${styles.headerFlex}`}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Heading
              type={HeadingTypeEnum.PRIMARY}
              heading={<FormattedMessage id="variegata" />}
              subheading={<FormattedMessage id="homeHeading" />}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button
              size={ButtonSizeEnum.MEDIUM}
              color={ButtonColorEnum.PRIMARY}
              href="/productos"
            >
              <>
                <FormattedMessage id="explorarCatalogo" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                </svg>
              </>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
