import "./globals.css";
import type { AppProps } from "next/app";
import { Outfit } from "next/font/google";
import { IntlProvider } from "react-intl";
import locales from "../locales/es-MX.json";
import Layout from "@/components/Layout/Layout";
import { ReduxProvider } from "@/redux/provider";

const outfit = Outfit({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <IntlProvider messages={locales} locale="es-MX" defaultLocale="es-MX">
        <div className={outfit.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </IntlProvider>
    </ReduxProvider>
  );
}
