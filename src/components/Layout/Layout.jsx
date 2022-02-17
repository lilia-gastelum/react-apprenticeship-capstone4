import React from 'react';
import PropTypes from "prop-types";
import Footer from '../Footer';
import Header from '../Header';

function Layout({ children }) {

  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout;
