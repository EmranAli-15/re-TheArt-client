import { createBrowserRouter } from "react-router-dom";
import Prime from "../Layout/Prime";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";


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
                path: '/login',
                element: <Login></Login>
            },
        ]
    },
]);

export default router