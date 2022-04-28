import AnimatedPage from "../../utils/AnimatedPage";
import {Avatar, Button, Card, Col, Row, Table} from "antd";
import {USER_INFO} from "../../const/key_storage";
import React, {useContext, useEffect, useState} from "react";
import Transfer from "./Transfer/Transfer";
import {
    URL_DEPOSIT,
    URL_LOAN,
    URL_SAVING,
    URL_TRANSACTION_HISTORY,
    URL_TRANSFER,
    URL_WITHDRAW
} from "../../const/routing_address";
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
import Loan from "./Loan/Loan";
import Saving from "./Saving/Saving";
import TransactionHistory from "./TransactionHistory/TransactionHistory";

const FunctionsCard = () => {
    const {userInfo, isSessionExpired, showFooter} = useContext(SharedContext)
    const history = useHistory()
    const [functionType, setFunctionType] = useState(history.location.pathname)
    const [showNavBar, setShowNavBar] = useState(true)
    useEffect(() => {
        if (functionType === URL_SAVING || functionType === URL_LOAN || functionType === URL_TRANSACTION_HISTORY) setShowNavBar(false)
        else setShowNavBar(true)
    }, [functionType])

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
                            <p>${JSON.parse(window.localStorage.getItem(USER_INFO)).balance.toFixed(2)}</p>
                        </div>
                    </div>
                    {functionType === URL_TRANSFER &&
                        <Transfer object={{userInfo: userInfo, isSessionExpired: isSessionExpired}}/>}
                    {functionType === URL_DEPOSIT &&
                        <Deposit object={{userInfo: userInfo, isSessionExpired: isSessionExpired}}/>}
                    {functionType === URL_WITHDRAW &&
                        <Withdraw object={{userInfo: userInfo, isSessionExpired: isSessionExpired}}/>}
                    {functionType === URL_LOAN &&
                        <Loan object={{userInfo: userInfo, isSessionExpired: isSessionExpired}}/>}
                    {functionType === URL_SAVING &&
                        <Saving object={{userInfo: userInfo, isSessionExpired: isSessionExpired}}/>}
                    {functionType === URL_TRANSACTION_HISTORY &&
                        <TransactionHistory object={{isSessionExpired: isSessionExpired}}/>}
                </Card>
                {functionType === URL_SAVING &&
                    <Card style={{minWidth: 600, marginTop: 20, textAlign: "center"}} title="Your current saving">
                        <TransactionHistory object={{isSessionExpired: isSessionExpired, type: "start_saving"}}/>
                    </Card>
                }
                {functionType === URL_LOAN &&
                    <Card style={{minWidth: 600, marginTop: 20, textAlign: "center"}} title="Your current saving">
                        <TransactionHistory object={{isSessionExpired: isSessionExpired, type: "start_loan"}}/>
                    </Card>
                }
                <div hidden={!showNavBar}
                     style={{paddingTop: 15, position: "absolute", bottom: 0, background: "#ffffff", borderRadius: 15}}>
                    <Row className="menu">
                        <Col>
                            <Button onClick={() => setFunctionType(URL_TRANSFER)}
                                    size={"large"}><DollarCircleFilled/> Transfer</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setFunctionType(URL_DEPOSIT)}
                                    size={"large"}><RedEnvelopeFilled/> Deposit Money</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setFunctionType(URL_WITHDRAW)}
                                    size={"large"}><MoneyCollectFilled/> Withdraw Money</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setFunctionType(URL_SAVING)}
                                    size={"large"}><WalletFilled/> Money Saving</Button>

                        </Col>
                        <Col>
                            <Button onClick={() => setFunctionType(URL_LOAN)}
                                    size={"large"}><BankFilled/> Money Loan</Button>

                        </Col>
                        <Col>
                            <Button onClick={() => setFunctionType(URL_TRANSACTION_HISTORY)}
                                    size={"large"}><InteractionFilled/> Transaction
                                History</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </AnimatedPage>
    )
}

export default FunctionsCard