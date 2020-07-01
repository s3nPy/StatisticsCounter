import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const NavBar = () => {
    const { logout, isAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const links = isAuthenticated ? (
        <>
            <li><NavLink exact to="/">Counters</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/logout" onClick={handleLogout}>Logout</NavLink></li>
        </>
    ) : (
        <>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink exact to="/">Sign in</NavLink></li>
        </>
    );


    return (
        <nav>
            <div className="nav-wrapper deep-purple lighten-3">
                <div className="container">
                    <span className="brand-logo">StatisticsCounter</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {links}
                    </ul>
                </div>
            </div>
        </nav>
    )
};