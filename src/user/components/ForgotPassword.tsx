import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { forgotPass } from "../service/Authentication"

export type ForgotPass = {
    email: string
}

function ForgotPassword() {
    const {
        register,
        handleSubmit,
    } = useForm<ForgotPass>()

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    let [registerError, setRegisterError] = useState()
    let navigate = useNavigate()

    const handleFormSubmit: SubmitHandler<ForgotPass> = async (data) => {
        // loginApi
        //   .add({ username: 'hoangnd25@fpt.com.vn', password: 'ArianaGrande2' })
        //   .then((res) => {
        //     dispatch(logIn({ username: 'hoang', password: 'hoang123' }))
        //   })
        //   .catch((err) => console.log(err))
        try {
            await forgotPass(data.email).then((res) => {
                console.log('response.data.id ', res.data)
                Toast.fire({
                    icon: 'success',
                    title: res.data.message
                })
            }, (err) => {
                console.log(err)
            });
        } catch (error: any) {
            setRegisterError(error);
            console.log('this bug', error)
        }

    }
    return (
        <div className="forgot-password-container">
            <div className="account section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="login-form border p-5">
                                <div className="text-center heading">
                                    <h3 className="mb-2 h2">Khôi phục mật khẩu</h3>
                                    <p className="lead">Vui lòng nhập địa chỉ email cho tài khoản của bạn. Một mã xác minh sẽ được gửi đến bạn. Khi bạn đã nhận được mã xác minh, bạn sẽ có thể chọn mật khẩu mới cho tài khoản của mình.</p>
                                </div>

                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Nhập địa chỉ email</label>
                                        <input type="email" className="form-control" placeholder="Nhập địa chỉ email"
                                            {...register('email')}
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-main mt-3 btn-block" value="Send" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword