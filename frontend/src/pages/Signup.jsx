//  import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const navigate = useNavigate()

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("Sending data:", { name, email, password }); // تحقق من القيم هنا
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register',
                    { name, email, password });

                    if(response.data.success){
                        navigate('/login')
                    }
            } catch (error) {
                console.log(error);
            }
        };
        


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='bg-white p-6 border shadow w-80'>
            <h2 className="text-2xl font-bold mb-4">signup</h2>
            <form onSubmit={handleSubmit}>            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="name">name</label>
                <input 
                type='text'
                 placeholder='enter name' 
                 className="w-full px-3 py-2 border"
                 onChange={(e) => setName(e.target.value)}
                 required/>
            </div>
            <div className="mb-4">                
                <label className="block text-gray-700" htmlFor="email">email</label>
                <input onChange={(e) => setEmail(e.target.value)} type='email' className="w-full px-3 py-2 border" placeholder='enter email' required/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="password">password</label>
                <input onChange={(e) => setPassword(e.target.value)} type='password' className="w-full px-3 py-2 border" placeholder='......' required/>
            </div>

            <div className="mb-4">
            <button type="submit" className="w-full bg-teal-600 text-white py-2">
                signup</button>
                <p className="text-corner">
                    already have an account ? <Link to="/login">Login</Link>
                </p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
