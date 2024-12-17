import React from 'react';
import '../../assets/User/Navbar.css'

const Navbar = () => {
    return (
        <div className={'user-navbar'}>
            <h1>Logo</h1>
            <ul>
                <li>Home</li>
                <li>Books</li>
                <li>Contact</li>
            </ul>
        </div>
    );
};

export default Navbar;