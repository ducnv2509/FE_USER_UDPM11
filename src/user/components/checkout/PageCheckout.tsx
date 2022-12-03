import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthStore } from "../../../hooks/zustand/auth";
import { useMakeOneClickPaymentState, useMakePaymentState } from "./hooks";
import { makeOneClickPaymentAsync } from "../../../features/payment/make-one-click-payment";
import { makePaymentAsync } from "../../../features/payment/make-payment-slice";
import { Button, Section } from "../common";
import PaymentMethods from "./payment-methods";
import { getAmount } from "../../service/CheckoutService";
import { IAmount } from "../../type/Payment";
// import { getListBankAsync } from "../../features/payment/list-bank-slice";
// import { getPaymentMethodsAsync } from "../../features/payment/payment-methods-slice";

export interface PaymentMethodsFormData {
  paymentOption: string
}


function PageCheckout() {

  const[amount, setAmout] = useState({} as IAmount)
  const accessToken = useAuthStore((e) => e.accessToken)
  useEffect(() => {
    getAmount(accessToken).then((res) => {
      setAmout(res.data)
    })
  }, [])

  let paymentAmount = amount.total // ve sau thay cai nay nhe pe Duc
  let paymentID = amount.id// ve sau thay cai nay nhe pe Duc

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //     dispatch(getListBankAsync())
  //     dispatch(getPaymentMethodsAsync())
  // }, [])



  // console.log('this is bug1 ' + paymentMethods)
  // console.log('this is bug2 ' + paymentMethodsStatus)
  // console.log('this is bug3 ' + listBank)
  const userId = useAuthStore((state) => state.id)

  const {
    paymentSubmitted,
    paymentPosting,
  } = useMakePaymentState()

  const {
    onePaySubmitted,
    oneClickPosting,
  } = useMakeOneClickPaymentState()

  const {
    register,
    watch,
    handleSubmit,
  } = useForm<PaymentMethodsFormData>()

  const [domesticBank, setDomesticbank] = useState('')
  const watchPaymentOption = watch('paymentOption', '')
  const handleFormSubmit: SubmitHandler<PaymentMethodsFormData> = async (
    formSubmit
  ) => {
    if (formSubmit.paymentOption.startsWith('INS-')) {
      dispatch(
        makeOneClickPaymentAsync({
          amount: paymentAmount.toString(),
          cardUid: formSubmit.paymentOption,
          userId: Number(userId),
          invoiceId: paymentID,
          invoiceCode: 'INVOICE_CODE',
        })
      )
    } else {
      if (formSubmit.paymentOption === 'DOMESTIC') {
        dispatch(
          makePaymentAsync({
            amount: paymentAmount.toString(),
            bankCode: domesticBank,
            paymentMethod: formSubmit.paymentOption,
            userId: Number(userId),
            invoiceId: paymentID,
            invoiceCode: 'INVOICE_CODE',
          })
        )
      } else {
        dispatch(
          makePaymentAsync({
            amount: paymentAmount.toString(),
            paymentMethod: formSubmit.paymentOption,
            userId: Number(userId),
            invoiceId: paymentID,
            invoiceCode: 'INVOICE_CODE',
          })
        )
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Section className="pt-0 mb-4">
          <PaymentMethods
            domesticBank={domesticBank}
            setDomesticbank={setDomesticbank}
            watchPaymentOption={watchPaymentOption}
            register={register}
          ></PaymentMethods>
        </Section>

        <Section>
          <div className="flex justify-between items-center sm:pt-7 mb-12">
            <Button
              className={`w-fit ${watchPaymentOption === 'DOMESTIC' && domesticBank === ''
                ? '!cursor-not-allowed'
                : ''
                }`}
              posting={paymentPosting || oneClickPosting || onePaySubmitted || paymentSubmitted}
              disabled={paymentPosting || oneClickPosting || (watchPaymentOption === 'DOMESTIC' && domesticBank === '') || onePaySubmitted || paymentSubmitted}
            >
              Đặt hàng
            </Button>
          </div>
        </Section>
      </form>
    </>
  )
}



export default PageCheckout;