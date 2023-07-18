import React, { PropsWithChildren } from "react";
import Nav from "../Nav/Nav";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};
export default Layout;
