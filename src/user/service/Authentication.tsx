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
// export const getDetailProduct = async (id: number) => {
//     return await axios.get(`${base_url}/products/${id}`, { headers })
// }