import AnimatedPage from "../../../utils/AnimatedPage";
import {Button, Card, Form, InputNumber, Modal, Radio} from "antd";
import {interestGetPageable, transactionCreateLoan, userGetInfo} from "../../../api/api_config";
import {USER_INFO} from "../../../const/key_storage";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {URL_HOME} from "../../../const/routing_address";
import {millisecondsToDate} from "../../../utils/DateTimeConverter";
import {useStateIfMounted} from "use-state-if-mounted";

const Loan = (object) => {
    const {isSessionExpired, userInfo} = object.object
    const [money, setMoney] = useState(0.0)
    const [planList, setPlanList] = useStateIfMounted({})
    const [planType, setPlanType] = useState("")
    const [isLoadedData, setIsLoadedData] = useState(false)
    const [isEmptyPlanList, setIsEmptyPlanList] = useState(false)

    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const res = await interestGetPageable({
                    page: 0,
                    size: 10,
                    sort: "type,asc"
                })
                if (!res.ok) Modal.error({
                    title: "Can not get plan list!",
                    onOk: () => {
                        Modal.destroyAll()
                        history.push(URL_HOME)
                    }
                })
                else {
                    const json = await res.json()
                    console.log(json)
                    if (json.data.content.length === 0) {
                        setIsEmptyPlanList(true)
                    } else {
                        setIsEmptyPlanList(false)
                    }
                    setPlanList(json.data.content)
                    setIsLoadedData(true)
                }
            } catch (TypeError) {
                Modal.error(
                    {
                        title: "Login session expired",
                        content: "Please login again",
                        onOk: () => {
                            isSessionExpired.set(true)
                        }
                    },)
            }
        })()
    }, [])

    return (
        <AnimatedPage>
            <div className="form-container">
                {isLoadedData &&
                    <div className="plan-list">
                        <h2 style={{textAlign: "center"}}>Loan</h2>
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
                                    title: `Are you sure want to create a loan ${money}?`,
                                    onOk: async () => {
                                        const res = await transactionCreateLoan({
                                            "amount": money,
                                            interestId: planType
                                        })
                                        if (!res.ok) Modal.error({
                                            title: "Can not create loan!",
                                            onOk: () => Modal.destroyAll()
                                        })
                                        else {
                                            const newUserInfo = await (await userGetInfo()).json()
                                            window.localStorage.setItem(USER_INFO, JSON.stringify(newUserInfo.data))
                                            userInfo.set(JSON.stringify(newUserInfo.data))
                                            Modal.success({
                                                title: "Create loan successful!", onOk: () => {
                                                    Modal.destroyAll()
                                                    setMoney(0)
                                                }
                                            })
                                        }
                                    }
                                })
                            }}>
                            <Form.Item>
                                <h2 style={{textAlign: "center"}}>Plan list</h2>
                                {isEmptyPlanList && <p>Sorry, there is no plan current in our bank</p>}

                                <Radio.Group style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                             onChange={(e) => {
                                                 setPlanType(e.target.value)
                                             }}
                                             buttonStyle="solid">
                                    {isLoadedData && planList.map(item =>
                                        item.type === 'loan' ?
                                            <Radio.Button key={item.id} value={item.id}>
                                                <div style={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}>
                                                    <p><b>Rate: </b>{item.rate}%</p>
                                                    <p><b>Instant rate: </b>{item.instantRate}%</p>
                                                    <p><b>Duration: </b>{millisecondsToDate(item.duration)} days</p>
                                                </div>
                                            </Radio.Button>
                                            : <div key={item.id}/>
                                    )}
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                rules={[{required: true, message: 'Please enter your money!'}]}>
                                <h3 style={{textAlign: "center"}}>Money to loan</h3>
                                <InputNumber style={{width: "100%"}} value={money} onChange={(e => setMoney(e))}/>
                            </Form.Item>
                            <Form.Item style={{textAlign: "center"}}>
                                <Button type={"primary"} size={"large"} htmlType="submit">Loan</Button>
                            </Form.Item>
                        </Form>
                    </div>}
            </div>

        </AnimatedPage>
    )
}

export default Loan