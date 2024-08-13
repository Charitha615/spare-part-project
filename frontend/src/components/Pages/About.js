import React from "react";
import "../CSS/About.css";

function About() {
  return (
    <div>
      {/* Navigation */}
      <nav className="navigation">
        <a href="/" className="logo">GAMER'S LK</a>
        <ul className="menu">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/">Store</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
        <div className="right-elements">
          <a href="/search" className="search"><i className="fas fa-search"></i></a>
          <a href="/cart" className="cart"><i className="fas fa-shopping-bag"></i></a>
          <a href="/user" className="user"><i className="fas fa-user"></i></a>
        </div>
      </nav>

      {/* About Container */}
      <div className="container">
        <h1>World-Leading Peer 2 Peer Digital Marketplace</h1>
        <h2>Buy, sell, and discover exclusive digital items</h2>
        <div className="button">
          <a href="/store" target="new">marketplace</a>
        </div>
        <div className="image">
          <img src="Photos/LK logo BLACK.png" alt="Logo" />
        </div>
        <h3>Who We Are</h3>
        <p>GLK is a World-Leading Digital Marketplace...</p>
      </div>

      {/* Values Section */}
      <section id="Categories">
        <h2>Our Values</h2>
        <div className="category-container">
          <a href="#" className="category-box">
            <img src="Photos/user.png" alt="Category" />
            <span>People</span>
            <p>Diversity is the mother of creativity...</p>
          </a>
          <a href="#" className="category-box">
            <img src="Photos/good.png" alt="Category" />
            <span>Customer Happiness</span>
            <p>The ultimate pleasure of computer gaming...</p>
          </a>
          <a href="#" className="category-box">
            <img src="Photos/heart.png" alt="Category" />
            <span>Passion</span>
            <p>The only way to do great work...</p>
          </a>
          <a href="#" className="category-box">
            <img src="Photos/quality.png" alt="Category" />
            <span>Quality</span>
            <p>Quality products are the essentials...</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-logo-container">
            <div className="footer-logo">
              <a href="/">Gamer's LK</a>
            </div>
            <span>Copyright 2022 - Glorious LK</span>
            <div className="footer-social">
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
