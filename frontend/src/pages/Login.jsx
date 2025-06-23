import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Button clicked");

        // Send a POST request to your backend with the provided email and password
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, { email, password },
            { withCredentials: true }
        )
            .then((result) => {
                console.log(result);
                const userData = result.data.user;
                console.log(userData.user);
                localStorage.setItem("user", JSON.stringify(userData))
                console.log(userData)
                // Check the email to determine the redirection path
                if (userData.role === "admin") {
                    navigate('/admin', { state: { user: userData } }); // Redirect to admin page
                } else {
                    window.location.reload();
                    navigate('/dashboard', { state: { user: userData } });
                    // Redirect to user page
                }
            })
            .catch((error) => {
                // Log the error for debugging purposes
                console.error("Error during login:", error);
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
                    Welcome Back
                </h2>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                    Log in to your account
                </p>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded transition"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;