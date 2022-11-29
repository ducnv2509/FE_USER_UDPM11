// import { resetCartConfirm, selectCartConfirmResponse, selectFailureDescription, selectStatus } from "features/cart/cart-confirm-slice"
import { resetMakeOneClickPayment, selectMakeOneClickPayment, selectOnePayFailureDescription, selectOnePayStatus } from "../../../features/payment/make-one-click-payment"
import { resetMakePayment, selectMakePayment, selectPaymentFailureDescription, selectPaymentStatus } from "../../../features/payment/make-payment-slice"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

export const useMakePaymentState = () => {
    const status = useAppSelector(selectPaymentStatus)
    const dispatch = useAppDispatch()
    const paymentFailureDescription = useAppSelector(selectPaymentFailureDescription)
    const makePaymentResponse = useAppSelector(selectMakePayment)
    const [paymentSubmitted, setPaymentSubmitted] = useState(false)
    const [showPaymentErrorModal, setShowErrorModal] = useState(false)

    useEffect(() => {
        if (makePaymentResponse !== undefined) {
            setPaymentSubmitted(true)
            window.location.replace(makePaymentResponse.paymentUrl);
        }
    }, [makePaymentResponse])

    useEffect(() => {
        if (paymentFailureDescription !== "") {
            setShowErrorModal(true)
        }
    }, [paymentFailureDescription])

    // function closePaymentDetailModal() {
    //   dispatch(resetMakePayment())
    //   setShowDetailModal(false)
    // }

    function closePaymentErrorModal() {
        dispatch(resetMakePayment())
        setShowErrorModal(false)
    }

    return {
        paymentSubmitted,
        paymentPosting: status === 'loading',
        showPaymentErrorModal,
        closePaymentErrorModal,
        paymentFailureDescription,
    }
}


export const useMakeOneClickPaymentState = () => {
    const status = useAppSelector(selectOnePayStatus)
    const dispatch = useAppDispatch()
    const onePayFailureDescription = useAppSelector(selectOnePayFailureDescription)
    const makeOneClickPaymentResponse = useAppSelector(selectMakeOneClickPayment)
    const [onePaySubmitted, setOnePaySubmitted] = useState(false)
    const [showOnePayErrorModal, setShowErrorModal] = useState(false)

    useEffect(() => {
        if (makeOneClickPaymentResponse !== undefined) {
            setOnePaySubmitted(true)
            window.location.replace(makeOneClickPaymentResponse.paymentUrl);
        }
    }, [makeOneClickPaymentResponse])

    useEffect(() => {
        if (onePayFailureDescription !== "") {
            setShowErrorModal(true)
        }
    }, [onePayFailureDescription])

    // function closeOnePayDetailModal() {
    //   dispatch(resetMakeOneClickPayment())
    //   setShowDetailModal(false)
    // }

    function closeOnePayErrorModal() {
        dispatch(resetMakeOneClickPayment())
        setShowErrorModal(false)
    }

    return {
        onePaySubmitted,
        oneClickPosting: status === 'loading',
        showOnePayErrorModal,
        closeOnePayErrorModal,
        onePayFailureDescription,
    }
}