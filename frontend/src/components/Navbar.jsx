// import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider';

const Navbar = ({ setQuery }) => {
    const { user, logout } = useAuth();

    return (
        <nav className='flex items-center justify-between p-4 text-white bg-gray-800'>
            <div className='text-base font-bold sm:text-sm md:text-base'>
                <Link to="/">TaskApp</Link>
            </div>


            <input
                type="text"
                placeholder="search tasks"
                className="w-full px-2 py-1 bg-gray-600 rounded max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]"
                onChange={(e) => setQuery(e.target.value)}
            />


            <div className='flex items-center'>
                {!user ? (
                    <>
                        <Link to='/login' className='px-3 py-2 mr-2 transition bg-blue-500 rounded hover:bg-blue-600'>
                            Login
                        </Link>
                        <Link to='/register' className='px-3 py-2 mr-2 transition bg-green-500 rounded hover:bg-green-600'>
                            Signup
                        </Link>
                    </>
                ) : (
                    <>
                        <span className='px-3 py-2 mr-2 font-medium text-white bg-gray-700 rounded'>
                            {user.name.split(" ")[0]}
                        </span>
                        <button className='px-3 py-2 transition bg-red-500 rounded hover:bg-red-600' onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>

    )
};

export default Navbar
