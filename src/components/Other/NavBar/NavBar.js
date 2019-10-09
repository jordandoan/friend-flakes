import React from 'react';
import { NavLink } from 'react-router-dom';

import LoginForm from '../../Forms/LoginForm/';

import './NavBar.scss';

const NavBar = () => {
    return (
        <div className="nav-bar">
            <h1>Friend Flakes</h1>
            <div className="links-container">
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Leaderboards</NavLink>
                    <NavLink to="/">Sign Up</NavLink>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

export default NavBar;