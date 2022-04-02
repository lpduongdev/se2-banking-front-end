import React, {useContext} from "react";
import "./Home.css"
import AnimatedPage from "../../utils/AnimatedPage"
import {Element} from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import Banner from "./Banner/Banner";
import {TOKEN} from "../../const/key_storage";
import SharedContext from "../../utils/Context";
import {URL_HOME} from "../../const/routing_address";

const BgElement = Element.BgElement;

const Home = () => {
    const {token, userInfo, isAdmin} = useContext(SharedContext)

    const fixLogout = () => {
        token.set(null)
        window.localStorage.clear()
        userInfo.set(null)
        isAdmin.set(false)
    }

    return (
        <AnimatedPage>
            <div className="banner">
                <div className="banner__text">
                    <h1>Crypto currency: Polkadot</h1>
                    <p>Polkadot enables cross-blockchain transfers of any type of data or asset, not just tokens.
                        Connecting to Polkadot gives you the ability to interoperate with a wide variety of blockchains
                        in the Polkadot network.</p>
                    <button onClick={fixLogout} className="Btn">Learn more</button>
                </div>
                <div className="banner__image">
                    <img src={require("../../assets/images/banner/atm-banner.png")} alt="#"/>
                </div>
            </div>
            <div className="functions">
                <h1>Card Features and Benefits {userInfo.get}</h1>
                <div className="banner-auto" style={{height: "80px"}}>
                    <Banner/>
                </div>
            </div>

        </AnimatedPage>
    );
};

export default Home;