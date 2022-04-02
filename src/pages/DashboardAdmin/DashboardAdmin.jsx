import "./DashboardAdmin.css"
import {useHistory} from "react-router-dom";
import {URL_HOME} from "../../const/routing_address";
import AnimatedPage from "../../utils/AnimatedPage";
import React, {useContext, useState} from "react";
import SharedContext from "../../utils/Context";
import {IS_ADMIN, TOKEN, USER_INFO} from "../../const/key_storage";
import UserList from "./UserList/UserList";
import {Avatar, Button, Card, Form, Input, Modal, Upload, message, Progress, Spin} from "antd";
import {changeAvatar, changePassword, getUserInfo, setBalance} from "../../api/api_config";
import ImgCrop from "antd-img-crop";
import {InboxOutlined, UploadOutlined} from "@ant-design/icons";
import Resizer from "react-image-file-resizer";

const DashboardUser = () => {
    const USER_LIST = 0;
    const RATE_ADJUSTMENT = 1;
    const {userInfo, isAdmin} = useContext(SharedContext)
    const history = useHistory()
    const [showUserList, setShowUserList] = useState(false);
    const [showRateAdjustment, setShowRateAdjustment] = useState(false);

    const showComponent = (type) => {
        setShowUserList(type === USER_LIST)
        setShowRateAdjustment(type === RATE_ADJUSTMENT)
    }

    const uploadImage = async (options) => {
        const { file} = options;
        Modal.info({
            style: {textAlign: "center", padding: 50},
            centered: true,
            title: (<h2><Spin/>    Uploading your image</h2>),
            okButtonProps: {style: {display: 'none'}},
            icon: <div/>
        })
        let formData = new FormData();
        const newImage = await getResizedImage(file)
        formData.append('avatar', newImage);

        const res = await changeAvatar({
            data: formData,
        })
        if (!res.ok)
            Modal.error({title: "Can't upload your file!"})
        const updatedUserData = await getUserInfo()
        if (!updatedUserData.ok) return
        const updatedJson = await updatedUserData.json()
        await window.localStorage.setItem(USER_INFO, JSON.stringify(updatedJson.data))
        await userInfo.set(JSON.stringify(updatedJson.data))
        Modal.destroyAll()
    };

    const getResizedImage = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            }, 'file');
    });

    return (
        <AnimatedPage>
            {isAdmin.get &&
            <Card style={{marginTop: 200}}>
                <div className="card-container">
                    <div className="card-container__meta">
                        <Avatar size={90}
                                src={JSON.parse(window.localStorage.getItem(USER_INFO)).user.avatar !== null ? JSON.parse(window.localStorage.getItem(USER_INFO)).user.avatar : "https://joeschmoe.io/api/v1/random"}/>
                        <h2>{JSON.parse(window.localStorage.getItem(USER_INFO)).user.firstName}</h2>
                    </div>
                    <div className="card-container__balance">
                        <h2>Balance: </h2>
                        <p>{JSON.parse(window.localStorage.getItem(USER_INFO)).balance} VND</p>
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
                                    Modal.confirm({
                                        title: "Adjust balance",
                                        centered: true,
                                        width: 600,
                                        content: (
                                            <Form
                                                name="basic"
                                                labelCol={{span: 8}}
                                                wrapperCol={{span: 16}}
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
                                            </Form>
                                        ),
                                        onOk: async () => {
                                            console.log(password.new_password !== password.new_password_confirm)
                                            if (password.new_password !== password.new_password_confirm)
                                                Modal.error({
                                                    title: "Oops",
                                                    content: "Password doesn't match",
                                                    onOk() {
                                                        return
                                                    }
                                                })
                                            else {
                                                let formData = new FormData();
                                                formData.append('previous_pass', password.previous_pass);
                                                formData.append('new_password', password.new_password)
                                                const res = await changePassword({
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
                                        }
                                    })
                                }
                            }
                            type={"primary"}>Change password</Button>
                        <ImgCrop rotate shape={"round"} grid quality={100}>
                            <Upload
                                multiple={false}
                                showUploadList={false}
                                customRequest={uploadImage}>
                                <Button type={"primary"} icon={<UploadOutlined/>}>Change avatar</Button>
                            </Upload>
                        </ImgCrop>
                    </div>
                </div>
            </Card>
            }
            <div className="user-list">
                {showUserList && <UserList/>}
            </div>
            {!(window.localStorage.getItem(IS_ADMIN) === "true") && history.push(URL_HOME)}
        </AnimatedPage>
    )
}
export default DashboardUser