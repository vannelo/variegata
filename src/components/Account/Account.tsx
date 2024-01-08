import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import styles from "./Account.module.scss";
import { FormattedMessage } from "react-intl";

export default function Account() {
  return (
    <div className={styles.account}>
      <Heading
        type={HeadingTypeEnum.SECONDARY}
        align={HeadingAlignEnum.CENTER}
        heading={<FormattedMessage id="miCuenta" />}
        subheading={<FormattedMessage id="cuenta" />}
      />
      <div className={styles.menu}>
        <div className={styles.left}>
          <div className={styles.options}>
            <button className={`${styles.option} ${styles.active}`}>
              <FormattedMessage id="cuentaPerfil" />
            </button>
            {/* <button className={styles.option}>
              <FormattedMessage id="cuentaOrdenes" />
            </button>
            <button className={styles.option}>
              <FormattedMessage id="cuentaDireccion" />
            </button> */}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.content}>
            <Heading
              type={HeadingTypeEnum.SECONDARY}
              heading={<FormattedMessage id="informacionPersonal" />}
            />
            <div className={styles.info}>
              {/* <div className={styles.item}>
                <div className={styles.left}>
                  <FormattedMessage id="cuentaNombre" />
                </div>
                <div className={styles.right}>Allan Castellanos</div>
              </div> */}
              <div className={styles.item}>
                <div className={styles.left}>
                  <FormattedMessage id="cuentaEmail" />
                </div>
                <div className={styles.right}>allancastellanosmx@gmail.com</div>
              </div>
              {/* <div className={styles.item}>
                <div className={styles.left}>
                  <FormattedMessage id="cuentaEstado" />
                </div>
                <div className={styles.right}>Ciudad de México</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
