import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../assets/img/navbar-logo.svg';
import Avatar from '../../assets/img/avatar.svg';

import { logout } from '../../reducers/userReducer';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';

import { API_URL } from '../../config';

import './Navbar.css';

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentDir = useSelector((state) => state.file.currentDir);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const avatar = currentUser.avatar
        ? `${API_URL + currentUser.avatar}`
        : Avatar;

    const searchHandler = (e) => {
        setSearchName(e.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if (e.target.value !== '') {
            setSearchTimeout(
                setTimeout(
                    (value) => {
                        dispatch(searchFiles(value));
                    },
                    500,
                    e.target.value
                )
            );
        } else {
            dispatch(getFiles(currentDir, 'type'));
        }
    };

    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="navbar-logo" className="navbar__logo" />
                <div className="navbar__header">MERN CLOUD</div>
                {isAuth && (
                    <input
                        value={searchName}
                        onChange={(e) => searchHandler(e)}
                        className="navbar__search"
                        type="text"
                        placeholder="Название файла..."
                    />
                )}
                {!isAuth && (
                    <div className="navbar__login">
                        <NavLink to="/login">Войти</NavLink>
                    </div>
                )}
                {!isAuth && (
                    <div className="navbar__registration">
                        <NavLink to="/registration">Регистрация</NavLink>
                    </div>
                )}

                {isAuth && (
                    <div
                        className="navbar__login"
                        onClick={() => dispatch(logout())}
                    >
                        Выход
                    </div>
                )}
                {isAuth && (
                    <NavLink to="/profile">
                        <img className="navbar__avatar" src={avatar} alt="" />
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
