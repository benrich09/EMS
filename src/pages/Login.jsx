import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'admin') {
      navigate('/admin');
    } else if (email === 'user@example.com' && password === 'user') {
      navigate('/dashboard');
    }else {
      alert('invalid details')
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-cyan-50 to-emerald-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Employees Management System
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 text-sm font-medium">Email Address</label>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 transition-all duration-300"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                  placeholder="Enter your password"
                  required
              />
            </div>
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white p-3 rounded-lg hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
  );
}