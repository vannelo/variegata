"use client";
import { useRef, useState } from "react";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import styles from "./Entrar.module.scss";
import { FormattedMessage } from "react-intl";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

export default function Entrar() {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, email } = useAppSelector((state) => state.authReducer.value);

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

  const logOutHandler = () => {
    dispatch(logOut());
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

          {isAuth ? (
            <div>
              <h1>EMAIL LOGEADO: {email}</h1>
              <button onClick={logOutHandler}>Cerrar Sesión</button>
            </div>
          ) : (
            <div className={styles.form}>
              <label>Email</label>
              <input
                type="email"
                className="rounded-md"
                ref={emailRef}
                required
              />
              {emailError && (
                <div className={styles.error}>Ingresa tu email para entrar</div>
              )}
              <label>Contraseña</label>
              <input
                type="password"
                className="rounded-md"
                ref={passwordRef}
                required
              />
              {passwordError && (
                <div className={styles.error}>
                  Ingresa tu contraseña para entrar
                </div>
              )}

              <button className="rounded-md" onClick={logInHandler}>
                Entrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
