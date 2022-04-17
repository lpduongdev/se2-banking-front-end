import "./App.css";
import {Route, Switch, useHistory} from "react-router-dom";
import Home from "./pages/Home/Home";
import DashboardUser from "./pages/DashboardUser/DashboardUser";
import {SharedProvider} from "./utils/Context";
import {useEffect, useState} from "react";
import {USER_INFO, IS_ADMIN, TOKEN} from "./const/key_storage";
import {
    URL_ADMIN_DASHBOARD,
    URL_DEPOSIT,
    URL_HOME, URL_LOAN,
    URL_LOGIN, URL_SAVING,
    URL_TRANSFER,
    URL_USER_DASHBOARD,
    URL_WITHDRAW
} from "./const/routing_address";
import {AnimatePresence} from "framer-motion";
import {useLocation} from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavigationHeader from "./components/NavigationHeader/NavigationHeader";
import Transfer from "./pages/Functions/Transfer/Transfer";
import Deposit from "./pages/Functions/Deposit/Deposit";
import Withdraw from "./pages/Functions/Withdraw/Withdraw";
import FunctionsCard from "./pages/Functions/FunctionsCard";

function App() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [token, setToken] = useState(window.localStorage.getItem(TOKEN))
    const [userInfo, setUserInfo] = useState(window.localStorage.getItem(USER_INFO))
    const [isSessionExpired, setIsSessionExpired] = useState(false)
    const [showHeader, setShowHeader] = useState(true)

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (isSessionExpired === true) {
            setToken("")
            window.localStorage.clear()
            history.push(URL_HOME)
            setUserInfo("")
            setIsAdmin(false)
            setIsSessionExpired(false)
        }
    }, [isSessionExpired])

    useEffect( () => {
        const localToken = window.localStorage.getItem(TOKEN);
        const localUserInfo = window.localStorage.getItem(USER_INFO)
        const localIsAdmin = window.localStorage.getItem(IS_ADMIN)
        console.log("token: " + localToken + "\nUserInfo: " + localUserInfo + "\nisAdmin: " + localIsAdmin)
        if (localToken) setToken(localToken)
        if (localUserInfo) setUserInfo(userInfo)
        if (localIsAdmin) setIsAdmin(localIsAdmin === "true")
    }, [])

    const sharedValue = {
        token: {
            get: token,
            set: setToken,
        },
        userInfo: {
            get: userInfo,
            set: setUserInfo,
        },
        isAdmin: {
            get: isAdmin,
            set: setIsAdmin,
        },
        isSessionExpired: {
            get: isSessionExpired,
            set: setIsSessionExpired,
        },
        showHeader: {
            get: showHeader,
            set: setShowHeader,
        }
    }

    return (
        <SharedProvider value={sharedValue}>
            <AnimatePresence exitBeforeEnter initial={false}>
                <div className="App">
                    {showHeader && <NavigationHeader/>}
                    <Switch location={location} key={location.pathname}>
                        <Route exact path={URL_HOME} component={Home}/>
                        <Route exact path={URL_USER_DASHBOARD} component={DashboardUser}/>
                        {!token && !userInfo && <Route exact path={URL_LOGIN} component={LoginPage}/>}
                        {token && userInfo && <Route exact path={URL_ADMIN_DASHBOARD} component={DashboardAdmin}/>}
                        {token && userInfo && <Route exact path={URL_TRANSFER} component={() => (<FunctionsCard object={sharedValue.userInfo}/>)}/>}
                        {token && userInfo && <Route exact path={URL_DEPOSIT} component={() => (<FunctionsCard object={sharedValue.userInfo}/>)}/>}
                        {token && userInfo && <Route exact path={URL_WITHDRAW} component={() => (<FunctionsCard object={sharedValue.userInfo}/>)}/>}
                        {token && userInfo && <Route exact path={URL_SAVING} component={() => (<FunctionsCard object={sharedValue.userInfo}/>)}/>}
                        {token && userInfo && <Route exact path={URL_LOAN} component={() => (<FunctionsCard object={sharedValue.userInfo}/>)}/>}
                        <Route path="*" component={Home}/>
                    </Switch>
                </div>
            </AnimatePresence>
        </SharedProvider>
    );
}

export default App;
