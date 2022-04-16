import "./LoginPage.css"
import React, {useContext, useEffect, useState} from "react";
import AnimatedPage from "../../utils/AnimatedPage"
import SharedContext from "../../utils/Context";
import {URL_ADMIN_DASHBOARD, URL_USER_DASHBOARD} from "../../const/routing_address";
import {
    getUserInfo,
    login,
    registerAdmin,
    setBalance,
    updateUserInfo,
    deleteUser
} from "../../api/api_config";
import {USER_INFO, IS_ADMIN, TOKEN} from "../../const/key_storage";
import {useHistory} from "react-router";
import {Button, Card, Form, Image, Input, InputNumber, Modal} from "antd";


const LoginPage = () => {
    const {isAdmin, token, userInfo, showHeader} = useContext(SharedContext)
    const [isLoading, setIsLoading] = useState(false)
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    useEffect(() => {
        if (showHeader.get) showHeader.set(false)
        return () => showHeader.set(true)
    }, [])

    const checkValid = () => {

        if (!phone) {
            Modal.warning({
                title: 'Something went wrong',
                content: "Invalid phone number",
                onOk() {
                },
            })
            return false;
        }
        if (!password) {
            Modal.warning({
                title: 'Something went wrong',
                content: "Invalid phone password",
                onOk() {
                },
            })
            return false;
        }
        return true
    }

    const handleLogin = async () => {
        setIsLoading(true)

        if (!checkValid()) {
            setIsLoading(false)
            return
        }


        const object = {phoneNumber: phone, password: password}
        const res = await login(object)


        setPhone("")
        setPassword("")

        setIsLoading(false)
        if (!res.ok) {
            Modal.warning({
                title: 'Oops',
                content: "Wrong username or phone number",
                onOk() {
                },
            })
        } else {
            const json = await res.json()

            const tokenString = json.data

            localStorage.setItem(TOKEN, tokenString)

            token.set(tokenString)

            let fetchedData = await getUserInfo()

            if (!fetchedData.ok) {
                Modal.error({
                    title: "Oops!",
                    content: "Can't get userdata, please try again",
                    onOk() {
                    }
                })
            } else {

                fetchedData = await fetchedData.json();

                window.localStorage.setItem(USER_INFO, JSON.stringify(fetchedData.data))

                userInfo.set(JSON.stringify(fetchedData.data))

                isAdmin.set(checkAdmin(fetchedData.data))

                if (checkAdmin(fetchedData.data))

                    localStorage.setItem(IS_ADMIN, "true")

                else

                    localStorage.setItem(IS_ADMIN, "false")

                history.push(isAdmin.get ? URL_ADMIN_DASHBOARD : URL_USER_DASHBOARD)
            }
        }
    }

    const checkAdmin = (fetchedData) => {
        for (const item of fetchedData.roles) {
            console.log("AdminCheck: " + (item.name === "admin"))
            if (item.name === "admin")
                return true
        }
        return false
    }


    const checkForm = (data) => {
        for (const item in data) {
            if (item === "phoneNumber") {
                if (data.phoneNumber.length < 9) {
                    Modal.error({title: "Phone length must higher than 8"})
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
                if (data.password !== data.passwordConfirm) {
                    Modal.error({title: "Your password confirm doesn't match"})
                    return false;
                }
            }
            if (item === "email") {
                console.log(/\S+@\S+\.\S+/.test(data.email))
                if (!(/\S+@\S+\.\S+/.test(data.email))) {
                    Modal.error({title: "Invalid email type"})
                    return false;
                }
            }
        }
        return true
    }

    const onRegisterForm = async () => {
        showHeader.set(false)
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

                        const registerAccountResponse = await registerAdmin({
                            phoneNumber: data.phoneNumber,
                            password: data.password,
                            code: data.code,
                        });

                        if (!registerAccountResponse.ok || registerAccountResponse.status === 400) {
                            Modal.error({
                                title: 'Error',
                                content: (await registerAccountResponse.json()).message,
                                onOk: () => Modal.destroyAll()
                            })
                        } else {

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
                            if (isUpdatedInfo)
                                Modal.success({
                                    title: "Completed",
                                    content: "Created new user account successfully!",
                                    onOk: () => Modal.destroyAll()
                                })
                            isSubmitting = false
                        }
                    }}
                    autoComplete="on">
                    <Form.Item
                        label="Phone number:"
                        name="phoneNumber"
                        initialValue={data.phoneNumber}
                        rules={[{required: true, message: 'Please input your phone number!'}]}>
                        <Input autoComplete={"account"} onChange={(e) => data.phoneNumber = e.currentTarget.value}/>
                    </Form.Item>

                    <Form.Item
                        label="Initial balance:"
                        name="balance"
                        initialValue={data.balance}
                        rules={[{required: true, message: 'Please input your balance!'}]}>
                        <InputNumber autoComplete={"balance"} onChange={(e) => data.balance = e}/>
                    </Form.Item>
                    <Form.Item
                        label="Password:"
                        name="password"
                        initialValue={data.email}
                        rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input.Password autoComplete={"password"}
                            onChange={(e) => data.password = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Confirm your password:"
                        name="passwordConfirm"
                        initialValue={data.passwordConfirm}
                        rules={[{required: true, message: 'Please input your password confirm!'}]}>
                        <Input.Password autoComplete={"passwordConfirm"} onChange={(e) => data.passwordConfirm = e.currentTarget.value}/>
                    </Form.Item>
                    <Form.Item
                        label="Administration Code:"
                        name="code"
                        initialValue={data.code}
                        rules={[{required: true, message: 'Please input your admin code!'}]}>
                        <Input autoComplete={"adminCode"} onChange={(e) => data.code = e.currentTarget.value}/>
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
                        <Button loading={isSubmitting} size={"large"} type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button style={{marginLeft: 50}} size={"large"} htmlType="button"
                                onClick={() => Modal.destroyAll()}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>),
        })
    }

    return (
        <AnimatedPage>
            <div className="base-login" style={{display: "flex", justifyContent: "center"}}>
                <Card
                    title="Login"
                    style={{width: 500, height: "fit-content"}}
                    headStyle={{fontWeight: "bold", fontSize: "2rem", textAlign: "center"}}
                    bodyStyle={{display: "flex", flexDirection: "row", padding: "20px 40px", justifyContent: "center"}}
                    className="card">
                    <Form
                        className={"form-login"}
                        onFinish={handleLogin}>
                        <Form.Item
                            rules={[{required: true, message: 'Please enter phone number!'}]}>
                            <h3>Phone number:</h3>
                            <Input disabled={isLoading} autoComplete="Phone" value={phone} onChange={(e) => {
                                setPhone(e.currentTarget.value)
                            }}/>
                        </Form.Item>
                        <Form.Item
                            rules={[{required: true, message: 'Please enter password!'}]}>
                            <h3>Password:</h3>
                            <Input.Password disabled={isLoading} autoComplete="Password" value={password} onChange={(e) => {
                                setPassword(e.currentTarget.value)
                            }}/>
                        </Form.Item>
                        <Button type={"primary"} size={"large"} style={{textAlign: "center"}} loading={isLoading}
                                htmlType="submit">Login</Button>
                        <p style={{marginTop: 20}}>Haven't got account? <a disabled={isLoading} onClick={isLoading? () => {} :  onRegisterForm}>Register now</a></p>
                    </Form>
                </Card>
            </div>
        </AnimatedPage>
    )
}

export default LoginPage;