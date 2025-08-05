import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('./src/assets/background.jpg')" }}>
        <div className="backdrop-blur-xl  space-y-6 border border-black/10 p-10 rounded-xl text-white text-center shadow-lg max-w-xl">

          <h3 className="text-2xl font-bold mb-4 drop-shadow text-white text-center">
              Employee Management System
          </h3>

          <h3 className='font-bold text-lg'>LOGIN</h3>
            
                <input
                id=''
                placeholder='Username'
                  className='backdrop-blur-2xl border border-b-amber-50-white/10 p-2 rounded-lg text-amber-50 shadow-lg'
                />
                
                <input 
                  id='Password'
                  placeholder='Password'
                  className='backdrop-blur-2xl border border-b-amber-50-white/10 p-2 rounded-xl text-white shadow-lg'
                  />

          <button
            className="bg-green-700 px-4 py-1 rounded-lg hover:bg-emerald-950 hover:text-white transition-colors duration-300 shadow-lg flex items-center justify-center mx-auto"
          >
            <span>LOGIN</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login;