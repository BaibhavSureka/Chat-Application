import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post("/api/user/login", userInfo);
      if (response.data) {
        toast.success(response.data.message);
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-md"
  >
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Chat <span className="text-green-500">App</span>
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Login
      </h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-3"
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-3"
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Login Button */}
      <div className="flex items-center justify-center">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md w-full transition duration-200 ease-in-out"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>

      {/* Signup Link */}
      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm">
          New User?{" "}
          <Link to="/signup" className="text-green-500 hover:underline font-medium">
            Signup
          </Link>
        </p>
      </div>
    </form>
  </motion.div>
</div>

  );
}

export default Login;
