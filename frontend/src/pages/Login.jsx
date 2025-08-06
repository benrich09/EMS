import React from 'react';
import { useState } from 'react'
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //where to add the API endpoint for login I don't know though if u called it login, adjust accordingly
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('./src/assets/background.jpg')" }}>
        <div>
          <form className="backdrop-blur-xl space-y-6 border border-black/10 p-10 rounded-xl text-white text-center shadow-lg max-w-xl">

            <h3 className="text-2xl font-bold mb-4 drop-shadow text-white text-center">
              Employee Management System
            </h3>

            <h3 className='font-bold text-lg'>LOGIN</h3>

            <input
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              className='backdrop-blur-2xl border border-b-amber-50-white/10 p-2 rounded-lg text-amber-50 shadow-lg'
            />

            <input
              id='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='backdrop-blur-2xl border border-b-amber-50-white/10 p-2 rounded-xl text-white shadow-lg'
            />

            <button
              className="bg-green-700 px-4 py-1 rounded-lg hover:bg-emerald-950 hover:text-white transition-colors duration-300 shadow-lg flex items-center justify-center mx-auto"
              onClick={handleSubmit}>
              <span>LOGIN</span>
            </button>

            <a href="#" className="text-lg text-blue-500 hover:underline">Forgot Password?</a>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login;