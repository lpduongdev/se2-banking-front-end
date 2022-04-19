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
import {USER_INFO} from "../../../const/key_storage";
import AnimatedPage from "../../../utils/AnimatedPage";


const UserList = () => {
    const {userInfo, isSessionExpired} = useContext(SharedContext)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [total, setTotal] = useState(0)
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const SORT_TYPE = "id,asc"

    useEffect(() => {
        getPaginationData().then(r => console.log(r))
    }, [page])

    const getPaginationData = async () => {
        setIsLoading(true)
        try {
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
        let data = {
            phoneNumber: "",
            balance: "",
            password: "",
            passwordConfirm: "",
            code: "",
            firstName: "",
            lastName: "",
            citizenIdentification: "",
            email: "",
            address: "",
        }
        let isSubmitting = false
        Modal.info({
            title: "Add new user",
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
                        isSubmitting = true;
                        if (!checkForm(data)) return

                        let isUpdatedInfo = true;

                        //**********************  CREATING ACCOUNT  **************************//
                        let registerAccountResponse = null;

                        if (data.code) registerAccountResponse = await registerAdmin({
                            phoneNumber: data.phoneNumber,
                            password: data.password,
                            code: data.code,
                        });
                        else
                            registerAccountResponse = await registerUser({
                                phoneNumber: data.phoneNumber,
                                password: data.password,
                            })

                        if (!registerAccountResponse.ok || registerAccountResponse.status === 400) {
                            Modal.error({
                                title: 'Error',
                                content: (await registerAccountResponse.json()).message,
                                onOk: () => Modal.destroyAll()
                            })
                        }

                        const registerAccountResponseJSON = await registerAccountResponse.json()
                        //************************************************************************//


                        //************************** UPDATE USER INFO ****************************//
                        const updateUserInfoResponse = await updateUserInfo({
                            id: registerAccountResponseJSON.data.id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            address: data.address,
                            citizenIdentification: data.citizenIdentification
                        })

                        if (!updateUserInfoResponse.ok || updateUserInfoResponse.status === 400) {
                            isUpdatedInfo = false
                            Modal.error({
                                title: 'Oops',
                                content: (await updateUserInfoResponse.json()).message,
                                onOk: async () => {
                                    await deleteUser(registerAccountResponseJSON.data.id)
                                    await getPaginationData();
                                    Modal.destroyAll()
                                },
                            })
                        }

                        //************************************************************************//


                        //***********************    UPDATING BALANCE   **************************//
                        let formData = new FormData();
                        formData.append('balance', data.balance);
                        const updateBalanceResponse = await setBalance({
                            id: registerAccountResponseJSON.data.id,
                            data: formData,
                        })

                        if (!updateBalanceResponse.ok)
                            Modal.error({
                                title: "Oops",
                                content: "Please check your balance value and change it later"
                                , onOk: () => Modal.destroyAll()
                            })
                        //************************************************************************//
                        await getPaginationData()
                        if (isUpdatedInfo)
                            Modal.success({
                            title: "Completed",
                            content: "Created new user account successfully!",
                            onOk: () => Modal.destroyAll()
                        })
                        isSubmitting = false
                    }}
                    autoComplete="on">
                    <Form.Item
                        label="Phone number:"
                        name="phoneNumber"
                        initialValue={data.phoneNumber}
                        rules={[{required: true, message: 'Please input your phone number!'}]}>
                        <Input onChange={(e) => data.phoneNumber = e.currentTarget.value}/>
                    </Form.Item>

                    <Form.Item
                        label="Initial balance:"
                        name="balance"
                        initialValue={data.balance}
                        rules={[{required: true, message: 'Please input your balance!'}]}>
                        <InputNumber onChange={(e) => data.balance = e}/>
                    </Form.Item>
                    <Form.Item
                        label="Password:"
                        name="password"
                        initialValue={data.email}
                        rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input.Password
                            onChange={(e) => data.password = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Confirm your password:"
                        name="passwordConfirm"
                        initialValue={data.passwordConfirm}
                        rules={[{required: true, message: 'Please input your password confirm!'}]}>
                        <Input.Password onChange={(e) => data.passwordConfirm = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Administration Code:"
                        name="code"
                        initialValue={data.code}>
                        <Input onChange={(e) => data.code = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="First name:"
                        name="firstName"
                        initialValue={data.firstName}
                        rules={[{required: true, message: 'Please input your firstname!'}]}>
                        <Input onChange={(e) => data.firstName = e.currentTarget.value}/>
                    </Form.Item>

                    <Form.Item
                        label="Last name:"
                        name="lastName"
                        initialValue={data.lastName}
                        rules={[{required: true, message: 'Please input your last name!'}]}>
                        <Input
                            onChange={(e) => data.lastName = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Citizen Identification:"
                        name="citizenIdentification"
                        initialValue={data.citizenIdentification}
                        rules={[{required: true, message: 'Please input your citizen identification!'}]}>
                        <Input
                            onChange={(e) => data.citizenIdentification = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Email:"
                        name="email"
                        initialValue={data.email}
                        rules={[{required: true, message: 'Please input your email!'}]}>
                        <Input
                            onChange={(e) => data.email = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Address:"
                        name="address"
                        initialValue={data.address}
                        rules={[{required: true, message: 'Please input your address!'}]}>
                        <Input onChange={(e) => data.address = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Button loading={isSubmitting} type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button style={{marginLeft: 50}} htmlType="button" onClick={() => Modal.destroyAll()}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>),
        })
    }

    const checkForm = (data) => {
        for (const item in data) {
            if (item === "phoneNumber") {
                if (!(new RegExp("^(\\+\\d)?\\d{10}$").test(data.phoneNumber))) {
                    Modal.error({title: "Invalid phone number"})
                    return false;
                }

            }
            if (item === "balance") {
                if (data.balance < 0) {
                    Modal.error({title: "Invalid initial balance"})
                    return false;
                }
            }
            if (item === "password") {
                if (!new RegExp("/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/").test(data.password)) {
                    Modal.error({title: "Your password must have at least one number and special character"})
                    return false;
                }
                if (data.password !== data.passwordConfirm) {
                    Modal.error({title: "Your password confirm doesn't match"})
                    return false;
                }
            }
            if (item === "email") {
                if (!(new RegExp("/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\\.)+[A-Za-z]+$/\n").test(data.email))) {
                    Modal.error({title: "Invalid email type"})
                    return false;
                }
            }
        }
        return true
    }

    const onEditInfo = async (record) => {
        let inputData = record
        Modal.info({
            title: "Edit info",
            width: 600,
            icon: <div/>,
            centered: true,
            content: (
                <Form
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={async () => {
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
                            if (json.status === 0) Modal.success({
                                title: "Edit successfully",
                                onOk: () => Modal.destroyAll()
                            })
                        }
                        await getPaginationData()
                    }}>
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
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                            <Button style={{marginLeft: 50}} htmlType="button" onClick={() => Modal.destroyAll()}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>),
            okButtonProps: {style: {display: "none"}}
        })
    }

    const onChangeBalance = async (record) => {
        let balance = record.balance
        Modal.confirm({
            title: "Adjust balance",
            width: 600,
            icon: <div/>,
            centered: true,
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
            <Card headStyle={{textAlign: "center", fontWeight: "bold"}} title="User list" bordered={false} style={{width: "100%"}}>
                <Button shape={['round']} style={{marginBottom: 30}} type="primary" onClick={onAddUser}>Add new
                    user</Button>
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

export default UserList;
