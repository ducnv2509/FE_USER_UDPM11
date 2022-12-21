import axios from "axios";
import base_url_public from "./BaseApiPublic";

export const getCartItems = async (id_cart_item: string[], accessToken: string) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    console.log('in api getcart')
    return (
        await axios.post(`${base_url_public}/cart/getCartItem`, { id_cart_item }, config)
    );
};



export const getInfoTP = async () => {
    return (
        await axios.post(`${base_url_public}/fetch/getTP`)
    );
};


export const getInfoHuyen = async (id_TP: number) => {
    return (
        await axios.post(`${base_url_public}/fetch/getH`, { id_TP })
    );
};

export const getInfoXa = async (id_H: number) => {
    return (
        await axios.post(`${base_url_public}/fetch/getX`, { id_H })
    );
};

export const moneyFee = async (money: number, to_district: number, to_ward: string, weight_main: number) => {
    return (
        await axios.post(`${base_url_public}/fetch/moneyFee`, { money, to_district, to_ward, weight_main })
    );
};

export const addOrderPush = (address: string, note: string, id_cart_items: number[], money_fee: number, accessToken: string, type: number) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    const obj = { address, note, id_cart_items, money_fee, type }
    console.log('obj ne ', obj)
    const body = JSON.stringify(obj);
    console.log(`${base_url_public}/cart/addOrderPurchase`)
    return (
        fetch(`${base_url_public}/cart/addOrderPurchase`, {
            method: 'POST',
            body,
            headers: {
                token: accessToken,
                'Content-Type': 'application/json',
            }
        })
    );
};


export const getAmount = async (accessToken: string) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/cart/getAmount`, config)
    );
};