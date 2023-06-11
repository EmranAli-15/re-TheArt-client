import { createBrowserRouter } from "react-router-dom";
import Prime from "../Layout/Prime";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Classes from "../pages/Classes/Classes";
import SelectedClasses from "../pages/Dashboard/Student/selectedClasses";
import EnrolledClasses from "../pages/Dashboard/Student/EnrolledClasses";
import Payment from "../pages/Payment/Payment";
import AdminSecure from "./AdminSecure";
import InstructorSecure from "./InstructorSecere";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Prime></Prime>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allClasses',
                element: <Classes></Classes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // student routes
            {
                path: '/dashboard/selectedClasses',
                element: <SelectedClasses></SelectedClasses>
            },
            {
                path: '/dashboard/enrolledClasses',
                element: <EnrolledClasses></EnrolledClasses>
            },
            
            // instructor routes
            {
                path: '/dashboard/myClasses',
                element: <InstructorSecure><MyClasses></MyClasses></InstructorSecure>
            },
            {
                path: '/dashboard/addClass',
                element: <InstructorSecure><AddClass></AddClass></InstructorSecure>
            },
            {
                path: '/dashboard/payment/:id',
                element: <InstructorSecure><Payment></Payment></InstructorSecure>,
                loader: ({ params }) => (`${params.id}`)
            },

            // admin routes
            {
                path: '/dashboard/manageClasses',
                element: <AdminSecure><ManageClasses></ManageClasses></AdminSecure>
            },
            {
                path: '/dashboard/manageUsers',
                element: <AdminSecure><ManageUsers></ManageUsers></AdminSecure>
            },
        ]
    },
]);

export default router