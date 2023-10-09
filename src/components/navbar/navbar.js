import React from 'react';
import './navbar.css';
import logo from '../../logo.svg';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="navbar-logo" />
            </div>
        <div className="navbar-right">
            <ul className="navbar-menu">
                <li className="navbar-item"><a href="#about" className="navbar-link">ABOUT</a></li>
                <li className="navbar-item"><a href="#products" className="navbar-link">PRODUCTS</a></li>
                <li className="navbar-item"><a href="#docs" className="navbar-link">DOCS</a></li>
            </ul>
            <button className="navbar-demo-btn">Schedule a Demo</button>
        </div>
    </div>
    );
};

export default Navbar;