import React from 'react';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer>
        <p>Digibidder&copy; - {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;