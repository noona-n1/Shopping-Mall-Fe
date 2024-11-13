import React from 'react';
import Navbar from "../common/components/Navbar";
import Footer from "../common/components/Footer";
import './AppLayout.style.css';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main>{children}
        {Array.from({ length: 30 }).map((_, index) => (
          <p key={index}>스크롤 테스트</p>
        ))}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
