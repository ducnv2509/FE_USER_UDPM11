import axios from "axios";
import base_url_public from "./BaseApiPublic";


export const getHistoryOrder = async (status_id: number, accessToken: string) => {

    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/history/by/${status_id}`, config)
    );
};
export const getOrderItemHistory = async (id_order: number, accessToken: string) => {

    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/history/${id_order}`, config)
    );
};


export const getHistoryOrderReturn = async (accessToken: string) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/order/return/getAll`, config)
    );
};

export const getOrderReturnItemHistory = async (id_orderReturn: number, accessToken: string) => {

    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/order/return/detail/${id_orderReturn}`, config)
    );
};

export const updateStatus = async (status_id: number, id_order: number, accessToken: string) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/history/update/${id_order}?status_id=${status_id}`, config)
    );
};
export const updateQuantityCart = async (quantity: number, id_cart_item: number, accessToken: string) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.post(`${base_url_public}/cart/updateQuantityCart/`, { quantity, id_cart_item }, config)
    );
};

export const deleteCart = async (id_cart_item: number[], accessToken: string) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.post(`${base_url_public}/cart/deleteCart/`, { id_cart_item }, config)
    );
};

export const returnOrder = async (note:string,id_order_purchase:number,total_price_return:number,total_quantity_return:number,id_purchase_item:number[], accessToken: string) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.post(`${base_url_public}/order/return`,
            { note, id_order_purchase, total_price_return, total_quantity_return, id_purchase_item }
            , config)
    );
};