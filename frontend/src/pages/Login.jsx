import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  axios.post('http://localhost:5000/api/login', { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
      });
  axios.get('http://localhost:5000/api/dashboard', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        username,
        password,
      });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: "url('./src/assets/background.jpg')" }}>
        <div className="w-full max-w-xl">
          <form
              onSubmit={handleSubmit}
              className="backdrop-blur-xl space-y-6 border border-black/10 p-10 rounded-xl text-white text-center shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 drop-shadow text-white">
              Employee Management System
            </h3>

            <h3 className="text-2xl font-bold text-lg mb-4">LOGIN</h3>

            <div className="space-y-4 text-left">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full backdrop-blur-2xl border border-white/10 p-2 rounded-lg text-amber-50 shadow-lg"
              />

              <label htmlFor="username" className="block text-sm font-medium">Username</label>
              <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full backdrop-blur-2xl border border-white/10 p-2 rounded-lg text-amber-50 shadow-lg"
              />

              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full backdrop-blur-2xl border border-white/10 p-2 rounded-xl text-white shadow-lg"
              />
            </div>

            <button
                type="submit"
                className="bg-green-700 px-4 py-2 rounded-lg hover:bg-emerald-950 hover:text-white transition-colors duration-300 shadow-lg mx-auto"
            >
              LOGIN
            </button>

            <div className="mt-4">
              <a href="#" className="text-lg text-blue-500 hover:underline">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;