import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../CSS/Brands.css';

const BASE_URL = "http://localhost:8080/api/brands/vehicleType";
const IMAGE_BASE_URL = "http://localhost:8080";

function Brands() {
    const { vehicleTypeId } = useParams();
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/${vehicleTypeId}`)
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the brands!', error);
            });
    }, [vehicleTypeId]);

    return (
        <div>
            <nav className="navigation">
                <a href="Index.html" className="logo">GAMER'S LK</a>
                <ul className="menu">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/store" className="active">Store</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact" target="_blank">Contact Us</a></li>
                </ul>
                <div className="right-elements">
                    <a href="/search" className="search"><i className="fas fa-search"></i></a>
                    <a href="#" className="cart"><i className="fas fa-shopping-bag"></i></a>
                    <a href="#" className="user"><i className="fas fa-user"></i></a>
                </div>
            </nav>
            <section id="Categories">
                <h2>Brands</h2>
                <div className="category-container">
                    {brands.map(brand => (
                        <Link key={brand.id} to={`/spareParts/${vehicleTypeId}/brand/${brand.id}`} className="category-box">
                            <img src={`${IMAGE_BASE_URL}/${brand.url}`} alt={brand.name} />
                            <span>{brand.name}</span>
                        </Link>
                    ))}
                </div>
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

export default Brands;
