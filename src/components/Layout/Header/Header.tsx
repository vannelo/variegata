import Image from "next/image";
import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import Heading, { HeadingTypeEnum } from "@/components/Heading/Heading";
import { FormattedMessage } from "react-intl";
import Button, {
  ButtonColorEnum,
  ButtonSizeEnum,
} from "@/components/UI/Button/Button";
import Icon, {
  IconColorEnum,
  IconNameEnum,
  IconSizeEnum,
} from "@/components/UI/Icons/Icon";

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
                <Icon
                  icon={IconNameEnum.ARROW}
                  size={IconSizeEnum.SMALL}
                  color={IconColorEnum.LIGHT}
                />
              </>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
