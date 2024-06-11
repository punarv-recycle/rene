// Layout.js
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated && <Navbar />} {/* Render Navbar only if the user is authenticated */}
      {children}
    </div>
  );
};

export default Layout;
