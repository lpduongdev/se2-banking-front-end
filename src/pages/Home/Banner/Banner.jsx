import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {Button} from 'antd';
import BannerImage from './BannerImage';
import {URL_HOME} from "../../../const/routing_address";
import {useHistory} from "react-router-dom";
import SharedContext from "../../../utils/Context";

const Banner = () => {
    const history = useHistory()

    const {isSessionExpired} = useContext(SharedContext)

    const fixLogout = () => {
        isSessionExpired.set(true)
    }

    return (
        <div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <QueueAnim delay={300} ease="easeOutQuart" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "flex-start"
                }}>
                    <h1 key="h2">
                        Welcome to our bank
                    </h1>
                    <p key="p">In this bank we have some fucking shit that you will like :)</p>
                    <span key="button">
                        <Button
                            type="primary"
                            onClick={fixLogout}>
                            Register now
                        </Button>
                    </span>
                </QueueAnim>
                <div>
                    <BannerImage/>
                </div>
            </div>
        </div>
    );
}


export default Banner;
