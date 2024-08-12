import React from 'react';
import '../CSS/HomePage.css';

function HomePage() {
    return (
        <div>
            <nav className="navigation">
                <a href="Index.html" className="logo">GAMER'S LK</a>
                <input type="checkbox" className="menu-btn" id="menu-btn" />
                <label htmlFor="menu-btn" className="menu-icon">
                    <span className="nav-icon">
                        <i className="fas fa-bars"></i>
                    </span>
                </label>
                <ul className="menu">
                    <li><a href="#" className="active">Home</a></li>
                    <li><a href="/store">Store</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact" target="_blank">Contact Us</a></li>
                </ul>
                <div className="right-elements">
                    <a href="/search" className="search"><i className="fas fa-search"></i></a>
                    <a href="#" className="cart"><i className="fas fa-shopping-bag"></i></a>
                    <a href="#" className="user"><i className="fas fa-user"></i></a>
                </div>
            </nav>
            <section id="main">
                <div className="main-content">
                    <div className="main-text">
                        <span>Collection</span>
                        <h1>Most Valuable Accounts with Most Trusted</h1>
                        <p>Visit to purchase an account at a location of your choice that is highly valuable, secure and responsible</p>
                        <a href="#">Shop Now</a>
                    </div>
                    <div className="main-img">
                        <img src="Photos/home.png" alt="autoud" />
                    </div>
                </div>
            </section>
            <section id="Categories">
                <h2>Categories</h2>
                <div className="category-container">
                    <a href="#" className="category-box">
                        <img src="Photos/cricket.jpg" alt="Category" />
                        <span>Sports</span>
                    </a>
                    <a href="#" className="category-box">
                        <img src="Photos/call of duty.png" alt="Category" />
                        <span>Action</span>
                    </a>
                    <a href="#" className="category-box">
                        <img src="Photos/lol 1.jpg" alt="Category" />
                        <span>MOBA</span>
                    </a>
                    <a href="#" className="category-box">
                        <img src="Photos/PUBG-PNG-Image.png" alt="Category" />
                        <span>Battle Royal</span>
                    </a>
                    <a href="/Brands" className="category-box">
                        <img src="Photos/coc.jpg" alt="Category" />
                        <span>Mobile Strategy</span>
                    </a>
                </div>
            </section>
            <section id="feature-product">
                <h2>Boost-Up Your League</h2>
                <div className="feature-product-container">
                    <div className="feature-product-box">
                        <div className="product-feature-img">
                            <img src="Photos/challenger.jpg.png" alt="Challenger" />
                        </div>
                        <div className="product-feature-text-container">
                            <div className="product-feature-text">
                                <strong>Challenger League</strong>
                                <span>$299.00</span>
                            </div>
                            <div className="cart-like">
                                <a href="#"><i className="fas fa-shopping-cart"></i></a>
                                <a href="#"><i className="fas fa-heart"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="feature-product-box">
                        <div className="product-feature-img">
                            <img src="Photos/grand master.png" alt="Grand Master" />
                        </div>
                        <div className="product-feature-text-container">
                            <div className="product-feature-text">
                                <strong>Grand-Master League</strong>
                                <span>$199.00</span>
                            </div>
                            <div className="cart-like">
                                <a href="#"><i className="fas fa-shopping-cart"></i></a>
                                <a href="#"><i className="fas fa-heart"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="feature-product-box">
                        <div className="product-feature-img">
                            <img src="Photos/master.png" alt="Master" />
                        </div>
                        <div className="product-feature-text-container">
                            <div className="product-feature-text">
                                <strong>Master League</strong>
                                <span>$99.00</span>
                            </div>
                            <div className="cart-like">
                                <a href="#"><i className="fas fa-shopping-cart"></i></a>
                                <a href="#"><i className="fas fa-heart"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="banner">
                <div className="banner-text">
                    <strong>Town Hall 14 Max</strong>
                    <span>From $450</span>
                    <p>Here's a great opportunity for you!! Special discount for a TH 14 Max very valuable base</p>
                    <a href="#">Shop Now</a>
                </div>
                <div className="banner-img">
                    <img src="Photos/coc 2.jpg" alt="banner" />
                </div>
            </section>
            <section id="news">
                <h3>Dress-up your heroes</h3>
                <div className="news-box-container">
                    <div className="news-box">
                        <div className="news-img">
                            <img src="Photos/coc.png" alt="news" />
                            <div className="news-lable">New</div>
                        </div>
                        <div className="news-text">
                            <strong>Warrior Queen Skin</strong>
                            <span> Legendary | Products </span>
                            <a href="#">Read More</a>
                        </div>
                    </div>
                    <div className="news-box">
                        <div className="news-img">
                            <img src="Photos/king.png" alt="news" />
                            <div className="news-lable">New</div>
                        </div>
                        <div className="news-text">
                            <strong>Fierce King Skin</strong>
                            <span> Standard | Products </span>
                            <a href="#">Read More</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chatbot Integration */}
            <section id="chatbot">
                <iframe
                    src="https://www.chatbase.co/chatbot-iframe/BugazHm7y0f1NHtmyZjGH"
                    width="100%"
                    height="500px"
                    style={{ border: 'none' }}
                    allow="microphone; autoplay; encrypted-media;"
                ></iframe>
            </section>

            <footer>
                <div className="footer-container">
                    <div className="footer-logo-container">
                        <div className="footer-logo"> <a href="Index.html"> Gamer's LK </a></div>
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

export default HomePage;
