import React, {useContext} from "react";
import "../Form.css"
import AccountSharedContext from "../../../utils/AccountContext";
import AnimatedPage from "../../../utils/AnimatedPage";

const InfoForm = () => {
    const {firstName, lastName, citizenIdentification, email, address } = useContext(AccountSharedContext)

    return (
        <AnimatedPage>
            <div className="form">
                <h2>Enter your information</h2>

                <form action="">
                    <div className="input-form">
                        <span className="test">First name:</span>
                        <input type="text" value={firstName.get} onChange={(e) => firstName.set(e.currentTarget.value)}/>
                    </div>
                    <div className="input-form">
                        <span>Last name:</span>
                        <input autoComplete="" type="text" value={lastName.get}
                               onChange={(e) => lastName.set(e.currentTarget.value)}/>
                    </div>
                    <div className="input-form">
                        <span>Citizen Identification:</span>
                        <input autoComplete="" type="text" value={citizenIdentification.get}
                               onChange={(e) => citizenIdentification.set(e.currentTarget.value)}/>
                    </div>
                    <div className="input-form">
                        <span>Email:</span>
                        <input autoComplete="" type="text" value={email.get}
                               onChange={(e) => email.set(e.currentTarget.value)}/>
                    </div>
                    <div className="input-form">
                        <span>Address:</span>
                        <input autoComplete="" type="text" value={address.get}
                               onChange={(e) => address.set(e.currentTarget.value)}/>
                    </div>
                </form>
            </div>
        </AnimatedPage>
    )
}

export default InfoForm