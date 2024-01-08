import { FormattedMessage } from "react-intl";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import Button, {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonTypeEnum,
} from "@/components/UI/Button/Button";
import styles from "./Contact.module.scss";
import { motion } from "framer-motion";
import Icon, {
  IconColorEnum,
  IconNameEnum,
  IconSizeEnum,
} from "../UI/Icons/Icon";

export enum ContactThemeEnum {
  DARK = "dark",
  LIGHT = "light",
}

interface ContactProps {
  readonly theme: ContactThemeEnum;
}

export default function Contact(props: ContactProps) {
  const { theme } = props;

  return theme === ContactThemeEnum.DARK ? (
    <section className={styles.contactDarkTheme}>
      <div className="container mx-auto">
        <div className={`${styles.contact} max-w-xl mx-auto`}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Heading
              type={HeadingTypeEnum.SECONDARY}
              align={HeadingAlignEnum.CENTER}
              heading={<FormattedMessage id="quieresVender" />}
              subheading={<FormattedMessage id="contacto" />}
            />
            <p>
              <FormattedMessage id="contactoText" />
            </p>
            <div className={styles.cta}>
              <Button
                size={ButtonSizeEnum.SMALL}
                color={ButtonColorEnum.PRIMARY}
                href="mailto:variegatamx@gmail.com"
              >
                <>
                  <Icon
                    icon={IconNameEnum.MAIL}
                    size={IconSizeEnum.SMALL}
                    color={IconColorEnum.LIGHT}
                  />
                  <FormattedMessage id="mail" />
                </>
              </Button>
              <Button
                type={ButtonTypeEnum.FLAT}
                size={ButtonSizeEnum.SMALL}
                href="https://wa.me/525560708070?text=Hola,%20me%20interesa%20vender%20en%20Variegata."
              >
                <>
                  <Icon
                    icon={IconNameEnum.WHATSAPP}
                    size={IconSizeEnum.SMALL}
                    color={IconColorEnum.LIGHT}
                  />
                  <FormattedMessage id="contactoWhatsApp" />
                  <Icon
                    icon={IconNameEnum.ARROW}
                    size={IconSizeEnum.SMALL}
                    color={IconColorEnum.LIGHT}
                  />
                </>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  ) : (
    <section className={styles.contactSection}>
      <div className={`${styles.contact} max-w-xl mx-auto`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            align={HeadingAlignEnum.CENTER}
            heading={<FormattedMessage id="quieresVender" />}
            subheading={<FormattedMessage id="contacto" />}
          />
          <p>
            <FormattedMessage id="contactoText" />
          </p>
          <div className={styles.cta}>
            <Button
              size={ButtonSizeEnum.SMALL}
              color={ButtonColorEnum.PRIMARY}
              href={`mailto:${process.env.NEXT_PUBLIC_VARIEGATA_EMAIL}`}
            >
              <>
                <Icon
                  icon={IconNameEnum.MAIL}
                  size={IconSizeEnum.SMALL}
                  color={IconColorEnum.LIGHT}
                />
                <FormattedMessage id="mail" />
              </>
            </Button>
            <Button
              type={ButtonTypeEnum.FLAT}
              size={ButtonSizeEnum.SMALL}
              // TODO: Put this in a constant
              href="https://wa.me/525560708070?text=Hola,%20me%20interesa%20vender%20en%20Variegata."
            >
              <>
                <Icon icon={IconNameEnum.WHATSAPP} size={IconSizeEnum.SMALL} />
                <FormattedMessage id="contactoWhatsApp" />
                <Icon icon={IconNameEnum.ARROW} size={IconSizeEnum.SMALL} />
              </>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
