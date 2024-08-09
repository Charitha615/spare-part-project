import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../CSS/Signin.css';

function Signin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: formData.email,
            password: formData.password
        };
        if (payload.email === 'admin' && payload.password === 'admin') {
            window.location.href = '/AdminDashboard';
        } else {

            try {
                const response = await axios.post('http://localhost:8080/api/users/login', payload);
                if (response.status === 200) {
                    console.log(response.data.user.id)
                    localStorage.setItem("userId",response.data.user.id);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Login successful. Redirecting to your dashboard...',
                        icon: 'success'
                    }).then(() => {
                        window.location.href = '/home';
                    });
                }
            } catch (error) {
                Swal.fire('Error', error.response.data.message || 'Invalid email or password', 'error');
            }
        }

    };

    return (
        <section>
            <div className="image-box">
                <img src="Photos/Wallpaper.jpg" alt="Wallpaper" />
            </div>
            <div className="content-box">
                <div className="form-box">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <span>Username / Email</span>
                            <input type="text" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <span>Password</span>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="remember">
                            <label><input type="checkbox" name="remember" /> Remember Me </label>
                        </div>
                        <div className="input-box">
                            <input type="submit" value="Sign in" name="sign" />
                        </div>
                        <div className="input-box">
                            <p> Don't have an account? <a href="/signup" target="new">Sign up</a></p>
                        </div>
                    </form>
                    <h3>Login with Social Media</h3>
                    <div className="social-media">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signin;
