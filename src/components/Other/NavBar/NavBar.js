import React from 'react';

import Login from '../../Forms/Login/';

import './NavBar.scss';

const NavBar = () => {
    return (
        <div className="nav-bar">
            <h1>Friend Flakes</h1>
            <div className="links-container">
                <div>
                    Links Go here
                </div>
                <Login />
            </div>
        </div>
    )
}

export default NavBar;