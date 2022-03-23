import {TOKEN} from "../const/key_storage";

export const BASE_URL = 'https://e-banking-2022-backend.herokuapp.com/api/v1'


export const login = async (accountDto) =>  {
    return (await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(accountDto)
    })).json();
}

export const register = async (object) => {
    return (await fetch(`${BASE_URL}/auth/create-customer-account`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            phoneNumber: object.phoneNumber,
            password: object.password,
        })
    })).json();
};

export const registerAdmin = async (object) => {
    return (await fetch(`${BASE_URL}/auth/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            phoneNumber: object.phoneNumber,
            password: object.password,
            code: object.code
        })
    })).json();
};

export const getUserInformation = async (token) => {
    return (await fetch(`${BASE_URL}/user/me`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`},
    })).json();};

export const isTokenExpired = async (token) => {
    return (await fetch(`${BASE_URL}/user/ping`,{
        method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
    })).json();
}

export const getUserInfo = async (token) => {
    return (await fetch(`${BASE_URL}/user/me`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })).json();
};