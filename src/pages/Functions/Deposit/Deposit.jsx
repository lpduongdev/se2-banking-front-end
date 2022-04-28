import {Button, Form, InputNumber, Modal} from "antd";
import React, {useState} from "react";
import {USER_INFO} from "../../../const/key_storage";
import {transactionDeposit, userGetInfo} from "../../../api/api_config";
import "../form.css"
import AnimatedPage from "../../../utils/AnimatedPage";

const Deposit = (object) => {
    const {isSessionExpired, userInfo} = object.object
    const [money, setMoney] = useState(0.0)

    return (
        <AnimatedPage>
            <div className="form-container">
                <h2 style={{textAlign: "center"}}>Deposit</h2>
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
                            title: `Are you sure want to deposit ${money} to your account?`,
                            onOk: async () => {
                                let formData = new FormData();
                                formData.append("amount", money + "");
                                try {
                                    const res = await transactionDeposit({formData: formData})

                                    if (!res.ok) {
                                        Modal.destroyAll()
                                        Modal.error({
                                            title: "Can not deposit money!",
                                            onOk: () => {}
                                        })
                                        return
                                    }
                                    else {
                                        const newUserInfo = await (await userGetInfo()).json()
                                        window.localStorage.setItem(USER_INFO, JSON.stringify(newUserInfo.data))
                                        userInfo.set(JSON.stringify(newUserInfo.data))
                                        Modal.success({
                                            title: "Deposit successful!", onOk: () => {
                                                Modal.destroyAll()
                                                setMoney(0)
                                            }
                                        })
                                    }
                                } catch (TypeError) {
                                    Modal.error(
                                        {
                                            title: "Login session expired",
                                            content: "Please login again",
                                            onOk: () => {
                                                isSessionExpired.set(true)
                                                Modal.destroyAll()
                                            }
                                        },)
                                }
                            }
                        })
                    }}>
                    <Form.Item
                        rules={[{required: true, message: 'Please enter your money!'}]}>
                        <h3 style={{textAlign: "center"}}>Money to deposit</h3>
                        <InputNumber style={{width: "100%"}} value={money} onChange={(e => setMoney(e))}/>
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}>
                        <Button type={"primary"} size={"large"} htmlType="submit">Deposit</Button>
                    </Form.Item>
                </Form>
            </div>
        </AnimatedPage>
    )
}

export default Deposit