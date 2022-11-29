import { GetListBankResponse, GetPaymentMethodResponse, MakeOneClickPaymentRequest, MakeOneClickPaymentResponse, MakePaymentRequest, MakePaymentResponse } from '../type/Payment'
import axios from 'axios'
import base_api_payment from '../service/PaymentAPI';



const paymentApi = {
    getListBank(): Promise<GetListBankResponse> {
        const url = '/banks'
        return axios.get(`${base_api_payment}${url}`).then((data)=> data.data)
    },

    getPaymentMethod(userId: string): Promise<GetPaymentMethodResponse> {
        console.log('in api getPaymentMethod');
        // const url = `/payment-methods/${userId}/`
        return axios.get(`${base_api_payment}/payment-methods/${userId}`).then((data)=> data.data)
    },

    makePayment(
        data: MakePaymentRequest
    ): Promise<MakePaymentResponse> {
        return axios.post(`${base_api_payment}/payment/`, data).then((data)=>
        data.data)
    },

    makeOneClickPayment(
        data: MakeOneClickPaymentRequest
    ): Promise<MakeOneClickPaymentResponse> {
        return axios.post(`${base_api_payment}/one-click-payment`, data).then((data)=> data.data)
    },

}

export default paymentApi