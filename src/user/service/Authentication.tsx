import axios from "axios"
import base_url_public from "./BaseApiPublic"

// createCart(userDetail: UserDetail, insId: string, amount: number): Promise<CreateCartResponse> {
//     const config = {
//       headers: {
//         token: userDetail.accessToken,
//       }
//     }
//     const url = '/ins/order'
//     return axiosClient.post(url, {insId, amount}, config)
//   },

export const loginApi = async (username: string, password: string) => {
    return await axios.post(`${base_url_public}/user/login`, { username, password })
}


export const registerApi = async (email: string, name: string, pass: string, phone: string, username: string) => {
    return await axios.post(`${base_url_public}/user/register`, { email, name, pass, phone, username })
}

export const forgotPass = async (email: string) => {
    return await axios.post(`${base_url_public}/user/forgotPass`, { email })
}

export const infoUser = async (accessToken: string) => {
    const config = {
        headers: {
            token: accessToken,
        }
    }
    return await axios.get(`${base_url_public}/user/info`, config)
}


export const updateProfile = async (name: string, phone: string, email: string, accessToken: string) => {
    const config = {
        headers: {
            token: accessToken,
        }
    }
    return await axios.post(`${base_url_public}/user/profile`, { name, phone, email }, config)
}



// export const resetPass = async (email: string, token) => {
//     const config = {
//         headers: {
//             token: userDetail.accessToken,
//         }
//     }
//     return await axios.post(`${base_url_public}/user/resetPass`, { email })
// }
// export const getDetailProduct = async (id: number) => {
//     return await axios.get(`${base_url}/products/${id}`, { headers })
// }