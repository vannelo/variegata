import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import styles from "./Buscar.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { motion } from "framer-motion";

export default function Buscar() {
  const intl = useIntl();

  return (
    <section className={styles.page}>
      <div className="container mx-auto">
        <div className={`${styles.contact} max-w-xl mx-auto`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Heading
              type={HeadingTypeEnum.SECONDARY}
              align={HeadingAlignEnum.CENTER}
              heading={<FormattedMessage id="queEstasBuscando" />}
              subheading={<FormattedMessage id="buscar" />}
            />
            <div className={styles.search}>
              <input
                type="text"
                placeholder={intl.formatMessage({ id: "buscarPlaceholder" })}
              />
              <button className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4rem"
                  height="1.4rem"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
