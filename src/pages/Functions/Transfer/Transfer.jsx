import {Button, Form, Input, InputNumber, Modal, Radio} from "antd";
import React, {useState} from "react";
import {USER_INFO} from "../../../const/key_storage";
import {userGetInfo, transactionTransfer} from "../../../api/api_config";
import "../form.css"
import AnimatedPage from "../../../utils/AnimatedPage";

const Transfer = (object) => {
    const {userInfo} = object.object
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("")
    const [receiverEmail, setReceiverEmail] = useState("")
    const [money, setMoney] = useState(0.0)
    const [type, setType] = useState("")

    return (
        <AnimatedPage>
            <div className="form-container">
                <h2 style={{textAlign: "center"}}>Transfer</h2>
                <Form
                    onFinish={() => {
                        if (!type) {
                            Modal.error({title: "Please select send method",})
                            return
                        }
                        if (type === 'phoneNumber' && (!receiverPhoneNumber || !(new RegExp("^(\\+\\d)?\\d{10}$").test(receiverPhoneNumber)))) {
                            Modal.error({title: "Invalid phone number",})
                            return
                        }
                        if (type === 'email' && (!receiverEmail || !(new RegExp("/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\\.)+[A-Za-z]+$/\n").test(receiverEmail)))) {
                            Modal.error({title: "Invalid email",})
                            return
                        }
                        if (money <= 0) {
                            Modal.error({title: "Invalid money to send",})
                            return
                        }
                        Modal.confirm(
                            {
                                title: `Are you sure want to transfer $${money} to ${receiverPhoneNumber}`,
                                onOk: async () => {
                                    let formData = new FormData();
                                    formData.append("amount", money + "");
                                    const res = await transactionTransfer({
                                        amount: money,
                                        toAccount: receiverPhoneNumber
                                    })
                                    if (!res.ok) Modal.error({
                                        title: "Can not transfer money!",
                                        onOk: () => Modal.destroyAll()
                                    })
                                    else {
                                        const newUserInfo = await (await userGetInfo()).json()
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
                        initialValue={type}>
                        <h3 style={{textAlign: "center"}}>Type of receiver</h3>
                        <Radio.Group style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                     onChange={(e) => {
                                         setType(e.target.value)
                                     }}>
                            <Radio.Button value="email">Email</Radio.Button>
                            <Radio.Button value="phoneNumber">Phone number</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {type === 'phoneNumber' &&
                        <Form.Item>
                            <h3 style={{textAlign: "center"}}>Receiver's phone</h3>
                            <Input style={{width: "100%"}} value={receiverPhoneNumber} autoComplete={"phone"}
                                   onChange={(e) => setReceiverPhoneNumber(e.currentTarget.value)}/>
                        </Form.Item>}
                    {type === 'email' &&
                        <Form.Item>
                            <h3 style={{textAlign: "center"}}>Receiver's email</h3>
                            <Input style={{width: "100%"}} value={receiverEmail} autoComplete={"email"}
                                   onChange={(e) => setReceiverEmail(e.currentTarget.value)}/>
                        </Form.Item>}
                    <Form.Item
                        rules={[{required: true, message: 'Please enter your money!'}]}>
                        <h3 style={{textAlign: "center"}}>Money to transfer</h3>
                        <InputNumber style={{width: "100%"}} autoComplete="money" value={money}
                                     onChange={((e) => setMoney(e))}/>
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