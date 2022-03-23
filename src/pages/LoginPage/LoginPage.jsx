import "./LoginPage.css"
import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, Redirect} from "react-router-dom";
import AnimatedPage from "../../utils/AnimatedPage"
import SharedContext from "../../utils/Context";
import {confirm} from "react-confirm-box";
import {AUTO_CLOSE_DIALOG, OK_CANCEL, OK_ONLY} from "../../const/dialog_styling";
import {URL_ADMIN_DASHBOARD, URL_HOME, URL_USER_DASHBOARD} from "../../const/routing_address";
import {TXT_LOGIN, TXT_NEXT, TXT_REGISTER} from "../../const/string_storage";
import {getUserInfo, login, register, registerAdmin} from "../../api/api_config";
import {GET_USER_PROFILE, TOKEN} from "../../const/key_storage";
import {useHistory} from "react-router";


const LoginPage = () => {
    const {isAdmin, token, userInfo} = useContext(SharedContext)
    const [buttonText, setButtonText] = useState(TXT_LOGIN)
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const checkValid = async () => {

        if (!phone) {
            await confirm("Invalid phone number", OK_ONLY);
            return false;
        }
        if (!password) {
            await confirm("You have to enter password", OK_ONLY);
            return false;
        }
        return true
    }

    let dot = ".";

    const loggingEffect = () => {
        dot = dot + "."
        if (dot === ".....") dot = "."
        setButtonText(buttonText + dot)
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        if (! await checkValid()) return

        const interval = setInterval(loggingEffect, 500)

        const object = {phoneNumber: phone, password: password}
        const res = await login(object)

        clearInterval(interval)
        setButtonText(TXT_LOGIN)


        setPhone("")
        setPassword("")

        if (res.status === 1) {
            await confirm("Wrong phone number or password", OK_ONLY)
            return
        }

        if (res.status === 0) {
            const tokenString = res.data

            localStorage.setItem(TOKEN, tokenString)

            token.set(tokenString)

            let fetchedData = await getUserInfo()

            while (!fetchedData) {
                if (!(await confirm("Can't get userdata, try again?", OK_CANCEL))) {
                    return
                }
                fetchedData = await getUserInfo()
            }

            window.localStorage.setItem(GET_USER_PROFILE, JSON.stringify(fetchedData))

            userInfo.set(JSON.stringify(fetchedData))

            history.push(isAdmin ? URL_ADMIN_DASHBOARD : URL_USER_DASHBOARD)
        }
    }

    return (
        <AnimatedPage>
            <section>
                <div className="img-bg">
                    <img
                        src={require("../../assets/images/login/login_poster.jpg")}
                        alt="#"/>
                </div>
                <div className="content">
                    <div className="form">
                        <h2>{TXT_LOGIN}</h2>
                        <form action="">
                            <div className="input-form">
                                <span className="test">Phone number:</span>
                                <input  disabled={buttonText !== TXT_LOGIN} type="text" value={phone}
                                       onChange={(e) => setPhone(e.currentTarget.value)}/>
                            </div>
                            <div className="input-form">
                                <span>Password:</span>
                                <input disabled={buttonText !== TXT_LOGIN} autoComplete="" type="password" value={password}
                                       onChange={(e) => setPassword(e.currentTarget.value)}/>
                            </div>
                        </form>
                    </div>
                    <div className="input-form">
                        <input disabled={buttonText !== TXT_LOGIN}
                               type="submit"
                               onClick={handleLogin}
                               onKeyDown={handleLogin}
                               value={buttonText}/>
                    </div>
                </div>
            </section>
        </AnimatedPage>
    )
}

export default LoginPage;