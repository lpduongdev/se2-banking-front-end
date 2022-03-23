import React, {useContext, useState} from "react";
import "./Header.css";
import {Link, NavLink, useLocation} from "react-router-dom";
import SharedContext from "../../utils/Context";
import {
    URL_ADMIN_DASHBOARD,
    URL_DEPOSIT, URL_HOME, URL_LOAN,
    URL_LOGIN,
    URL_SAVING,
    URL_TRANSFER,
    URL_USER_DASHBOARD,
    URL_WITHDRAW
} from "../../const/routing_address";
import {useHistory} from "react-router-dom";

const Header = () => {
        const {token, isAdmin, userInfo} = useContext(SharedContext)
        const location = useLocation();
        const history = useHistory();

        const onClickLogout = async () => {
            token.set(null)
            window.localStorage.clear()

            history.push(URL_HOME)
            userInfo.set(null)

        }

        return (
            <nav className="navbar">
                <img src={require("../../assets/images/main-logo.webp")} alt="#"/>
                <div className="navbar__tabs">
                    <NavLink exact activeClassName="navbar__tab-active" className="navbar__tab" to="/">
                        <h3>Home</h3>
                    </NavLink>
                    <li className="navbar__dropdown-item">
                        <h3 className="navbar__tab">Features</h3>
                        <div className="navbar__dropdown__list">
                            <NavLink exact to={URL_TRANSFER}>Transfer money</NavLink>
                            <NavLink exact to={URL_DEPOSIT}>Deposit money</NavLink>
                            <NavLink exact to={URL_WITHDRAW}>Withdraw money</NavLink>
                            <NavLink exact to={URL_SAVING}>Money saving</NavLink>
                            <NavLink exact to={URL_LOAN}>Money loan</NavLink>
                        </div>
                    </li>
                    <NavLink exact activeClassName="navbar__tab-active" className="navbar__tab" to="/information">
                        <h3>About us</h3>
                    </NavLink>
                    {!token.get && !(location.pathname === URL_LOGIN) &&
                    <NavLink exact className={"navbar__btn-login"} to={URL_LOGIN}>
                        <h5>Login | Register</h5>
                    </NavLink>
                    }
                    {token.get && userInfo.get &&
                    <li className="navbar__dropdown-item">
                        <div className="navbar__account" style={{top: "80px"}}>
                            <NavLink className="navbar__account__info" exact to={isAdmin? URL_ADMIN_DASHBOARD: URL_USER_DASHBOARD}>
                                <div><img src={require("../../assets/images/user_ico.png")} alt="#"/></div>
                                <h3>{JSON.parse(userInfo.get).firstName}</h3>
                            </NavLink>
                        </div>
                        <div className="navbar__dropdown__list">
                            <Link to="#" onClick={onClickLogout}>Logout</Link>
                        </div>
                    </li>
                    }
                </div>

            </nav>
        );
    }
;

export default Header;
