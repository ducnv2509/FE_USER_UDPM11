


import { selectListBank } from '../../../features/payment/list-bank-slice'
import { GetListBankResponse, GetPaymentMethodResponse, PaymentMethodsType, PaymentTokensType } from '../../type/Payment'
import React, { useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import Spinner from '../common'
import { PaymentMethodsFormData } from './PageCheckout'
import { useAppSelector } from '../../../app/hooks'
import paymentApi from '../../service/APIPayment'

interface PaymentMethodsProps {
  register: UseFormRegister<PaymentMethodsFormData>
  watchPaymentOption: string
  domesticBank: string
  setDomesticbank: React.Dispatch<React.SetStateAction<string>>
}

const PaymentMethods = (props: PaymentMethodsProps) => {
  // const paymentMethods = useAppSelector(selectPaymentMethods)
  // const paymentMethodsStatus = useAppSelector(selectStatus)
  // const listBank = useAppSelector(selectListBank)

  const [paymentMethods, setPaymentMethod] = useState<undefined | GetPaymentMethodResponse>(undefined)
  const [listBank, setListBank] = useState<GetListBankResponse | undefined>(undefined)

  // const [paymentMethods, setPaymentMethod] = useState({} as GetPaymentMethodResponse)
  // const [listBank, setListBank] = useState([] as GetListBankResponse)
  const [value, setValue] = useState('');


  // const getPaymentMethod = async () => {
  //   const paymentMethodRes = await paymentApi.getPaymentMethod('11')
  //   setPaymentMethod(paymentMethodRes)
  // }
  // const getListBank = async () => {
  //   const listBankRes = await paymentApi.getListBank()
  //   console.log('thid id ' + listBankRes);

  //   setListBank(listBankRes)
  // }

  // useEffect(() => {
  //   getPaymentMethod()
  //   getListBank()
  //   console.log(paymentMethods);
  // }, [])

  useEffect(() => {
    const getPaymentMethod = async () => {
      const paymentMethodRes = await paymentApi.getPaymentMethod('11')
      setPaymentMethod(paymentMethodRes)
    }
    const getListBank = async () => {
      const listBankRes = await paymentApi.getListBank()
      console.log('thid id ' + listBankRes);

      setListBank(listBankRes)
    }
    getPaymentMethod()
    getListBank()
  }, [])
  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6">
        <p className="font-['Muli-ExtraBold'] text-gray-900 mb-6">
          Chọn hình thức thanh toán
        </p>
        {paymentMethods === undefined && <Spinner></Spinner>}
        <div className="grid grid-cols-6 gap-6 gap-y-4 border-y py-6 mb-6 border-gray-500 empty:hidden">
          {paymentMethods !== undefined && paymentMethods.paymentTokens !== undefined &&
            paymentMethods.paymentTokens.map((item) => (
              <PaymentToken
                key={item.cardUid}
                register={props.register}
                {...item}
              ></PaymentToken>
            ))}
        </div>

        <div className="grid grid-cols-6 gap-6 gap-y-4">
          {paymentMethods !== undefined && paymentMethods.paymentMethods !== undefined &&
            paymentMethods.paymentMethods
              .slice(0)
              .reverse()
              .map((item) => (
                <PaymentOption
                  key={item.value}
                  register={props.register}
                  {...item}
                ></PaymentOption>
              ))}
        </div>
        {props.watchPaymentOption === 'DOMESTIC' && listBank !== undefined && (
          <div className="mt-3 rounded p-4 flex flex-row flex-wrap gap-2 bg-blue-100">
            {listBank.map(
              (item) =>
                item.iconFull && (
                  <button
                    type="button"
                    onClick={() => props.setDomesticbank(item.code)}
                    className={`rounded-lg border-2 hover:border-sky-700 ${props.domesticBank === item.code ? 'border-sky-700' : ''
                      }`}
                  >
                    <img className="h-16" src={`${item.iconFull}`} alt="" />
                  </button>
                )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface PaymentTokenProps extends PaymentTokensType {
  register: UseFormRegister<PaymentMethodsFormData>
}

const PaymentToken = (props: PaymentTokenProps) => {
  const listBanks = useAppSelector(selectListBank)

  let image = <></>

  if (listBanks !== undefined) {
    image = (
      <img
        className="w-12 h-12"
        src={`${listBanks.find((item) => item.name === props.bankName)?.icon}`}
        alt={`${props.bankName} bank icon`}
      />
    )
  }

  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={props.cardUid}
        className="flex items-center hover:bg-gray-50 py-5 px-2 rounded-lg cursor-pointer"
      >
        <div className="flex items-center h-5">
          <input
            id={props.cardUid}
            // name="insurance-option"
            type="radio"
            {...props.register('paymentOption', { required: true })}
            value={props.cardUid}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm flex flex-row items-center">
          {image}
          <div>
            Thẻ {props.cardType}
            <span className="ml-3 text-md font-['Muli-ExtraBold'] text-gray-700">
              {props.cardNum}
            </span>
          </div>
        </div>
      </label>
    </div>
  )
}

interface PaymentOptionProps extends PaymentMethodsType {
  register: UseFormRegister<PaymentMethodsFormData>
}

const PaymentOption = (props: PaymentOptionProps) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={props.value}
        className="flex items-center hover:bg-gray-50 py-5 px-2 rounded-lg cursor-pointer"
      >
        <div className="flex items-center h-5">
          <input
            id={props.value}
            // name="insurance-option"
            type="radio"
            {...props.register('paymentOption', { required: true })}
            value={props.value}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm flex flex-row items-center">
          <img
            className="h-5"
            src={`${props.icon[0]}`}
            alt={`${props.name} icon`}
          />
          <span className="ml-3">{props.name}</span>
        </div>
      </label>
    </div>
  )
}

export default PaymentMethods
