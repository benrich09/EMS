import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic; replace with API call (e.g., /api/login)
    if (email === 'admin@example.com') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome Back</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 text-sm font-medium">Email Address</label>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                  placeholder="Enter your email"
                  required
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                  placeholder="Enter your password"
                  required
              />
            </div>
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200">
              Create Account
            </Link>
          </p>
        </div>
      </div>
  );
}