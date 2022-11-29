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

export const loginApi = async (username: any, password: any) => {
    return await axios.post(`${base_url_public}/user/login`, { username, password })
}

// export const getDetailProduct = async (id: number) => {
//     return await axios.get(`${base_url}/products/${id}`, { headers })
// }