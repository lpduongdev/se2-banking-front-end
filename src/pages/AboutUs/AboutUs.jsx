import {Avatar, Card, Image} from "antd";
import "./AboutUs.css"

const AboutUs = () => {
    const avatarSize = 150;

    return (
        <div className="base-about-us">
            <div className="contributors-container">
                <h2>About us</h2>
                <div className="contributors-list">
                    <div className="contributor">
                        <Avatar size={avatarSize} src={"https://joeschmoe.io/api/v1/random"} preview={false}/>
                        <p>Rain</p>
                    </div>
                    <div className="contributor">
                        <Avatar size={avatarSize} src={"https://joeschmoe.io/api/v1/random"} preview={false}/>
                        <p>NguyenHau</p>
                    </div>
                    <div className="contributor">
                        <Avatar size={avatarSize} src={"https://joeschmoe.io/api/v1/random"} preview={false}/>
                        <p>TuyenHoang</p>
                    </div>
                    <div className="contributor">
                        <Avatar size={avatarSize} src={"https://joeschmoe.io/api/v1/random"} preview={false}/>
                        <p>Truong Hoang Long</p>
                    </div>
                    <div className="contributor">
                        <Avatar size={avatarSize} src={"https://joeschmoe.io/api/v1/random"} preview={false}/>
                        <p>Nguyen Duc Huy</p>
                    </div>
                    <div className="contributor">
                        <Avatar size={avatarSize} src={"https://joeschmoe.io/api/v1/random"} preview={false}/>
                        <p>Khanh Linh</p>
                    </div>
                    <div className="contributor">
                        <Avatar size={avatarSize} src={"https://joeschmoe.io/api/v1/random"} preview={false}/>
                        <p>Van Duy</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;