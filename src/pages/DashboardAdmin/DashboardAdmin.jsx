import "./DashboardAdmin.css"
import {NavLink, useHistory} from "react-router-dom";
import {URL_HOME, URL_TRANSFER} from "../../const/routing_address";
import AnimatedPage from "../../utils/AnimatedPage";
import React, {useContext} from "react";
import SharedContext from "../../utils/Context";
import {GET_USER_PROFILE} from "../../const/key_storage";
import {confirm} from "react-confirm-box";
import {OK_ONLY} from "../../const/dialog_styling";

const DashboardUser = () => {
    const {userInfo, isAdmin} = useContext(SharedContext)
    const history = useHistory()

    return (
        <AnimatedPage>
            {isAdmin &&
            <div className="container">
                <div className="functions">
                    <div className="functions-container">
                        <div className="functions__btn-item">
                            <NavLink exact to={URL_TRANSFER}>
                                <button className="transfer">Transfer</button>
                            </NavLink>
                        </div>
                        <div className="functions__btn-item">
                            <button className="deposit">Deposit</button>
                        </div>
                        <div className="functions__btn-item">
                            <button className="withdraw">Withdraw</button>
                        </div>
                        <div className="functions__btn-item">
                            <button className="saving">Saving</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="functions__btn-item">
                            <button className="loan">Loan</button>
                        </div>
                        <div className="functions__btn-item">
                            <button className="history">Transfer history</button>
                        </div>
                        <div className="functions__btn-item">
                            <button className="extra1">Transfer</button>
                        </div>
                        <div className="functions__btn-item">
                            <button className="extra2">Transfer</button>
                        </div>
                    </div>
                </div>
                <div className="user-container">
                    <div className="user-container__avatar">
                        <img alt="#" src={require("../../assets/images/user_ico.png")}/>
                    </div>
                    <div className="user-container__info">
                        <div className="user-container__info__username">
                            <h2 className="username">{JSON.parse(userInfo).get.firstName}</h2>
                            <button className="btn-edit-profile">Edit profile</button>
                        </div>
                        <p>Current balance:</p>
                        <h4>0 VND </h4>
                    </div>
                    <div className="user-container__more-info">
                        <h3>Account type: </h3>
                        <p><i>Administrator</i></p>
                        <h3>Created day: </h3>
                        <p><i>01/01/2022</i></p>
                    </div>
                </div>
            </div>}
            {!isAdmin && confirm("You doesn't have privilege to access this domain!!", OK_ONLY) && history.push(URL_HOME)}
        </AnimatedPage>
    )
}
export default DashboardUser