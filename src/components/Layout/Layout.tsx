import React, { PropsWithChildren } from "react";
import Head from "next/head";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Variegata | Boutique de plantas de colección</title>
        <meta property="og:title" content="Variegata" />
        <meta
          property="og:description"
          content="Boutique de plantas de colección"
        />
        <meta property="og:image" content="https://variegata.mx/img/meta.jpg" />
      </Head>
      <main>
        <Nav />
        {children}
        <Footer />
      </main>
    </>
  );
};
export default Layout;
