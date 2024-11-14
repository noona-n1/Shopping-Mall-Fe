import React from 'react';
import Navbar from "../common/components/Navbar";
import Footer from "../common/components/Footer";
import './AppLayout.style.css';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main>{children}


      </main>

      

      <Footer />
    </div>
  );
};

export default AppLayout;
