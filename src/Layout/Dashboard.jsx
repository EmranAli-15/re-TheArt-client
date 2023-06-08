import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';

const Dashboard = () => {
    const isAdmin = false;
    const isInstructor = true;
    return (
        <>
        <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {
                            isAdmin ?
                                <>
                                    <li><a>Admin</a></li>
                                    <li><a>Admin</a></li>
                                </> :
                                isInstructor ?
                                    <>
                                        <li> <NavLink to='/dashboard'>My Classes</NavLink> </li>
                                        <li> <NavLink to='/dashboard/addClass'>Add A Class</NavLink> </li>
                                    </> :
                                    <>
                                        <li><a>User</a></li>
                                        <li><a>User</a></li>
                                    </>
                        }
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Dashboard;