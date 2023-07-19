import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import styles from "./Cuenta.module.scss";
import { FormattedMessage } from "react-intl";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slices/auth-slice";

export default function Entrar() {
  const { isAuth } = useAppSelector((state) => state.auth.value);
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuth) {
      push("/entrar");
    }
  }, [isAuth, push]);

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.page}>
      <div className="container mx-auto">
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
              <button className={styles.option}>
                <FormattedMessage id="cuentaOrdenes" />
              </button>
              <button className={styles.option}>
                <FormattedMessage id="cuentaDireccion" />
              </button>
              <button className={styles.option} onClick={logOutHandler}>
                <FormattedMessage id="cuentaSalir" />
              </button>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.content}>
              <Heading
                type={HeadingTypeEnum.SECONDARY}
                heading={<FormattedMessage id="informacionPersonal" />}
              />
              <div className={styles.info}>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <FormattedMessage id="cuentaNombre" />
                  </div>
                  <div className={styles.right}>Allan Castellanos</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <FormattedMessage id="cuentaEmail" />
                  </div>
                  <div className={styles.right}>
                    allancastellanosmx@gmail.com
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <FormattedMessage id="cuentaEstado" />
                  </div>
                  <div className={styles.right}>Ciudad de México</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
