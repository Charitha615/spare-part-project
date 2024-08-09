import React from 'react';
import './CSS/SearchButton.css';

function SearchButton() {
    return (
        <div>
            <nav className="navigation">
                <a href="Index.html" className="logo">GAMER'S LK</a>
                <ul className="menu">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/Pages/Store">Store</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact" target="_blank">Contact Us</a></li>
                </ul>
                <div className="right-elements">
                    <a href="/search" className="search"><i className="fas fa-search"></i></a>
                    <a href="#" className="cart"><i className="fas fa-shopping-bag"></i></a>
                    <a href="#" className="user"><i className="fas fa-user"></i></a>
                </div>
            </nav>
            <div className="search-box">
                <input className="search-txt" type="text" name="" placeholder="Type to Search" />
                <a className="search-btn" href="#">
                    <i className="fas fa-search"></i>
                </a>
            </div>
        </div>
    );
}

export default SearchButton;
