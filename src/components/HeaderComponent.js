import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState(null);
    const [homeLink, setHomeLink] = useState('/'); // Link mặc định

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username);
            const userRole = AuthService.getCurrentUserRole();
            setRole(userRole);

            // Đặt homeLink dựa trên vai trò của người dùng
            if (userRole === 0) {
                setHomeLink('/employee'); // Admin or employee role
            } else if (userRole === 1) {
                setHomeLink('/user'); // User role
            }
        }
    }, []);

    const logout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>
                    <Link to={homeLink} className="navbar-brand">Employee Management App</Link>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {isLoggedIn && (
                            <>
                                {role === 0 && (
                                    <li className="nav-item">
                                        <Link to="/employee" className="nav-link">Employees</Link>
                                    </li>
                                )}
                                {role === 1 && (
                                    <li className="nav-item">
                                        <Link to="/cart" className="nav-link">Cart</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav mr-auto">
                        {isLoggedIn && (
                            <>
                                {role === 0 && (
                                    <li className="nav-item">
                                        <Link to="/order-view" className="nav-link">Order</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {username}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
