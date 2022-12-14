import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store';
import paymentApi from '../../user/service/APIPayment';
import { MakeOneClickPaymentRequest, MakeOneClickPaymentResponse } from '../../user/type/Payment';



export interface MakeOneClickPaymentState {
  makeOneClickPayment: undefined | MakeOneClickPaymentResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}

export interface MakeOneClickPaymentSliceRequest {
  amount: string
  cardUid: string
  userId: number
  invoiceId: number
  invoiceCode: string
}

const initialState: MakeOneClickPaymentState = {
  makeOneClickPayment: undefined,
  status: 'init',
  failureDescription: '',
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const makeOneClickPaymentAsync = createAsyncThunk(
  'makeOneClickPayment/makeOneClickPaymentAsync',
  async (data : MakeOneClickPaymentSliceRequest, { rejectWithValue }) => {
    try {
      const request: MakeOneClickPaymentRequest = {
        amount: data.amount,
        orderDescription: 'remark',
        locale: 'en',
        phone: 'phone',
        channel: 'IB',
        cardUid: data.cardUid,
        userId: data.userId,
        invoiceId: data.invoiceId,
        invoiceCode: data.invoiceCode,
        AgainLink: process.env.REACT_APP_PAYMENT_COMPLETE_REDIRECT_URL || `${window.location.origin.toString()}/confirm/`,
      }
      const response = await paymentApi.makeOneClickPayment(request)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw error
        }
        return rejectWithValue(error.response.data)
      } else {
        throw error
      }
    }
  }
)

const makeOneClickPaymentSlice = createSlice({
  name: 'makeOneClickPayment',
  initialState,
  reducers: {
    resetMakeOneClickPayment: handleResetAction,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(makeOneClickPaymentAsync.pending, (state: MakeOneClickPaymentState) => {
        return {
          makeOneClickPayment: undefined,
          status: 'loading',
          failureDescription: '',
        }
      })
      .addCase(makeOneClickPaymentAsync.fulfilled, (state: MakeOneClickPaymentState, action) => {
        return {
          makeOneClickPayment: action.payload,
          status: 'idle',
          failureDescription: '',
        }
      })
      .addCase(makeOneClickPaymentAsync.rejected, (state: MakeOneClickPaymentState, action) => {
        return {
          makeOneClickPayment: undefined,
          status: 'failed',
          failureDescription: JSON.stringify(action.payload as Object),
        }
      })
  },
})

function handleResetAction(state: MakeOneClickPaymentState) {
  state.makeOneClickPayment = undefined
  state.status = 'init'
  state.failureDescription = ''
}

export const { resetMakeOneClickPayment } = makeOneClickPaymentSlice.actions

export const selectMakeOneClickPayment = (state: RootState) =>
  state.makeOneClickPayment.makeOneClickPayment
export const selectOnePayStatus = (state: RootState) => state.makeOneClickPayment.status
export const selectOnePayFailureDescription = (state: RootState) =>
  state.makeOneClickPayment.failureDescription

export const makeOneClickPaymentReducer = makeOneClickPaymentSlice.reducer
