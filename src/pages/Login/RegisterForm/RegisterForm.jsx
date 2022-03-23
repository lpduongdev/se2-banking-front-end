import {TXT_LOGIN} from "../../../const/string_storage";
import React, {useContext} from "react";
import AnimatedPage from "../../../utils/AnimatedPage";
import "../Form.css"
import AccountSharedContext from "../../../utils/AccountContext";

const RegisterForm = () => {
    const { phone, password, passwordConfirm, code} = useContext(AccountSharedContext)

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
                    <div className="input-form">
                        <span>Password confirm:</span>
                        <input autoComplete="" type="password" value={passwordConfirm.get}
                               onChange={(e) => passwordConfirm.set(e.currentTarget.value)}/>
                    </div>
                    <div className="input-form">
                        <span>Private admin code:</span>
                        <input autoComplete="" type="password" value={code.get}
                               onChange={(e) => code.set(e.currentTarget.value)}/>
                    </div>
                </form>
            </div>
        </AnimatedPage>
    )
}
export default RegisterForm;