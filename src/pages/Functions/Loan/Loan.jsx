import AnimatedPage from "../../../utils/AnimatedPage";
import {Button, Form, InputNumber, Modal, Radio} from "antd";
import {depositMoney, getUserInfo} from "../../../api/api_config";
import {USER_INFO} from "../../../const/key_storage";
import React, {useState} from "react";

const Loan = (object) => {
    const userInfo = object.object
    const [money, setMoney] = useState(0.0)

    return (
        <AnimatedPage>
            <div className="form-container">
                <h2 style={{textAlign: "center"}}>Loan</h2>
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
                                // const res = await depositMoney({formData: formData})
                                // if (!res.ok) Modal.error({
                                //     title: "Can not deposit money!",
                                //     onOk: () => Modal.destroyAll()
                                // })
                                // else {
                                //     const newUserInfo = await (await getUserInfo()).json()
                                //     window.localStorage.setItem(USER_INFO, JSON.stringify(newUserInfo.data))
                                //     console.log(userInfo)
                                //     userInfo.set(JSON.stringify(newUserInfo.data))
                                //     Modal.success({
                                //         title: "Deposit successful!", onOk: () => {
                                //             Modal.destroyAll()
                                //             setMoney(0)
                                //         }
                                //     })
                                // }
                            }
                        })
                    }}>
                    <Form.Item
                        rules={[{required: true, message: 'Please enter your money!'}]}>
                        <h3 style={{textAlign: "center"}}>Money to loan</h3>
                        <InputNumber style={{width: "100%"}} value={money} onChange={(e => setMoney(e))}/>
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}>
                        <Button type={"primary"} size={"large"} htmlType="submit">Loan</Button>
                    </Form.Item>
                </Form>
            </div>

        </AnimatedPage>
    )
}

export default Loan