import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import useStudent from '../hooks/useStudent';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [isStudent] = useStudent();
    return (
        <>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-8">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="p-4 w-64 h-full space-y-2 bg-base-200 mt-4 text-base-content">
                        {/* Sidebar content here */}
                        {
                            isAdmin &&
                            <>
                                <li> <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'active' : '')}>WELCOME</NavLink> </li>
                                <li> <NavLink to='/dashboard/manageClasses'>Manage Classes</NavLink> </li>
                                <li> <NavLink to='/dashboard/manageUsers'>Manage Users</NavLink> </li>
                            </> ||
                            isInstructor &&
                            <>
                                <li> <NavLink to='/dashboard'>WELCOME</NavLink> </li>
                                <li> <NavLink to='/dashboard/myClasses'>My Classes</NavLink> </li>
                                <li> <NavLink to='/dashboard/addClass'>Add A Class</NavLink> </li>
                                <li> <NavLink to='/dashboard/feedback'>Feedback</NavLink> </li>
                            </> ||
                            isStudent &&
                            <>
                                <li> <NavLink to='/dashboard'>WELCOME</NavLink> </li>
                                <li> <NavLink to='/dashboard/selectedClasses'>My Selected Classes</NavLink> </li>
                                <li> <NavLink to='/dashboard/enrolledClasses'>My Enrolled Classes</NavLink> </li>
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