import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { listBankReducer } from '../features/payment/list-bank-slice'
import { makeOneClickPaymentReducer } from '../features/payment/make-one-click-payment'
import { makePaymentReducer } from '../features/payment/make-payment-slice'
import { paymentMethodsReducer } from '../features/payment/payment-methods-slice'

export const store = configureStore({
  reducer: {

    // payment api
    listBank: listBankReducer,
    paymentMethods: paymentMethodsReducer,
    makePayment: makePaymentReducer,
    makeOneClickPayment: makeOneClickPaymentReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
