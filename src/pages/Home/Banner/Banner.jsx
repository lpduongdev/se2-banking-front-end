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

    return (
        <div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <QueueAnim delay={300} ease="easeOutQuart" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "flex-start"
                }}>
                    <h1 key="h2" style={{fontStyle: "bold", fontSize: "2.4rem"}}>
                        HANU BANKING SYSTEM
                    </h1>
                    <p style={{color: "#808080", maxWidth: "60%", fontSize: "1.4rem"}} key="p">With our transaction accounts, you can withdraw money, transfer them between user, pay online, flexibility control and manage your money or card</p>
                    <span key="button">
                        <Button
                            type="primary"
                            size={"large"}
                            onClick={() => {}}>
                            LEARN MORE
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
