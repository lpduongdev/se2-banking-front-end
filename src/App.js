import "./App.css";
import {Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import DashboardUser from "./pages/DashboardUser/DashboardUser";
import {SharedProvider} from "./utils/Context";
import {useEffect, useState} from "react";
import {GET_USER_PROFILE, TOKEN} from "./const/key_storage";
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
import {getUserInfo} from "./api/api_config";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [token, setToken] = useState(window.localStorage.getItem(TOKEN))
    const [userInfo, setUserInfo] = useState(window.localStorage.getItem(GET_USER_PROFILE))

    const location = useLocation();

    useEffect( () => {
        if (token) setUserInfo(JSON.stringify(getInfo(token)))
        if (!token) setUserInfo("")
        if (userInfo) setIsAdmin(() => {
            console.log(JSON.parse(userInfo))
            for (const parseKey of JSON.parse(userInfo).loginAccount.roles) {
                console.log(parseKey.name)
                if (parseKey.name === "admin") return true
            }
            return false
        })
        console.log("Token: " + token + "\nuserInfo: " + userInfo + "\nisAdmin: " + isAdmin)

    }, [token])

    const getInfo = async () => {
        if (!token) return ""
        return await getUserInfo(token);
    }

    const sharedValue = {
        token: {
            get: token,
            set: setToken
        },
        userInfo: {
            get: userInfo,
            set: setUserInfo
        },
        isAdmin: isAdmin
    }

    return (
        <SharedProvider value={sharedValue}>
            <AnimatePresence exitBeforeEnter initial={false}>
                <div className="App">
                    <Header/>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path={URL_HOME} component={Home}/>
                        <Route exact path={URL_USER_DASHBOARD} component={DashboardUser}/>
                        {!token && !userInfo && <Route exact path={URL_LOGIN} component={LoginPage}/>}
                        <Route exact path={URL_ADMIN_DASHBOARD} component={DashboardAdmin}/>
                        <Route exact path={URL_TRANSFER} component={""}/>
                        <Route exact path={URL_DEPOSIT} component={""}/>
                        <Route exact path={URL_WITHDRAW} component={""}/>
                        <Route exact path={URL_SAVING} component={""}/>
                        <Route exact path={URL_LOAN} component={""}/>
                        <Route path="*"  component={Home}/>
                    </Switch>
                </div>
            </AnimatePresence>
        </SharedProvider>
    );
}

export default App;
