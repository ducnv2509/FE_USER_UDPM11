import axios from "axios";
import React from "react";
import base_url_public from "./BaseApiPublic";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};



export const getAllProduct = async () => {
    return await axios.get(`${base_url_public}/product/`, { headers })
}

export const getDetailProduct = async (id: number) => {
    return await axios.get(`${base_url_public}/product/${id}`, { headers })
}

export const getSelling = async () => {
    return await axios.get(`${base_url_public}/product/selling`, { headers })
}

export const getPopular = async () => {
    return await axios.get(`${base_url_public}/product/popular`, { headers })
}

export const showAllCategory = async () => {
    return await axios.get(`${base_url_public}/product/showCate`)
}

export const searchProduct = async (name: string) => {
    return await axios.get(`${base_url_public}/product/search?name=${name}`)
}

export const filterByCategory = async (id: number[]) => {
    return await axios.post(`${base_url_public}/product/cate`, { id })
}



// export const getProductByOption = async (option1: string, option2: string, option3: string, id: number) => {
//     return await axios.get(`${base_url}/product/getProductVarient/${id}?op1=${option1}&op2=${option2}&op3=${option3}`)
// }