import AnimatedPage from "../../utils/AnimatedPage";
import {Avatar, Button, Card, Col, Row} from "antd";
import {USER_INFO} from "../../const/key_storage";
import React, {useContext, useState} from "react";
import Transfer from "./Transfer/Transfer";
import {URL_DEPOSIT, URL_TRANSFER, URL_WITHDRAW} from "../../const/routing_address";
import Deposit from "./Deposit/Deposit";
import {useHistory} from "react-router-dom";
import Withdraw from "./Withdraw/Withdraw";
import {
    BankFilled,
    DollarCircleFilled,
    InteractionFilled,
    MoneyCollectFilled,
    RedEnvelopeFilled,
    WalletFilled
} from "@ant-design/icons";
import SharedContext from "../../utils/Context";

const FunctionsCard = () => {
    const {userInfo} = useContext(SharedContext)
    const history = useHistory()
    const [functionType, setFunctionType] = useState(history.location.pathname)

    return (
        <AnimatedPage>
            <div className="body">
                <Card className="card-container">
                    <div className="user-info-container">
                        <div className="user-info__avatar-container">
                            <Avatar size={90}
                                    src={JSON.parse(window.localStorage.getItem(USER_INFO)).user.avatar !== null ? JSON.parse(window.localStorage.getItem(USER_INFO)).user.avatar : "https://joeschmoe.io/api/v1/random"}/>
                            <h2>{JSON.parse(window.localStorage.getItem(USER_INFO)).user.firstName}</h2>
                        </div>
                        <div className="user-info__balance">
                            <h2>Balance: </h2>
                            <p>{JSON.parse(window.localStorage.getItem(USER_INFO)).balance} VND</p>
                        </div>
                    </div>
                    {functionType === URL_TRANSFER && <Transfer object={userInfo}/>}
                    {functionType === URL_DEPOSIT && <Deposit object={userInfo}/>}
                    {functionType === URL_WITHDRAW && <Withdraw object={userInfo}/>}
                </Card>
                <div style={{paddingTop: 30, paddingBottom: 30, position: "absolute", bottom: 0, background: "#ffffff", borderRadius: 15}}>
                    <Row className="menu">
                        <Col>
                            <Button className="btn-item" onClick={() => setFunctionType(URL_TRANSFER)}
                                    size={"large"}><DollarCircleFilled/> Transfer</Button>
                        </Col>
                        <Col>
                            <Button className="btn-item" onClick={() => setFunctionType(URL_DEPOSIT)}
                                    size={"large"}><RedEnvelopeFilled/> Deposit Money</Button>
                        </Col>
                        <Col>
                            <Button className="btn-item" onClick={() => setFunctionType(URL_WITHDRAW)}
                                    size={"large"}><MoneyCollectFilled/> Withdraw Money</Button>
                        </Col>
                        <Col>
                            <Button className="btn-item" size={"large"}><WalletFilled/> Money Saving</Button>

                        </Col>
                        <Col>
                            <Button className="btn-item" size={"large"}><BankFilled/> Money Loan</Button>

                        </Col>
                        <Col>
                            <Button className="btn-item" size={"large"}><InteractionFilled/> Transaction
                                History</Button>

                        </Col>
                    </Row>
                </div>
            </div>
        </AnimatedPage>
    )
}

export default FunctionsCard