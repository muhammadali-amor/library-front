import React from 'react';
import '../../assets/Navbar.css'
import rasm from '../../assets/images/img.png';


const Navbar = () => {
    return (
        <div className={"navbar"}>
            <div className="logo">
                <img src={rasm} alt=""/>
                <h1>Library</h1>
            </div>
            <ul className="list">
                <li className={"li"}>Home</li>
                <li className={"li"}>Books</li>
                <li className={"li"}>Contact</li>
            </ul>
            {/*<button className="btn">*/}
            {/*    */}
            {/*</button>*/}
        </div>
    );
};

export default Navbar;