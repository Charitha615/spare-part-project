import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CSS/Checkout.css';

const API_URL = "http://localhost:8080/api/checkout";  // Sample API URL

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart } = location.state;
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        phone: '',
        status: 0,
        bankZip: null,
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            bankZip: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('userId');  // Retrieve user ID from localStorage

        const items = cart.map(item => ({
            itemId: item.id,
            quantity: item.quantity
        }));

        const data = {
            userId: userId,
            total: total,
            paymentMethod: paymentMethod,
            ...formData,
            items: JSON.stringify(items) // Convert items to JSON string
        };

        try {
            const response = await axios.post(API_URL, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire('Success!', 'Checkout successful!', 'success').then(() => {
                navigate('/home');
            });
        } catch (error) {
            Swal.fire('Error!', 'There was an error during the checkout process.', 'error');
            console.error('There was an error during the checkout process:', error);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="cart-summary">
                <h3>Cart Summary</h3>
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            <p>{item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                        </li>
                    ))}
                </ul>
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
            <div className="payment-method">
                <h3>Select Payment Method</h3>
                <label>
                    <input type="radio" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={handlePaymentMethodChange} />
                    Cash on Delivery
                </label>
                <label>
                    <input type="radio" value="Bank Transfer" checked={paymentMethod === 'Bank Transfer'} onChange={handlePaymentMethodChange} />
                    Bank Transfer
                </label>
                <label>
                    <input type="radio" value="Card Payment" disabled onChange={handlePaymentMethodChange} />
                    Card Payment ( Coming Soon ..... )
                </label>
            </div>
            {paymentMethod === 'Bank Transfer' && (
                <div className="bank-transfer-details">
                    <h4>Bank Details</h4>
                    <p>Bank Name: XYZ Bank</p>
                    <p>Account Number: 1234567890</p>
                    <p>Branch: Main Branch</p>
                    <p>IFSC Code: XYZ0001234</p>
                    <p>Please upload a valid bank transfer receipt (zip file) upon full payment.</p>
                    <input type="file" name="bankZip" onChange={handleFileChange} />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="shipping-address">
                    <h3>Shipping Address</h3>
                    <label>
                        Country/Region
                        <select name="country" onChange={handleInputChange} required>
                            <option value="Sri Lanka">Sri Lanka</option>
                            {/* Add other countries as needed */}
                        </select>
                    </label>
                    <label>
                        First name
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Last name
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Company (optional)
                        <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
                    </label>
                    <label>
                        Address
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Apartment, suite, etc. (optional)
                        <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} />
                    </label>
                    <label>
                        City
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Postal code (optional)
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                    </label>
                    <label>
                        Phone
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </label>
                </div>
                <button type="submit" className="checkout-btn">Proceed to Payment</button>
            </form>
        </div>
    );
}

export default Checkout;
