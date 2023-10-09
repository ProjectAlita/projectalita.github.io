// Create a ReactJS component for footer. It should contain the following:
// - Project Alita logo and name on the right 1/3 of the screen
// On the left list of links
// - Link to privacy policy
// - Link to terms of service
// - Contact information

import React from 'react';
import logo from '../../logo.svg';

// Footer component
function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.left}>
        <a href="/privacy-policy" style={styles.link}>Privacy Policy</a>
        <a href="/terms-of-service" style={styles.link}>Terms of Service</a>
        <a href="mailto:support@projectalita.ai" style={styles.link}>support@projectalita.ai</a>
      </div>
      <div style={styles.right}>
        <a href="https://projectalita.ai" style={styles.link}>&copy; 2023 projectalita.ai</a>
        <img src={logo} alt="Project Alita Logo" style={styles.logo} />
      </div>
    </footer>
  );
}

// Styles for the footer
const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  },
  left: {
    display: 'flex',
    'justify-content': 'space-between'
  },
  right: {
    display: 'flex',
    'justify-content': 'space-between',
    alignItems: 'flex-end',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    'margin-right': '1rem'
  },
  logo: {
    width: '24px',
    height: '24px',
  },
};

export default Footer;