import {Button, Form, Input, InputNumber, Modal} from "antd";
import React, {useState} from "react";
import {USER_INFO} from "../../../const/key_storage";
import {getUserInfo, transferMoney} from "../../../api/api_config";
import "../form.css"
import AnimatedPage from "../../../utils/AnimatedPage";

const Transfer = (object) => {
    const userInfo = object.object
    const [receivedPhone, setReceivedPhone] = useState("")
    const [money, setMoney] = useState(0.0)

    return (
        <AnimatedPage>
            <div className="form-container">
                <h2 style={{textAlign: "center"}}>Transfer</h2>
                <Form
                    onFinish={() => {
                        Modal.confirm(
                            {
                                title: `Are you sure want to transfer $${money} to ${receivedPhone}`,
                                onOk: async () => {
                                    let formData = new FormData();
                                    formData.append("amount", money + "");
                                    const res = await transferMoney({amount: money, toAccount: receivedPhone})
                                    if (!res.ok) Modal.error({
                                        title: "Can not transfer money!",
                                        onOk: () => Modal.destroyAll()
                                    })
                                    else {
                                        const newUserInfo = await (await getUserInfo()).json()
                                        window.localStorage.setItem(USER_INFO, JSON.stringify(newUserInfo.data))
                                        userInfo.set(JSON.stringify(newUserInfo.data))
                                        Modal.success({
                                            title: "Transfer successful!", onOk: () => {
                                                Modal.destroyAll()
                                                setMoney(0)
                                            }
                                        })
                                    }
                                }
                            }
                        )
                    }}>
                    <Form.Item
                        rules={[{required: true, message: 'Please enter receiver account!'}]}>
                        <h3 style={{textAlign: "center"}}>Receiver's phone</h3>
                        <Input style={{width: "100%"}} value={receivedPhone} autoComplete={"account"}
                               onChange={(e) => setReceivedPhone(e.currentTarget.value)}/>
                    </Form.Item>
                    <Form.Item
                        rules={[{required: true, message: 'Please enter your money!'}]}>
                        <h3 style={{textAlign: "center"}}>Money to transfer</h3>
                        <InputNumber style={{width: "100%"}} autoComplete="money" value={money}
                                     onChange={(e => setMoney(e))}/>
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}>
                        <Button type={"primary"} size={"large"} htmlType="submit">Transfer</Button>
                    </Form.Item>
                </Form>
            </div>
        </AnimatedPage>
    )
}

export default Transfer;