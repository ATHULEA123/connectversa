import React, { useState } from "react";
import axios from "axios";
import image from "../../assets/connectversa.jpg";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        rememberMe: false // Add rememberMe state
    });
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [success, setSuccess] = useState(null);
    
    const navigate = useNavigate(); 

    const toggleForm = () => {
        setIsRegister(!isRegister);
        setError(null);
        setSuccess(null);
        setValidationErrors({});
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value // Handle checkbox value
        });
    };

    const validate = () => {
        let errors = {};
        
        if (isRegister && !formData.username.trim()) {
            errors.username = "Username is required";
        }
        
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const url = isRegister ? 'http://localhost:3000/register' : 'http://localhost:3000/login';
            const response = await axios.post(url, formData);
            setSuccess('Success!');

            setError(null);

            // If rememberMe is checked, store email and password in localStorage
            if (formData.rememberMe) {
                localStorage.setItem('email', formData.email);
                localStorage.setItem('password', formData.password);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            if (isRegister) {
                setTimeout(() => {
                    setIsRegister(false);
                }, 1000); 
            }else{
                setTimeout(() => {
                    navigate('/Dahboard');
                }, 1000); 
            }

            // if (isRegister) {
            //     navigate('/login');
            // } else {
            //     navigate('/dashboard');
            // }



        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            setSuccess(null);
        }
    };

    // Load saved credentials from localStorage
    useState(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setFormData({
                ...formData,
                email: savedEmail,
                password: savedPassword,
                rememberMe: true
            });
        }
    }, []);

    return (
        <div className="flex justify-center gap-12 p-8 shadow-inner">
            <div className="relative flex flex-col items-center">
                <p className="absolute text-[28px] text-white">ConnectVersa</p>
                <img src={image} className="max-w-lg min-h-[600px] rounded-lg" />
            </div>
            <div className="flex flex-col gap-8">
                <h3 className="text-4xl text-center">{isRegister ? 'Create Account' : 'Login'}</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {isRegister && (
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`text-lg px-4 py-2 border-b ${validationErrors.username ? 'border-red-500' : 'border-gray-700'} bg-transparent focus:outline-none`}
                            />
                            {validationErrors.username && <p className="text-red-500 text-sm">{validationErrors.username}</p>}
                        </div>
                    )}
                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`text-lg px-4 py-2 border-b ${validationErrors.email ? 'border-red-500' : 'border-gray-700'} bg-transparent focus:outline-none`}
                        />
                        {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`text-lg px-4 py-2 border-b ${validationErrors.password ? 'border-red-500' : 'border-gray-700'} bg-transparent focus:outline-none`}
                        />
                        {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
                    </div>
                    {!isRegister && (
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                    <div className="flex flex-col gap-5">
                        <button type="submit" className="w-72 h-14 bg-black text-white rounded-lg">
                            {isRegister ? 'CREATE ACCOUNT' : 'LOGIN'}
                        </button>
                        {!isRegister && (
                            <a href="/forgot-password"
                                type="button"
                                className="w-72 h-14 bg-transparent text-black border border-none rounded-lg"
                                onClick={() => {}}
                            >
                                Forgot password?
                            </a>
                        )}
                    </div>
                    <div className="text-center mt-8">
                        <p>
                            {isRegister ? (
                                <>
                                    Already Have an Account? <a href="#" onClick={toggleForm} className="text-blue-500">Sign in</a>
                                </>
                            ) : (
                                <>
                                    Don't have an account? <a href="#" onClick={toggleForm} className="text-blue-500">Create one</a>
                                </>
                            )}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginSignup;