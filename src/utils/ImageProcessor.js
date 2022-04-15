import {BASE_URL, changeAvatar, getUserInfo, isTokenExpired} from "../api/api_config";
import {Modal} from "antd";
import {TOKEN, USER_INFO} from "../const/key_storage";
import Resizer from "react-image-file-resizer";

export const uploadImage = async (options) => {
    const {file} = options;

    let formData = new FormData();
    const newImage = await getResizedImage(file)
    formData.append('avatar', await newImage);
    const res = await changeAvatar({
        data: formData,
    })

    if (!res.ok) {
        Modal.error({title: "Can't upload your file!"})
    }
    const updatedUserData = await getUserInfo()
    if (!updatedUserData.ok) return
    const updatedJson = await updatedUserData.json()
    await window.localStorage.setItem(USER_INFO, JSON.stringify(updatedJson.data))
    return true
};

const getResizedImage = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
        uri => {
            resolve(uri);
        }, 'file');
});

