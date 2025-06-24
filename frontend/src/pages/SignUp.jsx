
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();



    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(name, email, password)
    console.log(import.meta.env.VITE_BACKEND_URL)
    const submit = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, { name, email, password }, { withCredentials: true })
            .then(result => {
                console.log('Response:', result.data); // Log response data
                console.log('Guest Signup Response:', result.data); // Log response data
                const userData = result.data.user;
                console.log(userData.user);
                localStorage.setItem("user", JSON.stringify(userData))
                console.log(userData)
                // Navigate to the dashboard after guest signup
                navigate('/dashboard');
                window.location.reload(); // Reload the page to reflect the new user state
            })
            .catch(error => {
                console.error('Error:', error); // Log error if there is one
            });
    }

    const handleGuestSignup = () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/guest`, {}, { withCredentials: true })
            .then(result => {
                console.log('Guest Signup Response:', result.data); // Log response data
                const userData = result.data.user;
                console.log(userData.user);
                localStorage.setItem("user", JSON.stringify(userData))
                console.log(userData)
                // Navigate to the dashboard after guest signup
                navigate('/dashboard');
                window.location.reload(); // Reload the page to reflect the new user state
            })
            .catch(error => {
                console.error('Guest Signup Error:', error); // Log error if there is one
            });
    };
    return (
        <>
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">
                        Sign Up
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                        Create your account to get started. It’s free and easy!
                    </p>
                    <button
                        onClick={handleGuestSignup}
                        type="submit"
                        className="w-full mt-5 bg-blue-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Continue without account
                    </button>
                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter your name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-white text-sm font-medium mb-1"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-white text-sm font-medium mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>


                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Create Account
                        </button>

                    </form>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 dark:text-blue-400 font-semibold hover:underline"
                        >
                            Log in

                        </Link>

                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;