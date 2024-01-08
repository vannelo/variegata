"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import styles from "./Nav.module.scss";
import classnames from "classnames";
import { useSession, signIn, signOut } from "next-auth/react";
import Icon, {
  IconColorEnum,
  IconNameEnum,
  IconSizeEnum,
} from "@/components/UI/Icons/Icon";

export default function Nav() {
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const [isAccountMenuActive, setIsAccountMenuActive] =
    useState<boolean>(false);
  const currentPage = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 96);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={classnames(styles.nav, {
          [styles.navScrolled]: scrolled || currentPage !== "/",
        })}
      >
        <div className={`container mx-auto ${styles.navContainer}`}>
          <div className={styles.left}>
            <div className={styles.links}>
              <div
                className={classnames(styles.link, {
                  [styles.linkActive]:
                    currentPage && currentPage.includes("productos"),
                })}
              >
                <Link href="/productos">
                  <FormattedMessage id="navProductos" />
                </Link>
              </div>
              <div
                className={classnames(styles.link, {
                  [styles.linkActive]:
                    currentPage && currentPage.includes("subastas"),
                })}
              >
                <Link href="/subastas">
                  <FormattedMessage id="navSubastas" />
                </Link>
              </div>
              <div
                className={classnames(styles.link, {
                  [styles.linkActive]:
                    currentPage && currentPage.includes("tiendas"),
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
              <Icon icon={IconNameEnum.BURGER} color={IconColorEnum.LIGHT} />
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
                  <Icon
                    icon={IconNameEnum.SEARCH}
                    color={IconColorEnum.LIGHT}
                    size={IconSizeEnum.SMALL}
                  />
                </Link>
              </div>
              <div className={styles.icon}>
                {session ? (
                  <div className={styles.accountMenuContainer}>
                    <button
                      className={styles.iconBox}
                      onClick={() => setIsAccountMenuActive((prev) => !prev)}
                    >
                      <div className={styles.username}>Allan</div>
                      <Icon
                        icon={IconNameEnum.CHEVRON_DOWN}
                        size={IconSizeEnum.SMALL}
                      />
                    </button>
                    {isAccountMenuActive && (
                      <div className={styles.accountMenu}>
                        <div className={styles.accountMenuItem}>
                          <Link
                            href="/cuenta"
                            className={styles.accountMenuItemLink}
                            onClick={() => setIsAccountMenuActive(false)}
                          >
                            <FormattedMessage id="accountMenuCuenta" />
                          </Link>
                        </div>
                        <div className={styles.accountMenuItem}>
                          <button
                            onClick={() => signOut()}
                            className={styles.accountMenuItemLink}
                          >
                            <FormattedMessage id="accountMenuSalir" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => signIn("cognito")}
                    className={styles.iconBox}
                  >
                    <Icon
                      icon={IconNameEnum.USER}
                      size={IconSizeEnum.SMALL}
                      color={IconColorEnum.LIGHT}
                    />
                  </button>
                )}
              </div>
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
            <Icon icon={IconNameEnum.CLOSE} />
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
                [styles.linkActive]: currentPage === "/productos",
              })}
            >
              <Link
                href="/productos"
                onClick={() => setMobileMenuActive(false)}
              >
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
