import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from '../../Forms/LoginForm/';

import './NavBar.scss';

const NavBar = (props) => {

    return (
        <div className="nav-bar">
            <h1>Friend Flakes</h1>
            <div className="links-container">
                <div className="links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Leaderboards</NavLink>
                    {!props.username && <NavLink to="/signup">Sign Up</NavLink>}
                    {props.username && <NavLink to="/logout">Log out</NavLink>}
                </div>
                {!props.username && <Route exact path={["/","/signup"]} component={LoginForm} /> }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps, {})(NavBar);