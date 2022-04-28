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

export const userGetInfo = async () => await fetch(`${BASE_URL}/user/me`, {
    method: "GET",
    headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
})


export const userUpdateUserInfo = async (object) => await fetch(`${BASE_URL}/user/update/${object.id}`, {
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

export const adminGetPageableUser = async (object) =>
    await fetch(`${BASE_URL}/user?page=${object.page}&size=${object.size}&sort=${object.sortBy}`, {
            method: "GET",
            headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
        }
    )

export const adminDeleteUser = async (id) =>
    await fetch(`${BASE_URL}/user/${id}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })

export const adminSetBalance = async (object) =>
    await fetch(`${BASE_URL}/user/${object.id}/balance`, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`
        },
        body: object.data,
    })

export const userChangePassword = async (object) =>
    await fetch(`${BASE_URL}/user/password/change`, {
        method: "PATCH",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
        body: object.data,
    })

export const userChangeAvatar = async (object) =>
    await fetch(`${BASE_URL}/user/avatar`, {
        method: "PATCH",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
        body: object.data,
    })

export const transactionDeposit = async (object) =>
    await fetch(`${BASE_URL}/transaction/deposit`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
        body: object.formData,
    })

export const transactionWithdraw = async (object) =>
    await fetch(`${BASE_URL}/transaction/withdraw`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
        body: object.formData,
    })

export const transactionTransfer = async (object) =>
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


export const interestGetPageable = async (object) =>
    await fetch(`${BASE_URL}/interest?page=${object.page}&size=${object.size}&sort=${object.sort}`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
    })


export const interestDeleteRate = async (id) =>
    await fetch(`${BASE_URL}/interest/${id}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })

export const interestUpdateRate = async (object) => await fetch(`${BASE_URL}/interest/${object.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
    body: JSON.stringify({
        rate: object.rate,
        instantRate: object.instantRate,
        duration: object.duration,
        type: object.type,
    })
})

export const transactionCreateLoan = async (object) => await fetch(`${BASE_URL}/transaction/loan`, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
    body: JSON.stringify({
        amount: object.amount,
        interestId: object.interestId,
    })
})

export const transactionCreateSaving = async (object) => await fetch(`${BASE_URL}/transaction/saving`, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`},
    body: JSON.stringify({
        amount: object.amount,
        hasMaturity: object.hasMaturity,
        maturityWithProfit: object.maturityWithProfit,
        interestId: object.interestId
    })
})

export const adminGetTransactionById = async (object) => {
    let URL = `/transaction/histories/${object.id}?page=${object.page}&size=${object.size}&sort=${object.sortBy}&type=${object.type}`
    if (!object.type) URL = `/transaction/histories/${object.id}?page=${object.page}&size=${object.size}&sort=${object.sortBy}`
    return await fetch(`${BASE_URL}${URL}`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })
}

export const userGetMyTransactionLogs = async (object) => {
    let URL = `/transaction/histories/me?page=${object.page}&size=${object.size}&sort=${object.sortBy}&type=${object.type}`
    if (!object.type) URL = `/transaction/histories/me?page=${object.page}&size=${object.size}&sort=${object.sortBy}`
    return await fetch(`${BASE_URL}${URL}`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })
}


export const userFindDestinationUser = async (object) => await fetch(`${BASE_URL}/user/findUser?type=${object.type}&value=${object.value}`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
    })

export const userWithdrawSaving =  async (object) => await fetch(`${BASE_URL}/transaction/saving/withdraw/${object.id}`, {
    method: "GET",
    headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
})

export const userReturnLoan = async (object) => await fetch(`${BASE_URL}/transaction/loan/return/${object.id}`, {
    method: "GET",
    headers: {"Authorization": `Bearer ${window.localStorage.getItem(TOKEN)}`}
})