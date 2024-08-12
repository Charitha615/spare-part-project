import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import '../CSS/Store.css';

const BASE_URL = "http://localhost:8080/api/vehicleTypes";
const IMAGE_BASE_URL = "http://localhost:8080";

function Store() {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(BASE_URL)
            .then(response => {
                setVehicleTypes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the vehicle types!', error);
            });
    }, []);

    return (
        <div>

            <nav className="navigation">
                <a href="Index.html" className="logo">AutoUD</a>
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
            <button onClick={() => navigate(-1)} className="back-button" style={{marginTop:100}}>Back</button> {/* Back Button */}

            <section id="Categories">

                <h2>Categories</h2>

                <div className="category-container">
                    {vehicleTypes.map(vehicle => (
                        <Link key={vehicle.id} to={`/brands/${vehicle.id}`} className="category-box">
                            <img src={`${IMAGE_BASE_URL}/${vehicle.url}`} alt={vehicle.name} />
                            <span>{vehicle.name}</span>
                        </Link>
                    ))}
                </div>
            </section>
            <footer>
                <div className="footer-container">
                    <div className="footer-logo-container">
                        <div className="footer-logo"> <a href="Index.html"> AutoUD </a></div>
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

export default Store;
