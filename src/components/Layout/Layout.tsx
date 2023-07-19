import React, { PropsWithChildren } from "react";
import Head from "next/head";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Variegata | Boutique de plantas de colección</title>
      </Head>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
