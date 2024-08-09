import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Cart.css';

function Cart({ cart }) {
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleCheckout = () => {
        navigate('/checkout', { state: { cart } });
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={`cart-container ${isMinimized ? 'minimized' : ''}`}>
            <button className="minimize-btn" onClick={toggleMinimize}>
                {isMinimized ? '>' : '<'}
            </button>
            {!isMinimized && (
                <>
                    <h2>Cart</h2>
                    {cart.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        <>
                            <ul>
                                {cart.map(item => (
                                    <li key={item.id} className="cart-item">
                                        <img src={`http://localhost:8080/${item.images[0]}`} alt={item.name} />
                                        <div>
                                            <p>{item.name}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ${item.price}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="cart-total">
                                <h3>Total: ${total.toFixed(2)}</h3>
                            </div>
                            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Cart;
