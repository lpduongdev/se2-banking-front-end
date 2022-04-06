import "./DashboardUser.css"
import {useHistory} from "react-router-dom";
import AnimatedPage from "../../utils/AnimatedPage";
import React, {useContext, useState} from "react";
import SharedContext from "../../utils/Context";
import {USER_INFO} from "../../const/key_storage";
import {Avatar, Button, Card, Col, Form, Input, Modal, Row, Upload} from "antd";
import {changeAvatar, changePassword, getUserInfo} from "../../api/api_config";
import ImgCrop from "antd-img-crop";
import {
    BankFilled,
    DollarCircleFilled, InteractionFilled,
    MoneyCollectFilled,
    RedEnvelopeFilled,
    UploadOutlined,
    WalletFilled
} from "@ant-design/icons";
import Resizer from "react-image-file-resizer";
import {URL_ADMIN_DASHBOARD} from "../../const/routing_address";

const DashboardUser = () => {
    const {userInfo, isAdmin} = useContext(SharedContext)
    const history = useHistory()
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    const uploadImage = async (options) => {
        const {file} = options;
        setIsUploadingAvatar(true)
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
        setIsUploadingAvatar(false)
    };

    const getResizedImage = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            }, 'file');
    });

    return (
        <AnimatedPage>
            {isAdmin.get && history.push(URL_ADMIN_DASHBOARD)}
            {!isAdmin.get &&
            <div className="base">
                <Card>
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
                                                        <Button loading={isSubmitting} type="primary" htmlType="submit">
                                                            Submit
                                                        </Button>
                                                        <Button style={{marginLeft: 50}} htmlType="button"
                                                                onClick={() => Modal.destroyAll()}>
                                                            Cancel
                                                        </Button>
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
                                    customRequest={uploadImage}>
                                    <Button loading={isUploadingAvatar} type={"primary"} icon={<UploadOutlined/>}>Change
                                        avatar</Button>
                                </Upload>
                            </ImgCrop>
                        </div>
                    </div>
                </Card>
                <Card style={{display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
                    <Row >
                        <Col>
                            <Button className="btn-item" size={"large"}><DollarCircleFilled/> Transfer</Button>
                        </Col>
                        <Col >
                            <Button className="btn-item" size={"large"}><RedEnvelopeFilled/> Deposit Money</Button>

                        </Col>
                        <Col>
                            <Button className="btn-item" size={"large"}><MoneyCollectFilled/> Withdraw Money</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="btn-item" size={"large"}><WalletFilled/> Money Saving</Button>

                        </Col>
                        <Col>
                            <Button className="btn-item" size={"large"}><BankFilled/> Money Loan</Button>

                        </Col>
                        <Col>
                            <Button className="btn-item" size={"large"}><InteractionFilled/> Transaction History</Button>

                        </Col>
                    </Row>

                </Card>
            </div>
            }
        </AnimatedPage>
    )
}
export default DashboardUser