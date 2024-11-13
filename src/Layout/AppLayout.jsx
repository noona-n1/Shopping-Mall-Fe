import React from 'react';
import Navbar from "../common/components/Navbar"

const AppLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      AppLayout
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
