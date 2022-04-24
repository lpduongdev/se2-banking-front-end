import React, {useContext, useState} from "react";
import SharedContext from "../../../utils/Context";
import AnimatedPage from "../../../utils/AnimatedPage";
import {Avatar, Button, Card, Form, InputNumber, Modal} from "antd";
import {USER_INFO} from "../../../const/key_storage";
import {userGetInfo, transactionWithdraw} from "../../../api/api_config";

const Withdraw = (object) => {
    const userInfo = object.object
    const [money, setMoney] = useState(0.0)

    return (
        <AnimatedPage>
            <div className="form-container">
                <h2 style={{textAlign: "center"}}>Withdraw</h2>
                <Form
                    onFinish={() => {
                        if (money <= 0) {
                            Modal.error({
                                title: "Please input number higher than 0", onOk: () => {
                                }
                            })
                            return
                        }
                        Modal.confirm({
                            title: `Are you sure want to withdraw ${money} to your account?`,
                            onOk: async () => {
                                let formData = new FormData();
                                formData.append("amount", money + "");
                                const res = await transactionWithdraw({formData: formData})
                                if (!res.ok) Modal.error({
                                    title: "Can not deposit money!",
                                    onOk: () => Modal.destroyAll()
                                })
                                else {
                                    const json = await res.json()
                                    const newUserInfo = await (await userGetInfo()).json()
                                    window.localStorage.setItem(USER_INFO, JSON.stringify(newUserInfo.data))
                                    userInfo.set(JSON.stringify(newUserInfo.data))
                                    Modal.success({
                                        title: "Withdraw successful!", onOk: () => {
                                            Modal.destroyAll()
                                            setMoney(0)

                                        }
                                    })
                                }
                            }
                        })
                    }}>
                    <Form.Item
                        rules={[{required: true, message: 'Please enter your money!'}]}>
                        <h3 style={{textAlign: "center"}}>Money to withdraw</h3>
                        <InputNumber style={{width: "100%"}} value={money} onChange={(e => setMoney(e))}/>
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}>
                        <Button type={"primary"} size={"large"} htmlType="submit">Withdraw</Button>
                    </Form.Item>
                </Form>
            </div>
        </AnimatedPage>
    )
}

export default Withdraw