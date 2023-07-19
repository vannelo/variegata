import { FormattedMessage } from "react-intl";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <h2>
        <FormattedMessage id="footerText" />
      </h2>
    </footer>
  );
}
