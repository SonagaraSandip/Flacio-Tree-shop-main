import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children,  }) => {
  return (
    <div className="min-h-screen">
      
      <main>{children}</main>
    </div>
  );
};

export default Layout;
