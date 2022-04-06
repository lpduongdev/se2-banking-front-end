import React, {useContext} from "react";
import "./Home.css"
import AnimatedPage from "../../utils/AnimatedPage"
import 'rc-banner-anim/assets/index.css';
import Banner from "./Banner/Banner";
import {Button, Card} from "antd";
import Title from "antd/lib/typography/Title";

const Home = () => {

    return (
        <AnimatedPage>
            <div className="banner">
                <Banner/>
            </div>
            <Card style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginTop: 50
            }}>
                <Title style={{textAlign: "center"}}>List of features</Title>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: 20}}>
                        <h2>Function 1</h2>
                        <Button loading={true} style={{height: 200, width: 200}}> Test button 1</Button>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: 20}}>
                        <h2>Function 2</h2>
                        <Button loading={true} style={{height: 200, width: 200}}> Test button 2</Button>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: 20}}>
                        <h2>Function 3</h2>
                        <Button loading={true} style={{height: 200, width: 200}}> Test button 3</Button>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: 20}}>
                        <h2>Function 4</h2>
                        <Button loading={true} style={{height: 200, width: 200}}> Test button 4</Button>
                    </div>
                </div>
            </Card>
        </AnimatedPage>
    );
};

export default Home;