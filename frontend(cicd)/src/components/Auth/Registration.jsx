import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      const hashedPassword = await bcrypt.hash(passwordRef.current.value, 10);

      const userData = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: hashedPassword,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Registration Successful!");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      toast.error("Passwords don't match!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl h-[700px] bg-white p-10 rounded-2xl shadow-2xl flex flex-col justify-center relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-sky-200 via-pink-200 to-purple-200 blur-2xl opacity-50"></div>

        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8 relative z-10">
          Create Your Account
        </h2>

        <form
          className="relative space-y-6 bg-white p-8 rounded-xl shadow-lg z-10"
          onSubmit={handleRegistration}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                ref={usernameRef}
                type="text"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Create password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                ref={confirmPasswordRef}
                type="password"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-4 px-4 text-lg font-bold rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
            >
              Register
            </button>
          </div>

          <div className="text-sm text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              Already have an account? Login
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme="dark" />
      </div>
    </div>
  );
};

export default Registration;
