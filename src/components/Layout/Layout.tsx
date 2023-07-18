import React, { PropsWithChildren } from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
