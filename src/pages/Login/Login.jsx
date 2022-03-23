import "./Login.css"
import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, Redirect} from "react-router-dom";
import AnimatedPage from "../../utils/AnimatedPage"
import SharedContext from "../../utils/Context";
import {confirm} from "react-confirm-box";
import {AUTO_CLOSE_DIALOG, OK_CANCEL, OK_ONLY} from "../../const/dialog_styling";
import {URL_ADMIN_DASHBOARD, URL_HOME, URL_USER_DASHBOARD} from "../../const/routing_address";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import InfoForm from "./RegisterForm/InfoForm";
import {AnimatePresence} from "framer-motion";
import {AccountContextProvider} from "../../utils/AccountContext";
import {TYPE_ENTER_INFORMATION, TYPE_LOGIN, TYPE_REGISTER} from "../../const/key_login";
import {TXT_LOGIN, TXT_NEXT, TXT_REGISTER} from "../../const/string_storage";
import {getUserInfo, login, register, registerAdmin} from "../../api/api_config";
import {GET_USER_PROFILE, TOKEN} from "../../const/key_storage";
import {useHistory} from "react-router";


const Login = () => {
    const {isAdmin, token, userInfo} = useContext(SharedContext)
    const [loginType, setLoginType] = useState(0);
    const [buttonText, setButtonText] = useState(TXT_LOGIN)
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [code, setCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [citizenIdentification, setCitizenIdentification] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const accountSharedContext = {
        loginType: {
            get: loginType,
            set: setLoginType
        },
        phone: {
            get: phone,
            set: setPhone
        },
        password: {
            get: password,
            set: setPassword
        },
        passwordConfirm: {
            get: passwordConfirm,
            set: setPasswordConfirm
        },
        code: {
            get: code,
            set: setCode
        },
        firstName: {
            get: firstName,
            set: setFirstName
        },
        lastName: {
            get: lastName,
            set: setLastName
        },
        citizenIdentification: {
            get: citizenIdentification,
            set: setCitizenIdentification
        },
        email: {
            get: email,
            set: setEmail
        },
        address: {
            get: address,
            set: setAddress
        }

    }
    const history = useHistory();

    useEffect(() => {
        if (loginType === TYPE_LOGIN)
            setButtonText(TXT_LOGIN)
        if (loginType === TYPE_REGISTER) {
            clearState()
            setButtonText(TXT_NEXT)
        }
        if (loginType === TYPE_ENTER_INFORMATION)
            setButtonText(TXT_REGISTER)
    }, [loginType])


    const checkValid = async (type) => {
        if (loginType === TYPE_LOGIN) {
            if (!phone) {
                await confirm("Invalid phone number", OK_ONLY);
                return false;
            }
            if (!password) {
                await confirm("You have to enter password", OK_ONLY);
                return false;
            }
        }
        if (loginType === TYPE_REGISTER) {
            if (!phone) {
                await confirm("Invalid phone number", OK_ONLY);
                return false;
            }
            if (!password) {
                await confirm("You have to enter password", OK_ONLY);
                return false;
            }
            if (!passwordConfirm) {
                await confirm("You have to enter password confirm", OK_ONLY);
                return false;
            }
            if (password !== passwordConfirm) {
                await confirm("Password doesn't match", OK_ONLY);
                return false;
            }
        }
        if (type === TYPE_ENTER_INFORMATION) {
            if (!firstName) {
                await confirm("You have to enter your first name", OK_ONLY);
                return false;
            }
            if (!lastName) {
                await confirm("You have to enter your last name", OK_ONLY);
                return false;
            }
            if (!citizenIdentification) {
                await confirm("You have to enter citizen identification", OK_ONLY);
                return false;
            }
            if (!email) {
                await confirm("You have to enter email", OK_ONLY);
                return false;
            }
            if (!address) {
                await confirm("You have to enter address", OK_ONLY);
                return false;
            }
        }
        return true;
    }

    let dot = "";
    const loggingEffect = () => {
        dot = dot + "."
        if (dot === ".....") dot = "."
        setButtonText(buttonText + dot)
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        const interval = setInterval(loggingEffect, 500)

        const object = {phoneNumber: phone, password: password}
        const res = await login(object)

        clearInterval(interval)
        setButtonText(TXT_LOGIN)
        if (res.status === 1) {
            await confirm("Wrong phone number or password", OK_ONLY)
            clearState()
            return
        }

        if (res.status === 0) {
            const tokenString = res.data

            localStorage.setItem(TOKEN, tokenString)

            token.set(tokenString)

            console.log("Expected: " + await getUserInfo())

            let fetchedData = await getUserInfo()

            while (!fetchedData) {
                if (!(await confirm("Can't get userdata, try again?", OK_CANCEL))) {
                    return
                }
                fetchedData = await getUserInfo()
            }

            console.log(fetchedData)

            window.localStorage.setItem(GET_USER_PROFILE, JSON.stringify(fetchedData))

            userInfo.set(JSON.stringify(fetchedData))

            history.push(isAdmin ? URL_ADMIN_DASHBOARD : URL_USER_DASHBOARD)
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        let object
        let res
        if (!code) {
            object = {phoneNumber: phone, password: password}
            res = await register(object)
        } else {
            object = {phoneNumber: phone, password: password, code: code}
            res = await registerAdmin(object)
        }
        const isUserCreate = !code
        clearState()

        if (res.status === 1) {
            if (isUserCreate) await confirm("Failed to create, check your information again", OK_ONLY)
            else await confirm("Check your admin code", OK_ONLY)
            setLoginType(TYPE_REGISTER)
            return
        }

        if (res.status === 0) {
            await confirm("Create successfully\nRedirecting to login site", AUTO_CLOSE_DIALOG)
            setLoginType(TYPE_LOGIN)
        }
    }

    const clearState = () => {
        setPassword("")
        setPasswordConfirm("")
        setCode("")
        setFirstName("")
        setLastName("")
        setCitizenIdentification("")
        setEmail("")
        setAddress("")
    }

    const handleOnClickButton = async (event) => {
        if (loginType === TYPE_LOGIN) {
            if (await checkValid(TYPE_LOGIN))
                await handleLogin(event);
        }
        if (loginType === TYPE_REGISTER) {
            if (await checkValid(TYPE_REGISTER))
                setLoginType(TYPE_ENTER_INFORMATION)
        }
        if (loginType === TYPE_ENTER_INFORMATION) {
            if (await checkValid(TYPE_ENTER_INFORMATION))
                await handleRegister(event)
        }
    }

    return (
        <AnimatedPage>
            <AccountContextProvider value={accountSharedContext}>
                <section>
                    <div className="img-bg">
                        <img
                            src={require("../../assets/images/login/login_poster.jpg")}
                            alt="#"/>
                    </div>
                    <AnimatePresence exitBeforeEnter initial={false}>
                        <div className="content">
                            {loginType === TYPE_LOGIN               && <LoginForm/>}
                            {loginType === TYPE_REGISTER            && <RegisterForm/>}
                            {loginType === TYPE_ENTER_INFORMATION   && <InfoForm/>}
                            <div className="input-form">
                                <input disabled={
                                       buttonText !== TXT_LOGIN
                                    && buttonText !== TXT_REGISTER
                                    && buttonText !== TXT_NEXT}
                                       type="submit"
                                       onClick={(e) => handleOnClickButton(e)}
                                       onKeyDown={(e) => handleOnClickButton(e)}
                                       value={buttonText}/>
                            </div>
                            <div className="nav-text">
                                <p>{loginType === TYPE_LOGIN ? "You are an admin?   " : ""}
                                    <Link to="#"
                                          onClick={() => setLoginType(loginType === TYPE_LOGIN ? TYPE_REGISTER : TYPE_LOGIN)}>{loginType === TYPE_LOGIN ? "Register now" : ""}</Link>
                                </p>
                            </div>
                        </div>
                    </AnimatePresence>
                </section>
            </AccountContextProvider>
        </AnimatedPage>
    )
}

export default Login;