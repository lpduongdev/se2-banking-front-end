import {Header} from "antd/es/layout/layout";
import {Card, Dropdown, Image, Menu, Modal} from "antd";
import {Link, NavLink} from "react-router-dom";
import {
    URL_ADMIN_DASHBOARD,
    URL_DEPOSIT,
    URL_HOME,
    URL_LOAN,
    URL_LOGIN,
    URL_SAVING, URL_TRANSACTION_HISTORY,
    URL_TRANSFER, URL_USER_DASHBOARD,
    URL_WITHDRAW
} from "../../const/routing_address";
import React, {useContext} from "react";
import Meta from "antd/es/card/Meta";
import Avatar from "antd/es/avatar/avatar";
import SharedContext from "../../utils/Context";
import {useHistory} from "react-router";
import {CaretDownFilled} from "@ant-design/icons"
import {USER_INFO} from "../../const/key_storage";

const NavigationHeader = () => {
    const {token, userInfo, isAdmin} = useContext(SharedContext)
    const history = useHistory()
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink exact to={URL_TRANSFER}>Transfer money</NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink exact to={URL_DEPOSIT}>Deposit money</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink exact to={URL_WITHDRAW}>Withdraw money</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
                <NavLink exact to={URL_SAVING}>Money saving</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
                <NavLink exact to={URL_LOAN}>Money loan</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
                <NavLink exact to={URL_TRANSACTION_HISTORY}>Transaction history</NavLink>
            </Menu.Item>
        </Menu>
    );


    const onClickLogout = () => {
        Modal.confirm({
            title: "Logout",
            centered: true,
            content: "Are you sure want to logout?",
            onOk: () => {
                token.set("")
                window.localStorage.clear()
                history.push(URL_HOME)
                userInfo.set("")
                isAdmin.set(false)
            }
        })
    }

    const userMenu = (
        <Menu>
            <Menu.Item key="0">
                <Link to={"#"}>Change information</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to={"#"} onClick={onClickLogout}>Logout</Link>
            </Menu.Item>
        </Menu>)

    return (
        <Header style={{
            background: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            paddingTop: 10,
            borderBottom: "1px solid #C0C0C0FF",
            paddingBottom: 10,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            height: 70,
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                margin: 0
            }}>
                <Image style={{display: "flex", alignItems: "center"}} preview={false} height={60} src={"ic_hanu_banking.png"}/>
                <h2 style={{margin: 0, color: "#6b6b6b"}}><b style={{color :"#58b893"}}>HANU</b> Banking</h2>
            </div>
            <Menu style={{flexGrow: 2, display: "flex", justifyContent: "flex-end", borderBottom: "none"}}
                  mode="horizontal">
                <Menu.Item key="0">
                    <NavLink exact activeClassName="navbar__tab-active" className="navbar__tab" to="/">Home</NavLink>
                </Menu.Item>
                <Menu.Item key="1">
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Features <CaretDownFilled/>
                        </a>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink exact activeClassName="navbar__tab-active" className="navbar__tab" to="/about_us">About
                        us</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    {!window.localStorage.getItem(USER_INFO) &&
                        <NavLink exact activeClassName="navbar__tab-active" className="navbar__tab"
                                 to={URL_LOGIN}>Login</NavLink>}
                </Menu.Item>
                <Menu.Item key="4">
                    {window.localStorage.getItem(USER_INFO) &&
                        <Dropdown placement={"bottom"} overlay={userMenu}>
                            <NavLink style={{padding: 0}} exact
                                     to={isAdmin.get ? URL_ADMIN_DASHBOARD : URL_USER_DASHBOARD}>
                                <Meta
                                    avatar={<Avatar
                                        src={JSON.parse(window.localStorage.getItem(USER_INFO)).user.avatar !== null ? JSON.parse(window.localStorage.getItem(USER_INFO)).user.avatar : "https://joeschmoe.io/api/v1/random"}/>}
                                    title={JSON.parse(window.localStorage.getItem(USER_INFO)).user.firstName}/>
                            </NavLink>
                        </Dropdown>}
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default NavigationHeader