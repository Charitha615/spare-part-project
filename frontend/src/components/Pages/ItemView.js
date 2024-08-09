import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../CSS/ItemView.css';

const BASE_URL = "http://localhost:8080/api/spareParts";
const IMAGE_BASE_URL = "http://localhost:8080";

function ItemView({ addToCart }) {
    const { id } = useParams();
    const [sparePart, setSparePart] = useState(null);
    const [bigImgSrc, setBigImgSrc] = useState('');

    useEffect(() => {
        axios.get(`${BASE_URL}/${id}`)
            .then(response => {
                console.log(response.data.availableQuantity);
                setSparePart(response.data);
                setBigImgSrc(`${IMAGE_BASE_URL}/${response.data.images[0]}`);
            })
            .catch(error => {
                console.error('There was an error fetching the spare part!', error);
            });
    }, [id]);

    const showImg = (src) => {
        setBigImgSrc(src);
    };

    if (!sparePart) {
        return <div>Loading...</div>;
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
            <div className="flex-box">
                <div className="left">
                    <div className="big-img">
                        <img src={bigImgSrc} alt={sparePart.name} />
                    </div>
                    <div className="images">
                        {sparePart.images.map((img, index) => (
                            <div key={index} className="small-img">
                                <img src={`${IMAGE_BASE_URL}/${img}`} alt={sparePart.name} onClick={() => showImg(`${IMAGE_BASE_URL}/${img}`)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="right">
                    <div className="url">Store / {sparePart.category} / {sparePart.name}</div>
                    <div className="pname">{sparePart.name}</div>
                    <div className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <div className="price">${sparePart.price}</div>
                    <div className="size">
                        <p>Category:</p>
                        <div className="psize active">{sparePart.category}</div>
                    </div>
                    <div className="quantity">
                        <p>Available Quantity:     {sparePart.availableQuantity}</p>
                        {/*<input type="text" min="1" max={sparePart.availableQuantity} defaultValue="1" />*/}
                    </div>
                    <div className="btn-box">
                        <button className="cart-btn" onClick={() => addToCart(sparePart)}>Add to Cart</button>
                        <button className="buy-btn">Buy Now</button>
                    </div>
                </div>
            </div>
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

export default ItemView;
