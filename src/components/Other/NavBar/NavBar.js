import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import LoginForm from '../../Forms/LoginForm/';

import './NavBar.scss';

const NavBar = (props) => {

    return (
        <div className="nav-bar">
            <h1>Friend Flakes</h1>
            <div className="links-container">
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Leaderboards</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
                <Route exact path={["/","/signup"]}><LoginForm history={props.history}/></Route>
            </div>
        </div>
    )
}

export default NavBar;