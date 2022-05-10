import {Avatar, Image} from "antd";
import "./AboutUs.css"
import {HeartFilled} from "@ant-design/icons";

const AboutUs = () => {
    const avatarSize = 150;
    const av_link_Rain = "https://i.ibb.co/SmHGM1F/Rain.jpg"
    const av_link_Nguyen = "https://i.ibb.co/DKBT7sy/NT.jpg"
    const av_link_Hoang = "https://i.ibb.co/HtB99r5/Hoang.jpg"
    const av_link_Long = "https://i.ibb.co/ZfR00Br/Long.jpg"
    const av_link_Huy = "https://i.ibb.co/b39qbt4/Huy.jpg"
    const av_link_Linh = "https://i.ibb.co/2FN5dcM/Linh.jpg"
    const av_link_Duy = "https://i.ibb.co/nrpkdjc/Duy.jpg"

    return (
        <div className="base-about-us">
            <div className="contributors-container">
                <h2>About us</h2>
                <div className="contributors-list">
                    <div className="contributor__main-dev">
                        <div className="contributor">
                            <Avatar size={avatarSize+90} src={av_link_Rain} preview={"false"}/>
                            <p>Rain (Dương)</p>
                            <span>Front-end developer, back-end developer, UI/UX designer</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize+90} src={av_link_Nguyen} preview={"false"}/>
                            <p>Nguyên Trần</p>
                            <span>Back-end developer, Technical Leader, database designer</span>
                        </div>
                    </div>
                    <div className="contributor__sub-dev">
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Hoang} preview={"false"}/>
                            <p>Tuyên Hoàng</p>
                            <span>Project Manager, front-end developer, report writer</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Long} preview={"false"}/>
                            <p>Trương Hoàng Long</p>
                            <span>Tester, back-end developer</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Huy} preview={"false"}/>
                            <p>Nguyễn Đức Huy</p>
                            <span>Back-end developer, use-case and sequence diagram</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Linh} preview={"false"}/>
                            <p>Nông Khánh Linh</p>
                            <span>Front-end developer, Class activity and diagram drawer</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Duy} preview={"false"}/>
                            <p>Trần Văn Duy</p>
                            <span>Front-end developer, use-case writer</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-project">
                <h2>About project</h2>
                <div className="about-project__container">
                    <div className="about-project__img-container">
                        <Image height={300} src={"https://yt3.ggpht.com/ytc/AKedOLTWM3d7_R1ggXrUWPYah8spSwoTHl8nTG0g5Vk97g=s900-c-k-c0x00ffffff-no-rj"} preview={"false"}/>
                    </div>
                    <div className="about-project__text-container">
                        <h2>Made by <HeartFilled/> by FIT-er</h2>
                        <p>"There are no secret to success. It is the result of preparation, hard word and learning from failure."</p>
                        <p>With those effort we try our best to create this project for banking purpose with customization for user and easy to manage to administrator. We want to deliver to you a smooth and amazing experience on our website.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;