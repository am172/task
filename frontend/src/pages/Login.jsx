//  import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';


const Login = () => {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const navigate = useNavigate()

        const {login} = useAuth();

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("Sending data:", {  email, password }); // تحقق من القيم هنا
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login',
                  { email, password }
                );
                
                if(response.data.success){
                  login(response.data.user)
                  localStorage.setItem("token", response.data.token)
                  navigate('/')
              }
            } catch (error) {
                console.log(error);
            }
        };
        


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='p-6 bg-white border shadow w-80'>
            <h2 className="mb-4 text-2xl font-bold">Login</h2>
            <form onSubmit={handleSubmit}>           
            <div className="mb-4">                
                <label className="block text-gray-700" htmlFor="email">email</label>
                <input onChange={(e) => setEmail(e.target.value)} type='email' className="w-full px-3 py-2 border" placeholder='enter email' required/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="password">password</label>
                <input onChange={(e) => setPassword(e.target.value)} type='password' className="w-full px-3 py-2 border" placeholder='......' required/>
            </div>

            <div className="mb-4">
            <button type="submit" className="w-full py-2 text-white bg-teal-600">
                Login</button>
                <p className="text-corner">
                    Do not have  account ? <Link to="/register">Register</Link>
                </p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
