import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loginpage = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const navigate = useNavigate();
    
    const login = async (e) => {
        e.preventDefault();
    
        const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve stored user data
    
        if (storedUser) {
            const isPasswordValid = await bcrypt.compare(ref2.current.value, storedUser.password); // Compare entered password with hashed password
    
            if (ref1.current.value === storedUser.username && isPasswordValid) {
                toast.success("Login Successful!");
                setTimeout(() => navigate("/electronics"), 1500); // Redirect after delay
            } else {
                toast.error("Invalid username or password!");
            }
        } else {
            toast.error("No registered user found!");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-4xl h-[700px] bg-white p-10 rounded-2xl shadow-2xl flex flex-col justify-center relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-200 via-pink-200 to-purple-200 blur-2xl opacity-50"></div>
                
                <h2 className="text-center text-3xl font-bold text-gray-900 mb-8 relative z-10">
                    Login to your account
                </h2>
                
                <form className="relative space-y-6 bg-white p-8 rounded-xl shadow-lg z-10" onSubmit={login}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                ref={ref1}
                                type="text"
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                ref={ref2}
                                type="password"
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>
    
                    <button
                        type="submit"
                        className="w-full py-4 px-4 text-lg font-bold rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
                    >
                        Sign in
                    </button>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme="dark" />
            </div>
        </div>
    );
};    

export default Loginpage;
