import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../service/Authentication";
import { Toast } from "./OrderHistory";


export type RegisterFormData = {
    email: string
    username: string
    password: string
    fullname: string
    phone: string
}

function SignUp() {
    const {
        register,
        handleSubmit,
    } = useForm<RegisterFormData>()

    let [registerError, setRegisterError] = useState()
    let navigate = useNavigate()

    const handleFormSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        await registerApi(data.email, data.fullname, data.password, data.phone, data.username).then(res => {
            navigate('/login')
            Toast.fire({
                icon: 'success',
                title: `Bạn đã đăng ký tài khoản thành công !`
            })
        }).catch(err => {
            console.log(err);
            if (err.response.data.error.dataInvaid.description != undefined) {
                Toast.fire({
                    icon: 'error',
                    title: err.response.data.error.dataInvaid.description
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: err.response.data.description
                })
            }

        });


    }

    
    return (
        <div className="signUp-container">
            <div className="account section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="login-form border p-5">
                                <div className="text-center heading">
                                    <h2 className="mb-2">Đăng ký</h2>
                                    <p className="lead">Bạn đã có tài khoản ? <a href="/login"> Login now</a></p>
                                </div>

                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Nhập Email</label>
                                        <input type="text" className="form-control" placeholder="Email..."
                                            {...register('email')} required
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Nhập Tên</label>
                                        <input type="text" className="form-control" placeholder="Fullname..."
                                            {...register('fullname')} required

                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Nhập số điện thoại</label>
                                        <input type="text" className="form-control" placeholder="SĐT..."
                                            {...register('phone')} required
                                            pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                                            title="SĐT không hợp lệ!"
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Nhập username</label>
                                        <input type="text" className="form-control" placeholder="Username..."
                                            {...register('username')} required

                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Nhập Password</label>
                                        <input
                                            type="password" className="form-control"
                                            placeholder="Password..."
                                            {...register('password')}   
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="#">Nhập lại Password</label>
                                        <input type="password"
                                            className="form-control" placeholder="Confirm Password..." />

                                    </div>
                                    <input
                                        type="submit" className="btn btn-main mt-3 btn-block" value="Register" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp;