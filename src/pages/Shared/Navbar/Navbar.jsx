import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(result => { })
            .catch(error => console.log(error.message))
    }

    const navList = <>
        <li> <NavLink to='/'>Home</NavLink> </li>
        <li> <NavLink>Instructor</NavLink> </li>
        <li> <NavLink>Classes</NavLink> </li>
        <li> <NavLink to='/dashboard'>Dashboard</NavLink> </li>
    </>

    return (
        <div className="navbar bg-base-200 rounded">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navList
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex space-x-8">
                    {
                        navList
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={handleLogout} className='btn btn-ghost btn-xs'> <NavLink to='/login'>Logout</NavLink> </button> :
                        <button className='btn btn-ghost btn-xs'> <NavLink to='/login'>Login</NavLink> </button>
                }
            </div>
        </div>
    );
};

export default Navbar;