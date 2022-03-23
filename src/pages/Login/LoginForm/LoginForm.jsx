import {TXT_LOGIN} from "../../../const/string_storage";
import React, {useContext} from "react";
import "../Form.css"
import AnimatedPage from "../../../utils/AnimatedPage";
import AccountSharedContext from "../../../utils/AccountContext";

const LoginForm = () => {
    const {phone, password} = useContext(AccountSharedContext);

    return (
        <AnimatedPage>
            <div className="form">
                <h2>{TXT_LOGIN}</h2>
                <form action="">
                    <div className="input-form">
                        <span className="test">Phone number:</span>
                        <input type="text" value={phone.get} onChange={(e) => phone.set(e.currentTarget.value)}/>
                    </div>
                    <div className="input-form">
                        <span>Password:</span>
                        <input autoComplete="" type="password" value={password.get}
                               onChange={(e) => password.set(e.currentTarget.value)}/>
                    </div>
                </form>
            </div>
        </AnimatedPage>
    )
}

export default LoginForm