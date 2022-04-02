import React, {useContext, useEffect, useState} from "react";
import {Card, Button, Modal, Table, Space, Form, Input, InputNumber, Dropdown, Menu} from "antd";
import {
    deleteUser,
    getPageableUser,
    registerUser,
    registerAdmin,
    updateUserInfo,
    setBalance, getUserInfo
} from "../../../api/api_config";
import "../Form.css"
import SharedContext from "../../../utils/Context";
import {DownOutlined} from "@ant-design/icons";
import {USER_INFO} from "../../../const/key_storage";
import AnimatedPage from "../../../utils/AnimatedPage";


const UserList = () => {
        const {userInfo} = useContext(SharedContext)
        const [phoneNumber, setPhoneNumber] = useState("")
        const [password, setPassword] = useState("")
        const [passwordConfirm, setPasswordConfirm] = useState("")

        const [code, setCode] = useState("")
        const [firstName, setFirstName] = useState("")
        const [lastName, setLastName] = useState("")
        const [citizenIdentification, setCitizenIdentification] = useState("")
        const [email, setEmail] = useState("")
        const [address, setAddress] = useState("")

        const [isModalVisible, setIsModalVisible] = useState(false);
        const [confirmLoading, setConfirmLoading] = useState(false);

        const onCreateCancel = () => {
            setConfirmLoading(false)
            setPhoneNumber("")
            setPassword("")
            setPasswordConfirm("")
            setCode("")
            setFirstName("")
            setLastName("")
            setCitizenIdentification("")
            setEmail("")
            setAddress("")
            setIsModalVisible(false);
            getPaginationData()
        };

        const [page, setPage] = useState(0);
        const [size, setSize] = useState(200);
        const [total, setTotal] = useState(0)
        const [users, setUsers] = useState([])

        const SORT_TYPE = "id,asc"

        useEffect(() => {
            getPaginationData()
        }, [])

        const getPaginationData = async () => {
            const res = await getPageableUser({
                page: page,
                size: size,
                sortBy: SORT_TYPE,
            })
            if (!res.ok) return;
            const json = await res.json();

            const newUsers = json.data.content.map(e => {
                e = Object.assign(e, e.user)
                delete e.user
                return e
            })
            setUsers(newUsers);
            setTotal(json.totalPages);
        }

        const onDeleteUser = async (id) => {
            Modal.confirm({
                    title: "Warning",
                    content: "Are you sure want to delete?",
                    okText: "Sure!",
                    cancelText: "Nope",
                    onOk: async () => {
                        const res = await deleteUser(id);
                        if (!res.ok) Modal.error({
                            disableEnforceFocus: true,
                            title: "Oops!",
                            content: "Delete failed",
                            onOk() {
                            }
                        })
                        await getPaginationData()
                    },
                    onCancel: () => {
                    },
                }
            )
        }

        const onAddUser = async () => {
            let inputData = {
                phoneNumber: "",
                balance: 0.0,
                password: "",
                passwordConfirm: "",
                code: "",
                firstName: "",
                lastName: "",
                citizenIdentification: "",
                email: "",
                address: "",
            }

            Modal.confirm({
                title: "Add new user",
                width: 600,
                centered: true,
                content: (
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        autoComplete="off">
                        <Form.Item
                            label="Phone number:"
                            name="phoneNumber"
                            initialValue={inputData.phoneNumber}
                            rules={[{required: true, message: 'Please input your phone number!'}]}>
                            <Input onChange={(e) => inputData.phoneNumber = e.currentTarget.value}/>
                        </Form.Item>

                        <Form.Item
                            label="Initial balance:"
                            name="balance"
                            initialValue={inputData.balance}
                            rules={[{required: true, message: 'Please input your balance!'}]}>
                            <InputNumber onChange={(e) => inputData.balance = e}/>
                        </Form.Item>
                        <Form.Item
                            label="Password:"
                            name="password"
                            initialValue={inputData.email}
                            rules={[{required: true, message: 'Please input your password!'}]}>
                            <Input.Password
                                onChange={(e) => inputData.password = e.currentTarget.value}/>
                        </Form.Item>
                        <Form.Item
                            label="Confirm your password:"
                            name="passwordConfirm"
                            initialValue={inputData.passwordConfirm}
                            rules={[{required: true, message: 'Please input your password confirm!'}]}>
                            <Input.Password onChange={(e) => inputData.passwordConfirm = e.currentTarget.value}/>
                        </Form.Item>
                        <Form.Item
                            label="Administration Code:"
                            name="code"
                            initialValue={inputData.code}>
                            <Input onChange={(e) => inputData.code = e.currentTarget.value}/>
                        </Form.Item>
                        <Form.Item
                            label="First name:"
                            name="firstName"
                            initialValue={inputData.firstName}
                            rules={[{required: true, message: 'Please input your firstname!'}]}>
                            <Input onChange={(e) => inputData.firstName = e.currentTarget.value}/>
                        </Form.Item>

                        <Form.Item
                            label="Last name:"
                            name="lastName"
                            initialValue={inputData.lastName}
                            rules={[{required: true, message: 'Please input your last name!'}]}>
                            <Input
                                onChange={(e) => inputData.lastName = e.currentTarget.value}/>
                        </Form.Item>
                        <Form.Item
                            label="Citizen Identification:"
                            name="citizenIdentification"
                            initialValue={inputData.citizenIdentification}
                            rules={[{required: true, message: 'Please input your citizen identification!'}]}>
                            <Input
                                onChange={(e) => inputData.citizenIdentification = e.currentTarget.value}/>
                        </Form.Item>
                        <Form.Item
                            label="Email:"
                            name="email"
                            initialValue={inputData.email}
                            rules={[{required: true, message: 'Please input your email!'}]}>
                            <Input
                                onChange={(e) => inputData.email = e.currentTarget.value}/>
                        </Form.Item>
                        <Form.Item
                            label="Address:"
                            name="address"
                            initialValue={inputData.address}
                            rules={[{required: true, message: 'Please input your address!'}]}>
                            <Input onChange={(e) => inputData.address = e.currentTarget.value}/>
                        </Form.Item>
                    </Form>),
                okText: "Confirm",
                onOk: async () => {
                    let registerData = null;
                    // Check if us
                    // er or admin register
                    if (code) registerData = await registerAdmin({
                        phoneNumber: inputData.phoneNumber,
                        password: inputData.password,
                        code: inputData.code,
                    });
                    else
                        registerData = await registerUser({
                            phoneNumber: inputData.phoneNumber,
                            password: inputData.password,
                        })

                    // Check response
                    if (!registerData.ok || registerData.status === 400) {
                        Modal.error({
                            title: 'Error',
                            content: (await registerData.json()).message,
                            onOk() {
                            },
                        })
                    } else {

                        // Updating user info if response ok
                        const accountRegData = await registerData.json()

                        if (accountRegData.status === 0) {
                            const res = await updateUserInfo({
                                id: accountRegData.data.id,
                                firstName: inputData.firstName,
                                lastName: inputData.lastName,
                                email: inputData.email,
                                address: inputData.address,
                                citizenIdentification: inputData.citizenIdentification
                            })

                            if (!res.ok || res.status === 400)
                                Modal.error({
                                    title: 'Oops',
                                    content: (await res.json()).message,
                                    onOk: async () => {
                                        await deleteUser(accountRegData.data.id)
                                        await getPaginationData();
                                    },
                                })
                            else {
                                const json = await res.json()

                                if (json.status === 0) {
                                    Modal.success({
                                        title: 'Completed',
                                        content: "Create successfully",
                                        onOk() {
                                        },
                                    })
                                } else {
                                    Modal.warning({
                                        title: 'Oops',
                                        content: json.message,
                                        onOk() {
                                        },
                                    })
                                }

                                let formData = new FormData();
                                formData.append('balance', inputData.balance);
                                const res = await setBalance({
                                    id: accountRegData.data.id,
                                    data: formData,
                                })

                                if (!res.ok)
                                    Modal.error({
                                        title: "Oops",
                                        content: "Please check your balance value and change it later"
                                    })
                            }
                        }
                    }
                    await getPaginationData()
                },
                onCancel: () => {
                }
            })
        }

        const onEditInfo = async (record) => {
            let inputData = record
            Modal.confirm({
                title: "Edit info",
                content: (
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        onFinish={() => {
                        }}
                        onFinishFailed={() => {
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="First name:"
                            name="firstName"
                            initialValue={inputData.firstName}
                            rules={[{required: true, message: 'Please input your firstname!'}]}>
                            <Input onChange={(e) => inputData.firstName = e.currentTarget.value}/>
                        </Form.Item>

                        <Form.Item
                            label="Last name:"
                            name="lastName"
                            initialValue={inputData.lastName}
                            rules={[{required: true, message: 'Please input your last name!'}]}>
                            <Input
                                onChange={(e) => inputData.lastName = e.currentTarget.value}/>
                        </Form.Item>
                        <Form.Item
                            label="Email:"
                            name="email"
                            initialValue={inputData.email}
                            rules={[{required: true, message: 'Please input your email!'}]}>
                            <Input
                                onChange={(e) => inputData.email = e.currentTarget.value}/>
                        </Form.Item>
                        <Form.Item
                            label="Address:"
                            name="address"
                            initialValue={inputData.address}
                            rules={[{required: true, message: 'Please input your address!'}]}>
                            <Input onChange={(e) => inputData.address = e.currentTarget.value}/>
                        </Form.Item>
                    </Form>),
                okText: "Update",
                onOk: async () => {
                    console.log(inputData)
                    const res = await updateUserInfo({
                        id: inputData.id,
                        firstName: inputData.firstName,
                        lastName: inputData.lastName,
                        email: inputData.email,
                        address: inputData.address,
                    })
                    if (!res.ok) Modal.error({title: "Error", content: "Nothing changed!"})
                    else {
                        const json = await res.json()
                        console.log(json)
                        if (json.status === 0) Modal.success({title: "Edit successfully"})
                    }
                    await getPaginationData()
                },
                onCancel: () => {
                }
            })
        }

        const onChangeBalance = async (record) => {
            let balance = record.balance
            Modal.confirm({
                title: "Adjust balance",
                content: (
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        autoComplete="off">
                        <Form.Item
                            label="Balance:"
                            name="balance"
                            initialValue={balance}>
                            <InputNumber onChange={(e) => balance = e}/>
                        </Form.Item>
                    </Form>
                ),
                onOk: async () => {
                    // Updating balance if user info completed

                    let formData = new FormData();
                    formData.append('balance', balance);
                    const res = await setBalance({
                        id: record.id,
                        data: formData,
                    })

                    if (!res.ok)
                        Modal.error({
                            title: "Oops",
                            content: "Please check your balance value"
                        })
                    const json = await res.json()
                    if (json.status === 0)
                        Modal.success({
                            title: "Change balance successfully",
                        })
                    await getPaginationData()

                    const updatedUserData = await getUserInfo()
                    if (!updatedUserData.ok) return
                    const updatedJson = await updatedUserData.json()
                    await window.localStorage.setItem(USER_INFO, JSON.stringify(updatedJson.data))
                    await userInfo.set(JSON.stringify(updatedJson.data))
                }
            })
        }


        return (
            <AnimatedPage>
                <Card headStyle={{textAlign: "center"}} title="User list" bordered={false} style={{ width: "100%"}}>
                    <Button shape={['round']} style={{marginBottom: 30}} type="primary" onClick={onAddUser}>Add new user</Button>
                    <Table
                        rowKey={"id"}
                        columnWidth={30}
                        pagination={{pageSize: 5, position: ['bottomCenter']}}
                        columns={[
                            {
                                title: "ID",
                                dataIndex: "id",
                                key: "id",
                            },
                            {
                                title: 'Phone',
                                dataIndex: 'phoneNumber',
                                key: 'phoneNumber',
                            },
                            {
                                title: 'Balance',
                                dataIndex: 'balance',
                                key: 'balance',
                            },
                            {
                                title: 'First name',
                                dataIndex: 'firstName',
                                key: 'firstName',
                            },
                            {
                                title: 'Last name',
                                dataIndex: 'lastName',
                                key: 'lastName',
                            },
                            {
                                title: 'Citizen ID',
                                dataIndex: 'citizenIdentification',
                                key: 'citizenIdentification',
                            },
                            {
                                title: 'Email',
                                dataIndex: 'email',
                                key: 'email',
                            },
                            {
                                title: 'Address',
                                dataIndex: 'address',
                                key: 'address',
                            },
                            {
                                title: 'Action',
                                key: 'action',
                                render: (text, record) => (
                                    <Space size="middle">
                                        <Dropdown
                                            trigger={['click']}
                                            placement="bottomRight"
                                            overlay={
                                                <Menu>
                                                    <Menu.Item key="0" onClick={() => onEditInfo(record)}>
                                                        Update information
                                                    </Menu.Item>
                                                    <Menu.Item onClick={() => onChangeBalance(record)} key="1">
                                                        Adjust balance
                                                    </Menu.Item>
                                                </Menu>
                                            }>
                                            <a className="ant-dropdown-link"
                                               onClick={e => e.preventDefault()}>
                                                Edit
                                            </a>
                                        </Dropdown>
                                        <a onClick={() => onDeleteUser(record.id)}>Delete</a>
                                    </Space>
                                ),
                            },
                        ]}
                        dataSource={users}/>
                </Card>
            </AnimatedPage>
        );
    }
;

export default UserList;
