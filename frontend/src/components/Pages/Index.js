import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Index.css';

function Index() {
    return (
        <div className="heading">
            <video autoPlay loop muted playsInline className="bg-video">
                <source src="Photos/bg video.mp4" type="video/mp4" />
            </video>
            <nav>
                <img src="photos/logo.png" className="logo" alt="logo" />
                <ul>
                    <li><Link to="/signin" className="active">Sign In</Link></li>
                    <li><Link to="/signup" target="_blank">Sign Up</Link></li>
                </ul>
            </nav>
            <div className="content">
                <h1>GAMER'S LK</h1>
                <Link to="/home">Explore</Link>
            </div>
            <section className="footer">
                <div className="social">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-snapchat"></i></a>
                </div>
                <ul className="footer-list">
                    <li><a href="#">Services</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="/contact" target="_blank">Contact Us</a></li>
                </ul>
            </section>
        </div>
    );
}

export default Index;
