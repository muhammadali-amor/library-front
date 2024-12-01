import React from 'react';
import Navbar from "../component/Navbar.jsx";
import './AdminLayout.css'
import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default AdminLayout;