import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Store from './components/Pages/Store';
import Brands from './components/Pages/Brands';
import ItemList from './components/Pages/ItemList';
import ItemView from './components/Pages/ItemView';
import Cart from './components/Cart';
import Index from './components/Pages/Index';
import Signin from './components/Pages/Signin';
import Signup from './components/Pages/Signup';
import HomePage from './components/Pages/HomePage';
import ContactUs from './components/Pages/ContactUs';
import SearchButton from './components/SearchButton';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminVehicleTypes from './components/Admin/AdminVehicleTypes';
import AdminBrands from './components/Admin/AdminBrands';
import AdminSpareParts from './components/Admin/AdminSpareParts';
import Checkout from './components/Checkout';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    return (
        <Router>
            <MainRoutes addToCart={addToCart} cart={cart} />
        </Router>
    );
}

const MainRoutes = ({ addToCart, cart }) => {
    const location = useLocation();
    const showCart = location.pathname.includes('/sparePart/');

    return (
        <>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Index" element={<Index />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/store" element={<Store />} />
                <Route path="/brands/:vehicleTypeId" element={<Brands />} />
                <Route path="/spareParts/:vehicleTypeId/brand/:brandId" element={<ItemList />} />
                <Route path="/sparePart/:id" element={<ItemView addToCart={addToCart} />} />
                <Route path="/search" element={<SearchButton />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/vehicle-types" element={<AdminVehicleTypes />} />
                <Route path="/AdminBrands" element={<AdminBrands />} />
                <Route path="/spare-parts" element={<AdminSpareParts />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
            {showCart && <Cart cart={cart} />}
        </>
    );
}

export default App;
