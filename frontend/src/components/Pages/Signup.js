import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../CSS/Signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        cpassword: '',
        copassword: ''
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

        if (formData.cpassword !== formData.copassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }

        const payload = {
            firstname: formData.fname,
            lastname: formData.lname,
            email: formData.email,
            password: formData.cpassword
        };

        try {
            const response = await axios.post('http://localhost:8080/api/users/register', payload);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'You have registered successfully. Do you want to go to the login page?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            }
        } catch (error) {
            Swal.fire('Error', error.response.data.message || 'Something went wrong', 'error');
        }
    };

    return (
        <section>
            <div className="image-box">
                <img src="Photos/valorant.jpg" alt="Valorant" />
            </div>
            <div className="content-box">
                <div className="form-box">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <span>First Name</span>
                            <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <span>Last Name</span>
                            <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <span>Email</span>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <span>Create Password</span>
                            <input type="password" name="cpassword" value={formData.cpassword} onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <span>Confirm Password</span>
                            <input type="password" name="copassword" value={formData.copassword} onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <input type="submit" value="Sign up" name="sign" />
                        </div>
                        <div className="input-box">
                            <p> Already have an account? <a href="/">Sign in</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Signup;
