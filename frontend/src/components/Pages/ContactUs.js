import React from 'react';
import '../CSS/ContactUs.css';

function ContactUs() {
    return (
        <div>
            <nav className="navigation">
                <a href="Index.html" target="_new" className="logo">GAMER'S LK</a>
                <ul className="menu">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/store">Store</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact" className="active">Contact Us</a></li>
                </ul>
                <div className="right-elements">
                    <a href="/search" className="search"><i className="fas fa-search"></i></a>
                    <a href="#" className="cart"><i className="fas fa-shopping-bag"></i></a>
                    <a href="#" className="user"><i className="fas fa-user"></i></a>
                </div>
            </nav>
            <section className="contact">
                <div className="content">
                    <h2>Contact Us</h2>
                    <p>Welcome to GLK Support Center</p>
                </div>
                <div className="container">
                    <div className="contactInfo">
                        <div className="box">
                            <div className="icon"><i className="fa-solid fa-location-dot"></i></div>
                            <div className="text">
                                <h3>Address</h3>
                                <p>Sri Lanka, Australia</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon"><i className="fas fa-phone"></i></div>
                            <div className="text">
                                <h3>Phone</h3>
                                <p>(071) 4617115</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                            <div className="text">
                                <h3>Email</h3>
                                <p>gamerslkonline@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="contactForm">
                        <form>
                            <h2>Send Message</h2>
                            <div className="inputBox">
                                <input type="text" name="" required="required" />
                                <span>Full Name</span>
                            </div>
                            <div className="inputBox">
                                <input type="text" name="" required="required" />
                                <span>Email</span>
                            </div>
                            <div className="inputBox">
                                <textarea required="required"></textarea>
                                <span>Type your Message</span>
                            </div>
                            <div className="inputBox">
                                <input type="submit" name="" value="Send" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <footer>
                <div className="footer-container">
                    <div className="footer-logo-container">
                        <div className="footer-logo"> <a href="Index.html" target="_new"> Gamer's LK </a></div>
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

export default ContactUs;
