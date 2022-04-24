import React, {useContext} from "react";
import "./Home.css"
import AnimatedPage from "../../utils/AnimatedPage"
import 'rc-banner-anim/assets/index.css';
import Banner from "./Banner/Banner";
import {Card, Image} from "antd";
import Title from "antd/lib/typography/Title";
import {Footer} from "antd/es/layout/layout";

const Home = () => {
    return (
        <AnimatedPage>
            <div className="base-home">

                <div className="banner">
                    <Banner/>
                </div>
                <Card style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    marginTop: 60,
                    marginBottom: 60,
                    margin: 20,
                }}>
                    <div className="functions">
                        <Title style={{textAlign: "center", padding: 50, color: "#212558"}}>OUR FEATURES</Title>
                        <div className="functions__list">
                            <div className="item">
                                <Image preview={false} src={require("../../assets/images/banner/function_atm.png")}
                                       width={200} height={200}/>
                                <h2>Zero fee transaction</h2>
                                <p>100% no fee for transaction and something else</p>
                            </div>
                            <div className="item">
                                <Image preview={false}
                                       src={require("../../assets/images/banner/function_percentage.png")} width={200}
                                       height={200}/>
                                <h2>High interest rate</h2>
                                <p>Super saving money up to 12% per year and low rate for
                                    loaning money</p>
                            </div>
                            <div className="item">
                                <Image preview={false}
                                       src={require("../../assets/images/banner/function_transparent.png")} width={200}
                                       height={200}/>
                                <h2>Transparent transaction</h2>
                                <p>No manipulate and steal customer transaction
                                    information</p>
                            </div>
                            <div className="item">
                                <Image preview={false}
                                       src={require("../../assets/images/banner/function_customize.png")} width={200}
                                       height={200}/>
                                <h2>Customization</h2>
                                <p>Allow user customize their profile</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="content left" style={{margin: 20 ,padding: 80, background: "white", borderRadius: 15}}>
                    <Image preview={false} src={"https://creditcard.axiomthemes.com/wp-content/uploads/2017/06/img_protected.png"}/>
                    <div className="content-text-wrapper">
                        <h2>Your Day is Protected</h2>
                        <p>In contrast, credit cards allow the consumers a continuing balance of debt, subject to interest being charged.

                            A credit card also differs from a cash card, which can be used like currency by the owner of the card. A credit card differs from a charge card also in that a credit card typically involves a third-party entity that pays the seller and is reimbursed by the buyer, whereas a charge card.</p>
                    </div>
                </div>
                <div className="content right" style={{margin: 20 ,padding: 80, background: "white", borderRadius: 15}}>
                    <Image preview={false} src={"https://creditcard.axiomthemes.com/wp-content/uploads/2017/06/map.png"}/>
                    <div className="content-text-wrapper">
                        <h2>We are Almost Everywhere</h2>
                        <p>A credit card is a payment card issued to users (cardholders) to enable the cardholder to pay a merchant for goods and services.

                            The card issuer (usually a bank) creates a revolving account and grants a line of credit to the cardholder, from which the cardholder can borrow money for payment to a merchant or as a cash advance.</p>
                    </div>
                </div>
            </div>
            <Footer style={{textAlign: 'center', background: "#eeeeee"}}>
                <b>HANU Banking</b> ©2022 Created by <b>Rain</b></Footer>
        </AnimatedPage>
    );
};

export default Home;