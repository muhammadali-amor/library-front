import React from 'react';
import Navbar from "../component/Navbar.jsx";
import Books from "../pages/Books.jsx";

const UserLayout = () => {
    return (
        <div>
            <Navbar/>
            <Books/>
        </div>
    );
};

export default UserLayout;