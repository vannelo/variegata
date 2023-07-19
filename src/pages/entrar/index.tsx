import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/navigation";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import { logIn } from "@/redux/slices/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import styles from "./Entrar.module.scss";

export default function Entrar() {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth } = useAppSelector((state) => state.auth.value);
  const { push } = useRouter();

  useEffect(() => {
    if (isAuth) {
      push("/cuenta");
    }
  }, [isAuth, push]);

  const logInHandler = () => {
    if (!emailRef?.current?.value) {
      setEmailError(true);
    }
    if (!passwordRef?.current?.value) {
      setPasswordError(true);
    }
    if (emailRef?.current?.value && passwordRef?.current?.value) {
      dispatch(logIn(emailRef.current.value));
    }
  };

  return (
    <div className={styles.page}>
      <div className="container mx-auto">
        <div className={`${styles.contact} max-w-xl mx-auto`}>
          <Heading
            type={HeadingTypeEnum.SECONDARY}
            align={HeadingAlignEnum.CENTER}
            heading={<FormattedMessage id="iniciaSesion" />}
            subheading={<FormattedMessage id="entrar" />}
          />
          <div className={styles.form}>
            <label>
              <FormattedMessage id="inputEmail" />
            </label>
            <input
              type="email"
              className="rounded-md"
              ref={emailRef}
              required
            />
            {emailError && (
              <div className={styles.error}>
                <FormattedMessage id="inputEmailError" />
              </div>
            )}
            <label>
              <FormattedMessage id="inputContrasena" />
            </label>
            <input
              type="password"
              className="rounded-md"
              ref={passwordRef}
              required
            />
            {passwordError && (
              <div className={styles.error}>
                <FormattedMessage id="inputContrasenaError" />
              </div>
            )}

            <button className="rounded-md" onClick={logInHandler}>
              <FormattedMessage id="entrar" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
