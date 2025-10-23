import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from "../components/Sparkles";

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
    } else {
      alert('Invalid details');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* FIXED: Sparkles as FIXED background - z-0 */}
      <Sparkles
        id="login-sparkles"
        className=""
        background="radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), 
                    radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.4) 0%, transparent 50%), 
                    radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)"
        particleSize={4}        // INCREASED
        minSize={2}             // INCREASED
        maxSize={8}             // INCREASED
        speed={12}              // INCREASED
        particleColor="from-blue-400 via-indigo-400 to-cyan-400"
        particleDensity={120}   // INCREASED
      />

      {/* FIXED: Main container - REMOVED overflow-hidden */}
      <div className="relative z-50 w-full max-w-md"> {/* z-50 to be above sparkles */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden transform transition-all duration-700 hover:scale-105 sm:hover:scale-[1.02]">
          
          {/* Logo/Icon */}
          <div className="text-center p-6 sm:p-8">
            <div className="inline-flex p-3 sm:p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Employee Portal
            </h1>
            <p className="text-blue-500 text-sm sm:text-lg font-medium">Welcome Back</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-10 pb-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 sm:py-4 border-2 border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 bg-white/80 transition-all duration-300 text-base sm:text-lg placeholder-blue-400"
                  placeholder="Enter your email"
                  required
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-blue-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 sm:py-4 border-2 border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 bg-white/80 transition-all duration-300 text-base sm:text-lg placeholder-blue-400"
                  placeholder="Enter your password"
                  required
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-blue-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white py-3.5 sm:py-5 px-6 sm:px-8 rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 transition-all duration-300 font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Footer */}
          <div className="px-6 sm:px-10 pb-6 pt-4 border-t border-blue-100 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2025 Employee Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}