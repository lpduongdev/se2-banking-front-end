import "./DashboardAdmin.css"
import {useHistory} from "react-router-dom";
import {URL_HOME} from "../../const/routing_address";
import AnimatedPage from "../../utils/AnimatedPage";
import React, {useContext, useState} from "react";
import SharedContext from "../../utils/Context";
import {IS_ADMIN, USER_INFO} from "../../const/key_storage";
import UserList from "./UserList/UserList";
import {Avatar, Button, Card, Form, Input, Modal, Upload, Spin} from "antd";
import {userChangePassword, userGetInfo} from "../../api/api_config";
import ImgCrop from "antd-img-crop";
import {UploadOutlined} from "@ant-design/icons";
import {uploadImage} from "../../utils/ImageProcessor";
import InterestManagement from "./InterestManagement/InterestManagement";

const DashboardUser = () => {
    const USER_LIST = 0;
    const RATE_ADJUSTMENT = 1;
    const {userInfo, isAdmin, isSessionExpired} = useContext(SharedContext)
    const history = useHistory()
    const [showUserList, setShowUserList] = useState(false);
    const [showRateAdjustment, setShowRateAdjustment] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    const showComponent = (type) => {
        setShowUserList(type === USER_LIST)
        setShowRateAdjustment(type === RATE_ADJUSTMENT)
    }
    const onUploadImage = async (options) => {
        setIsUploadingAvatar(true)
        try {
            await uploadImage(options)
        } catch (TypeError) {
            Modal.error({
                title: "Expired session", onOk: () => {
                    isSessionExpired.set(true)
                },
            })
        } finally {
            userInfo.set((await (await userGetInfo()).json()).data)
            setIsUploadingAvatar(false)
        }

    }

    return (
        <AnimatedPage>
            <div className="base">
                {isAdmin.get &&
                <Card>
                    <div className="card-container">
                        <div className="card-container__meta">
                            <Avatar size={90}
                                    src={JSON.parse(window.localStorage.getItem(USER_INFO)).user.avatar !== null ? JSON.parse(window.localStorage.getItem(USER_INFO)).user.avatar : "https://joeschmoe.io/api/v1/random"}/>
                            <h2>{JSON.parse(window.localStorage.getItem(USER_INFO)).user.firstName}</h2>
                        </div>
                        <div className="card-container__balance">
                            <h2>Balance: </h2>
                            <p>${JSON.parse(window.localStorage.getItem(USER_INFO)).balance.toFixed(2)}</p>
                            <h2>Bank debt: </h2>
                            <p>0 VND</p>
                        </div>
                        <div className="card-container__btn-list">
                            <Button disabled={showUserList} onClick={() => showComponent(USER_LIST)} type={"primary"}>Show
                                user list</Button>
                            <Button disabled={showRateAdjustment} onClick={() => showComponent(RATE_ADJUSTMENT)}
                                    type={"primary"}>Rate adjustment</Button>
                            <Button
                                onClick={
                                    () => {
                                        let password = {
                                            previous_pass: "",
                                            new_password: "",
                                            new_password_confirm: "",
                                        }
                                        let isSubmitting = false
                                        Modal.info({
                                            title: "Adjust balance",
                                            centered: true,
                                            width: 600,
                                            icon: <div/>,
                                            content: (
                                                <Form
                                                    name="basic"
                                                    labelCol={{span: 8}}
                                                    wrapperCol={{span: 16}}
                                                    onFinish={async () => {
                                                        isSubmitting = true
                                                        if (password.new_password !== password.new_password_confirm)
                                                            Modal.error({
                                                                title: "Oops",
                                                                content: "Password doesn't match",
                                                                onOk: () => {
                                                                }
                                                            })
                                                        else {
                                                            let formData = new FormData();
                                                            formData.append('previous_pass', password.previous_pass);
                                                            formData.append('new_password', password.new_password)
                                                            const res = await userChangePassword({
                                                                data: formData,
                                                            })
                                                            if (!res.ok)
                                                                Modal.error({
                                                                    title: "Oops",
                                                                    content: "Previous password doesn't match"
                                                                })
                                                            const json = await res.json()
                                                            if (json.status === 0)
                                                                Modal.success({
                                                                    title: "Change password successfully",
                                                                })
                                                        }
                                                    }}
                                                    initialValues={{remember: true}}
                                                    autoComplete="on">
                                                    <Form.Item
                                                        label="Previous password:"
                                                        name="prevPass">
                                                        <Input.Password
                                                            onChange={(e) => password.previous_pass = e.currentTarget.value}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="New password:"
                                                        name="newPass">
                                                        <Input.Password
                                                            onChange={(e) => password.new_password = e.currentTarget.value}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Confirm new password:"
                                                        name="newPassConfirm">
                                                        <Input.Password
                                                            onChange={(e) => password.new_password_confirm = e.currentTarget.value}/>
                                                    </Form.Item>
                                                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                                        <div style={{
                                                            display: "flex",
                                                            justifyContent: "flex-start",
                                                            alignItems: "center"
                                                        }}>

                                                            <Button loading={isSubmitting} type="primary"
                                                                    htmlType="submit">
                                                                Submit
                                                            </Button>
                                                            <Button style={{marginLeft: 50}} htmlType="button"
                                                                    onClick={() => Modal.destroyAll()}>
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </Form.Item>
                                                </Form>
                                            ),
                                            okButtonProps: {style: {display: "none"}}
                                        })
                                    }
                                }
                                type={"primary"}>Change password</Button>
                            <ImgCrop rotate shape={"round"} grid quality={100}>
                                <Upload
                                    multiple={false}
                                    showUploadList={false}
                                    customRequest={onUploadImage}>
                                    <Button loading={isUploadingAvatar} type={"primary"} icon={<UploadOutlined/>}>Change
                                        avatar</Button>
                                </Upload>
                            </ImgCrop>
                        </div>
                    </div>
                    <div className="user-list">
                        {showUserList && <UserList/>}
                        {showRateAdjustment && <InterestManagement/>}
                    </div>
                </Card>
                }
                {!(window.localStorage.getItem(IS_ADMIN) === "true") && history.push(URL_HOME)}
            </div>
        </AnimatedPage>
    )
}
export default DashboardUser