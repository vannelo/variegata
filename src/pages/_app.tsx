import "./globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Outfit } from "next/font/google";
import { IntlProvider } from "react-intl";
import locales from "../locales/es-MX.json";
import Layout from "@/components/Layout/Layout";
import { ReduxProvider } from "@/redux/provider";
import { initLightboxJS } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { SessionProvider } from "next-auth/react";

const outfit = Outfit({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    initLightboxJS("7B78-0C19-DA25-B7A9", "individual");
  }, []);

  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        <IntlProvider messages={locales} locale="es-MX" defaultLocale="es-MX">
          <div className={outfit.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </IntlProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
