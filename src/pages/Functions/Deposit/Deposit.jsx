import {Avatar, Button, Card, Form, Input, InputNumber, Modal} from "antd";
import React, {useContext, useState} from "react";
import AnimatedPage from "../../../utils/AnimatedPage";
import {USER_INFO} from "../../../const/key_storage";
import {depositMoney, getUserInfo} from "../../../api/api_config";
import SharedContext from "../../../utils/Context";
import "../form.css"

const Deposit = () => {
    const {userInfo} = useContext(SharedContext)
    const [money, setMoney] = useState(0.0)

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
                    <div className="form-container">
                        <h2 style={{textAlign: "center"}}>Deposit</h2>
                        <Form
                            onFinish={() => {
                                if (money <= 0) Modal.error({
                                    title: "Please input number higher than 0", onOk: () => {
                                    }
                                })
                                Modal.confirm({
                                    title: `Are you sure want to deposit ${money} to your account?`,
                                    onOk: async () => {
                                        let formData = new FormData();
                                        formData.append("amount", money + "");
                                        const res = await depositMoney({formData: formData})
                                        if (!res.ok) Modal.error({
                                            title: "Can not deposit money!",
                                            onOk: () => Modal.destroyAll()
                                        })
                                        else {
                                            const json = await res.json()
                                            const newUserInfo = await (await getUserInfo()).json()
                                            window.localStorage.setItem(USER_INFO, JSON.stringify(newUserInfo.data))
                                            userInfo.set(JSON.stringify(newUserInfo.data))
                                            Modal.success({title: "Deposit successful!", onOk: () => {
                                                    Modal.destroyAll()
                                                    setMoney(0)
                                                }})
                                        }
                                    }
                                })
                            }}>
                            <Form.Item
                                label="Money to deposit"
                                rules={[{required: true, message: 'Please enter your money!'}]}>
                                <InputNumber style={{width: "100%"}} value={money} onChange={(e => setMoney(e))}/>
                            </Form.Item>
                            <Form.Item style={{textAlign: "center"}}>
                                <Button type={"primary"} size={"large"} htmlType="submit">Deposit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </AnimatedPage>
    )
}

export default Deposit