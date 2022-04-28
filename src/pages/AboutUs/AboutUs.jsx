import {Avatar, Image} from "antd";
import "./AboutUs.css"
import {HeartFilled} from "@ant-design/icons";

const AboutUs = () => {
    const avatarSize = 150;
    const av_link_Rain = "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/259701892_1517597695284026_5695865707447278538_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PDsYv-N-yCoAX9Fv1vG&_nc_ht=scontent.fhan14-1.fna&oh=00_AT8eIrUwV1afC-2tD3DmgCtUYfdbu9zL9jFKPVvj3RqAUw&oe=626D6D58"
    const av_link_Nguyen = "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/278874685_1135040180400718_4126958879824789687_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=50-HdQcL5D0AX-B0M6L&_nc_ht=scontent.fhan14-1.fna&oh=00_AT-iNgx8nT3SspcF3ZcUXquEYeysavDBul549tgWA-6APA&oe=626D576C"
    const av_link_Hoang = "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/250384514_1521603584874056_788867112344299795_n.jpg?stp=dst-jpg_p320x320&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=4QkwefRwQA8AX-hK2Eq&_nc_ht=scontent.fhan14-2.fna&oh=00_AT8-QFwVbXQpruT4l9wBUw1FowuJQSqNvhGuVj_mlKdVIQ&oe=626DDCDF"
    const av_link_Long = "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/267471846_1278910755944693_5349516526072707348_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=xxAk6rAtcxAAX_6z9my&tn=XjtFvAqPi_QGAbRe&_nc_ht=scontent.fhan14-2.fna&oh=00_AT-vuCJngYBoalEW0GtZBtYLHUAra5FMgz6ZCze_fSscFQ&oe=626C8486"
    const av_link_Huy = "https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-1/176994343_799982227282375_7484063102971262848_n.jpg?stp=c0.71.320.320a_dst-jpg_p320x320&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=umeekHf0i9gAX-8BHfR&_nc_ht=scontent.fhan14-2.fna&oh=00_AT_-HCZTLGK1l7X3WZ4Dlr31tiNoWP5Wljo7w-1h0mL_GQ&oe=628DA7BD"
    const av_link_Linh = "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-1/61488237_100711997861208_5639780719552102400_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=sgJ8XWtvTWoAX8ROZc8&tn=XjtFvAqPi_QGAbRe&_nc_ht=scontent.fhan14-1.fna&oh=00_AT8IhT9F8SgWlkvGgfJaSTPJuRnqUd12iQ2D1AG9PDW2ug&oe=628FA460"

    return (
        <div className="base-about-us">
            <div className="contributors-container">
                <h2>About us</h2>
                <div className="contributors-list">
                    <div className="contributor__main-dev">
                        <div className="contributor">
                            <Avatar size={avatarSize+90} src={av_link_Rain} preview={"false"}/>
                            <p>Rain</p>
                            <span>Main front-end developer, UI/UX designer, sub backend-developer</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize+90} src={av_link_Nguyen} preview={"false"}/>
                            <p>Nguyen Tran</p>
                            <span>Main back-end developer, database designer</span>
                        </div>
                    </div>
                    <div className="contributor__sub-dev">
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Hoang} preview={"false"}/>
                            <p>Tuyen Hoang</p>
                            <span>Project manager, sub tester, sub front-end developer</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Long} preview={"false"}/>
                            <p>Truong Hoang Long</p>
                            <span>Main tester, sub backend developer,</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Huy} preview={"false"}/>
                            <p>Nguyen Duc Huy</p>
                            <span>Sub database designer, UI designer, sub front-end developer</span>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize} src={av_link_Linh} preview={"false"}/>
                            <p>Khanh Linh</p>
                        </div>
                        <div className="contributor">
                            <Avatar size={avatarSize} src={"https://joeschmoe.io/api/v1/random"} preview={"false"}/>
                            <p>Van Duy</p>
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;