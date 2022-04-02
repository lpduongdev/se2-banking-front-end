import "./LoginPage.css"
import React, {useContext, useEffect, useState} from "react";
import AnimatedPage from "../../utils/AnimatedPage"
import SharedContext from "../../utils/Context";
import {confirm} from "react-confirm-box";
import {OK_CANCEL, OK_ONLY} from "../../const/dialog_styling";
import {URL_ADMIN_DASHBOARD, URL_USER_DASHBOARD} from "../../const/routing_address";
import {TXT_LOGIN} from "../../const/string_storage";
import {getUserInfo, login, registerUser, registerAdmin} from "../../api/api_config";
import {USER_INFO, IS_ADMIN, TOKEN} from "../../const/key_storage";
import {useHistory} from "react-router";
import {Button, Modal} from "antd";


const LoginPage = () => {
    const {isAdmin, token, userInfo} = useContext(SharedContext)
    const [isLoading, setIsLoading] = useState(false)
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const checkValid = () => {

        if (!phone) {
            Modal.warning({
                title: 'Something went wrong',
                content: "Invalid phone number",
                onOk() {
                },
            })
            return false;
        }
        if (!password) {
            Modal.warning({
                title: 'Something went wrong',
                content: "Invalid phone password",
                onOk() {
                },
            })
            return false;
        }
        return true
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        if (!checkValid()) {
            setIsLoading(false)
            return
        }


        const object = {phoneNumber: phone, password: password}
        const res = await login(object)


        setPhone("")
        setPassword("")

        setIsLoading(false)
        if (!res.ok) {
            Modal.warning({
                title: 'Oops',
                content: "Wrong username or phone number",
                onOk() {},
            })
        } else {
            const json = await res.json()

            const tokenString = json.data

            localStorage.setItem(TOKEN, tokenString)

            token.set(tokenString)

            let fetchedData = await getUserInfo()

            if (!fetchedData.ok) {
                Modal.error({
                    title: "Oops!",
                    content: "Can't get userdata, please try again",
                    onOk() {}
                })
            } else {

                fetchedData = await fetchedData.json();

                window.localStorage.setItem(USER_INFO, JSON.stringify(fetchedData.data))

                userInfo.set(JSON.stringify(fetchedData))

                isAdmin.set(checkAdmin(fetchedData))

                if (checkAdmin(fetchedData))

                    localStorage.setItem(IS_ADMIN, "true")

                else

                    localStorage.setItem(IS_ADMIN, "false")

                history.push(isAdmin.get ? URL_ADMIN_DASHBOARD : URL_USER_DASHBOARD)
            }
        }
    }

    const checkAdmin = (fetchedData) => {
        for (const item of fetchedData.data.roles) {
            console.log("AdminCheck: " + (item.name === "admin"))
            if (item.name === "admin")
            return true
        }
        return false
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
                        <h2>LOGIN</h2>
                        <form action="">
                            <div className="input-form">
                                <span className="test">Phone number:</span>
                                <input disabled={isLoading} type="text" value={phone}
                                       onChange={(e) => setPhone(e.currentTarget.value)}/>
                            </div>
                            <div className="input-form">
                                <span>Password:</span>
                                <input disabled={isLoading} autoComplete="" type="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.currentTarget.value)}/>
                            </div>
                        </form>
                    </div>
                    <div className="input-form">
                        <Button
                            shape={"round"}
                            type={"primary"}
                            size={"large"}
                            onClick={handleLogin}
                            onKeyDown={handleLogin}
                            loading={isLoading}>
                            Login
                        </Button>
                    </div>
                </div>
            </section>
        </AnimatedPage>
    )
}

export default LoginPage;