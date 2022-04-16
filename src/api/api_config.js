import {TOKEN} from "../const/key_storage";

export const BASE_URL = 'https://e-banking-2022-backend.herokuapp.com/api/v1'


export const login = async (accountDto) => await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(accountDto)
})


export const registerUser = async (object) => await fetch(`${BASE_URL}/auth/create-customer-account`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`
    },
    body: JSON.stringify({
        phoneNumber: object.phoneNumber,
        password: object.password,
    })
})


export const registerAdmin = async (object) => await fetch(`${BASE_URL}/auth/create`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        phoneNumber: object.phoneNumber,
        password: object.password,
        code: object.code
    })
})

export const isTokenExpired = async () => {
    return await fetch(`${BASE_URL}/user/ping`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })
}

export const getUserInfo = async () => await fetch(`${BASE_URL}/user/me`, {
    method: "GET",
    headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
})


export const updateUserInfo = async (object) => await fetch(`${BASE_URL}/user/update/${object.id}`, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
    body: JSON.stringify({
        firstName: object.firstName,
        lastName: object.lastName,
        email: object.email,
        address: object.address,
        citizenIdentification: object.citizenIdentification
    })
})

export const getPageableUser = async (object) =>
    await fetch(`${BASE_URL}/user?page=${object.page}&size=${object.size}&sort=${object.sortBy}`, {
            method: "GET",
            headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
        }
    )

export const deleteUser = async (id) =>
    await fetch(`${BASE_URL}/user/${id}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })

export const setBalance = async (object) =>
    await fetch(`${BASE_URL}/user/${object.id}/balance`, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`
        },
        body: object.data,
    })

export const changePassword = async (object) =>
    await fetch(`${BASE_URL}/user/password/change`, {
        method: "PATCH",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
        body: object.data,
    })

export const changeAvatar = async (object) =>
    await fetch(`${BASE_URL}/user/avatar`, {
        method: "PATCH",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
        body: object.data,
    })

export const depositMoney = async (object) =>
    await fetch(`${BASE_URL}/transaction/deposit`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
        body: object.formData,
    })

export const withdrawMoney = async (object) =>
    await fetch(`${BASE_URL}/transaction/withdraw`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
        body: object.formData,
    })

export const transferMoney = async (object) =>
    await fetch(`${BASE_URL}/transaction/transfer`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem(TOKEN)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "amount": object.amount,
                "toAccount": object.toAccount
            })
        }
    )

export const createInterest = async (object) =>
    await fetch(`${BASE_URL}/interest/create`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem(TOKEN)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "rate": object.rate,
            "instantRate": object.instantRate,
            "duration": object.duration,
            "type": object.type,
        })
    })


export const getPageableInterest = async (object) =>
    await fetch(`${BASE_URL}/interest?page=${object.page}&size=${object.size}&sort=${object.sort}`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
    })


export const deleteInterestRate = async (id) =>
    await fetch(`${BASE_URL}/interest/${id}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })

export const updateInterestRate = async (object) => await fetch(`${BASE_URL}/interest/${object.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
    body: JSON.stringify({
        rate: object.rate,
        instantRate: object.instantRate,
        duration: object.duration,
        type: object.type,
    })
})
