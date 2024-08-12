import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../CSS/Brands.css';

const BASE_URL = "http://localhost:8080/api/spareParts/vehicleType";
const IMAGE_BASE_URL = "http://localhost:8080";

function ItemList() {
    const { vehicleTypeId, brandId } = useParams();
    const [spareParts, setSpareParts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/${vehicleTypeId}/brand/${brandId}`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setSpareParts(response.data);
                } else {
                    setError('No spare parts found for the selected vehicle type and brand.');
                }
            })
            .catch(error => {
                setError('There was an error fetching the spare parts!');
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [vehicleTypeId, brandId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

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
            <button onClick={() => navigate(-1)} className="back-button" style={{marginTop:150}}>Back</button> {/* Back Button */}
            <section id="Categories">
                <h2>Spare Parts</h2>
                <div className="category-container">
                    {spareParts.map(part => (
                        <Link key={part.id} to={`/sparePart/${part.id}`} className="category-box">
                            <img src={`${IMAGE_BASE_URL}/${part.images[0]}`} alt={part.name} />
                            <span>{part.name}</span>
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

export default ItemList;
