"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import styles from "./Nav.module.scss";
import classnames from "classnames";
import { useState } from "react";
import { useAppSelector } from "@/redux/store";

export default function Nav() {
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const currentPage = usePathname();
  const { isAuth, email } = useAppSelector((state) => state.auth.value);

  return (
    <>
      <nav className={`${styles.nav}`}>
        <div className={styles.left}>
          <div className={styles.links}>
            <div
              className={classnames(styles.link, {
                [styles.linkActive]: currentPage === "/tienda",
              })}
            >
              <Link href="/tienda">
                <FormattedMessage id="navProductos" />
              </Link>
            </div>
            <div
              className={classnames(styles.link, {
                [styles.linkActive]: currentPage === "/subastas",
              })}
            >
              <Link href="/subastas">
                <FormattedMessage id="navSubastas" />
              </Link>
            </div>
            <div
              className={classnames(styles.link, {
                [styles.linkActive]: currentPage === "/tiendas",
              })}
            >
              <Link href="/tiendas">
                <FormattedMessage id="navTiendas" />
              </Link>
            </div>
            <div
              className={classnames(styles.link, {
                [styles.linkActive]: currentPage === "/contacto",
              })}
            >
              <Link href="/contacto">
                <FormattedMessage id="navContacto" />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <button
            className={`${styles.burger} show-mobile`}
            onClick={() => setMobileMenuActive(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.9rem"
              height="1.9rem"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              Variegata
            </Link>
            <div className={styles.logoImg}>
              <Image
                src="/img/logo.png"
                width="100"
                height="100"
                alt="Variegata Logo"
                className={styles.logoComponent}
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.icons}>
            <div className={styles.icon}>
              <Link href="/buscar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4rem"
                  height="1.4rem"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Link>
            </div>
            <div className={styles.icon}>
              <Link href="/entrar" className={styles.iconBox}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4rem"
                  height="1.4rem"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
                {isAuth && <div className={styles.username}>Allan</div>}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {mobileMenuActive && (
        <div className={styles.mobileMenu}>
          <button
            className={styles.close}
            onClick={() => setMobileMenuActive(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.7rem"
              height="1.7rem"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
          <div className={styles.logo}>
            <Link
              href="/"
              className={styles.logoLink}
              onClick={() => setMobileMenuActive(false)}
            >
              <h1>Variegata</h1>
            </Link>
          </div>
          <div className={styles.divider} />
          <div className={styles.links}>
            <div
              className={classnames(styles.link, {
                [styles.linkActive]: currentPage === "/tienda",
              })}
            >
              <Link href="/tienda" onClick={() => setMobileMenuActive(false)}>
                <FormattedMessage id="navProductos" />
              </Link>
            </div>
            <div
              className={classnames(styles.link, {
                [styles.linkActive]: currentPage === "/subastas",
              })}
            >
              <Link href="/subastas" onClick={() => setMobileMenuActive(false)}>
                <FormattedMessage id="navSubastas" />
              </Link>
            </div>
            <div
              className={classnames(styles.link, {
                [styles.linkActive]: currentPage === "/tiendas",
              })}
            >
              <Link href="/tiendas" onClick={() => setMobileMenuActive(false)}>
                <FormattedMessage id="navTiendas" />
              </Link>
            </div>
            <div
              className={classnames(styles.link, {
                [styles.linkActive]: currentPage === "/contacto",
              })}
            >
              <Link href="/contacto" onClick={() => setMobileMenuActive(false)}>
                <FormattedMessage id="navContacto" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
