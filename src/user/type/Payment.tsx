export type GetListBankResponse = BankInfo[]

export interface BankInfo {
  name: string
  code: string
  icon: string
  iconFull: string
}

export interface IAmount {
  id: number
  account_name: string
  total: string
}

export interface GetPaymentMethodResponse {
  paymentTokens: PaymentTokensType[]
  paymentMethods: PaymentMethodsType[]
}

export interface PaymentTokensType {
  cardNum: string
  cardUid: string
  cardType: string
  bankName: string
}

export interface PaymentMethodsType {
  name: string
  value: string
  icon: string[]
}

export interface MakePaymentRequest {
  amount: string
  orderDescription: string
  locale: string
  phone: string
  channel: string
  bankCode?: string
  paymentMethod: string
  userId: number
  invoiceId: number
  invoiceCode: string
  saveCard: number
  AgainLink: string
}

export interface MakeOneClickPaymentRequest {
  amount: string
  orderDescription: string
  locale: string
  phone: string
  channel: string
  cardUid: string
  userId: number
  invoiceId: number
  invoiceCode: string
  AgainLink: string
}

export interface MakePaymentResponse {
  paymentUrl: string
  traceId: string
}

export interface MakeOneClickPaymentResponse {
  paymentUrl: string
  traceId: string
}