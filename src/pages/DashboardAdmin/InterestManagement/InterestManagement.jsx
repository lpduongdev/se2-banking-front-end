import React, {useContext, useEffect, useState} from "react";
import {Card, Button, Modal, Table, Space, Form, Input, InputNumber, Dropdown, Menu, Radio, Tag} from "antd";
import {
    adminDeleteUser,
    userUpdateUserInfo,
    adminSetBalance, userGetInfo, interestGetPageable, createInterest, interestDeleteRate, interestUpdateRate
} from "../../../api/api_config";
import "../Form.css"
import SharedContext from "../../../utils/Context";
import {TOKEN, USER_INFO} from "../../../const/key_storage";
import AnimatedPage from "../../../utils/AnimatedPage";
import {dateToMilliseconds, millisecondsToDate} from "../../../utils/DateTimeConverter";


const InterestManagement = () => {
    const {userInfo, isSessionExpired} = useContext(SharedContext)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [total, setTotal] = useState(0)
    const [interest, setInterest] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const SORT_TYPE = "id,asc"

    useEffect(() => {
        getPaginationData().then(() => {
        })
    }, [page])

    const getPaginationData = async () => {
        setIsLoading(true)
        try {
            const res = await interestGetPageable({
                page: page,
                size: size,
                sort: SORT_TYPE,
            })
            if (res.status === 403){
                Modal.error(
                    {
                        title: "Login session expired",
                        content: "Please login again",
                        onOk: () => {
                            isSessionExpired.set(true)
                        }
                    },)
                return;
            }
            if (!res.ok) return
            const json = await res.json();
            const newInterest = json.data.content.map(e => {
                e.duration = (millisecondsToDate(e.duration))
                return e
            })
            setInterest(newInterest);
            setTotal(json.data.totalElements);
        } catch (TypeError) {
            Modal.error(
                {
                    title: "Login session expired",
                    content: "Please login again",
                    onOk: () => {
                        isSessionExpired.set(true)
                    }
                },)
        } finally {
            setIsLoading(false)
        }
        setIsLoading(false)

    }

    const onDeleteInterestRate = async (id) => {
        Modal.confirm({
                title: "Warning",
                content: "Are you sure want to delete?",
                okText: "Sure!",
                cancelText: "Nope",
                onOk: async () => {
                    const res = await interestDeleteRate(id);
                    if (!res.ok) Modal.error({
                        disableEnforceFocus: true,
                        title: "Oops!",
                        content: "Delete failed",
                        onOk() {
                        }
                    })
                    else
                        Modal.success({
                            title: "Completed",
                            content: "Delete successfully"
                        })
                    await getPaginationData()
                },
                onCancel: () => {
                },
            }
        )
    }

    const onAddInterest = async () => {
        let data = {
            rate: "",
            instantRate: "",
            duration: "",
            type: "",
        }
        let isSubmitting = false
        Modal.info({
            title: "Add new interest",
            width: 600,
            icon: <div/>,
            centered: true,
            okButtonProps: {style: {display: "none"}},
            content: (
                <Form
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={async () => {
                        isSubmitting = true
                        data.duration = dateToMilliseconds(data.duration);

                        if (!checkInterestForm(data)) return

                        const createInterestRes = await createInterest({
                            rate: data.rate,
                            instantRate: data.instantRate,
                            duration: data.duration,
                            type: data.type,
                        })

                        if (!createInterestRes.ok || createInterestRes.status === 400) {
                            Modal.error({
                                title: 'Error',
                                content: (await createInterestRes.json()).message,
                                onOk: () => Modal.destroyAll()
                            })
                        } else {
                            await getPaginationData()
                            Modal.success({
                                title: "Completed",
                                content: "Created new interest rate successfully!",
                                onOk: () => Modal.destroyAll()
                            })
                        }
                    }}
                    autoComplete="on">
                    <Form.Item
                        label="Rate:"
                        name="rate"
                        initialValue={data.rate}
                        rules={[{required: true, message: 'Please enter rate!'}]}>
                        <Input suffix={"%"} disabled={isSubmitting} value={data.rate}
                               onChange={(e) => data.rate = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Instant rate:"
                        name="instantRate"
                        initialValue={data.instantRate}
                        rules={[{required: true, message: 'Please enter instant rate!'}]}>
                        <Input suffix={"%"} disabled={isSubmitting} value={data.instantRate}
                               onChange={(e) => data.instantRate = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Duration:"
                        name="duration"
                        initialValue={data.duration}
                        rules={[{required: true, message: 'Please enter duration!'}]}>
                        <Input suffix={"days"} disabled={isSubmitting} value={data.duration}
                               onChange={(e) => data.duration = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Type: "
                        rules={[{required: true, message: 'Please pick an item!'}]}>
                        <Radio.Group onChange={(e) => {
                            data.type = e.target.value
                        }}>
                            <Radio.Button disabled={isSubmitting} value="saving">Saving</Radio.Button>
                            <Radio.Button disabled={isSubmitting} value="loan">Loan</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Button loading={isSubmitting} type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button disabled={isSubmitting} style={{marginLeft: 50}} htmlType="button"
                                    onClick={() => Modal.destroyAll()}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>),
        })
    }

    const checkInterestForm = (data) => {
        for (const item in data) {
            if (!item) return false
            if (item === "duration")
                if (data.duration <= 1) {
                    Modal.error({title: "Duration must be higher than 1 day"})
                    return false
                }
        }
        return true
    }

    const onEditInterest = async (record) => {
        let data = record
        let isSubmitting = false
        Modal.info({
            title: "Edit interest",
            width: 600,
            icon: <div/>,
            centered: true,
            content: (
                <Form
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={async () => {
                        const res = await interestUpdateRate({
                            rate: data.rate,
                            instantRate: data.instantRate,
                            duration: data.duration,
                            type: data.type
                        })
                        if (!res.ok) Modal.error({title: "Error", content: "Nothing changed!"})
                        else {
                            const json = await res.json()
                            if (json.status === 0) Modal.success({
                                title: "Edit successfully",
                                onOk: () => Modal.destroyAll()
                            })
                        }
                        await getPaginationData()
                    }}>
                    <Form.Item
                        label="Rate:"
                        name="rate"
                        initialValue={data.rate}
                        rules={[{required: true, message: 'Please enter rate!'}]}>
                        <Input suffix={"%"} disabled={isSubmitting} value={data.rate}
                               onChange={(e) => data.rate = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Instant rate:"
                        name="instantRate"
                        initialValue={data.instantRate}
                        rules={[{required: true, message: 'Please enter instant rate!'}]}>
                        <Input suffix={"%"} disabled={isSubmitting} value={data.instantRate}
                               onChange={(e) => data.instantRate = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Duration:"
                        name="duration"
                        initialValue={data.duration}
                        rules={[{required: true, message: 'Please enter duration!'}]}>
                        <Input suffix={"days"} disabled={isSubmitting} value={data.duration}
                               onChange={(e) => data.duration = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Type:"
                        initialValue={data.type}
                        rules={[{required: true, message: 'Please pick an item!'}]}>
                        <Radio.Group onChange={(e) => {data.type = e.target.value}}>
                            <Radio.Button disabled={isSubmitting}
                                          value="saving">Saving</Radio.Button>
                            <Radio.Button disabled={isSubmitting}
                                          value="loan">Loan</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Button loading={isSubmitting} type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button disabled={isSubmitting} style={{marginLeft: 50}} htmlType="button"
                                    onClick={() => Modal.destroyAll()}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>),
            okButtonProps: {style: {display: "none"}}
        })
    }

    return (
        <AnimatedPage>
            <Card headStyle={{textAlign: "center", fontWeight: "bold"}} title="Interest management" bordered={false}
                  style={{width: "100%"}}>
                <Button shape={'round'} style={{marginBottom: 30}} type="primary" onClick={onAddInterest}>Add new
                    interest</Button>
                <Table
                    loading={isLoading}
                    rowKey={"id"}
                    columnWidth={30}
                    pagination={{
                        pageSize: size,
                        total: total,
                        position: ['bottomCenter'],
                        onChange: (e) => setPage(e - 1)
                    }}
                    columns={[
                        {
                            title: "ID",
                            dataIndex: "id",
                            key: "id",
                        },
                        {
                            title: 'Rate',
                            dataIndex: 'rate',
                            key: 'rate',
                            render: (text) => {
                                return text + "%"
                            }
                        },
                        {
                            title: 'Instant rate',
                            dataIndex: 'instantRate',
                            key: 'instantRate',
                            render: (text) => {
                                return text + "%"
                            }
                        },
                        {
                            title: 'Duration',
                            dataIndex: 'duration',
                            key: 'duration',
                            render: (text) => {
                                return text + " days"
                            }
                        },
                        {
                            title: 'Type',
                            dataIndex: 'type',
                            key: 'type',
                            render: (text) => {
                                let color
                                color = text === 'saving'?  "green" : "blue"
                                return (<Tag color={color} key={text}>
                                    {text.toUpperCase()}
                                </Tag>)
                            }
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            render: (text, record) => (
                                <Space size="middle">
                                    <a key="0" onClick={() => onEditInterest(record)}>Edit</a>
                                    <a onClick={() => onDeleteInterestRate(record.id)}>Delete</a>
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={interest}/>
            </Card>
        </AnimatedPage>
    );
}

export default InterestManagement;
