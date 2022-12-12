import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../service/Authentication";


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
        // loginApi
        //   .add({ username: 'hoangnd25@fpt.com.vn', password: 'ArianaGrande2' })
        //   .then((res) => {
        //     dispatch(logIn({ username: 'hoang', password: 'hoang123' }))
        //   })
        //   .catch((err) => console.log(err))
        try {
            const response = await registerApi(data.email, data.fullname, data.password, data.phone, data.username);
            console.log('response.data.id ', response.data)
            navigate('/login')
        } catch (error: any) {
            setRegisterError(error);
            console.log('this bug', error)
        }

    }

    return (
        <div className="signUp-container">
            <div className="account section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="login-form border p-5">
                                <div className="text-center heading">
                                    <h2 className="mb-2">Sign Up</h2>
                                    <p className="lead">Already have an account? <a href="/login"> Login now</a></p>
                                </div>

                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Enter Email Address</label>
                                        <input type="text" className="form-control" placeholder="Enter Email Address"
                                            {...register('email')} required
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Enter fullName</label>
                                        <input type="text" className="form-control" placeholder="Enter fullname"
                                            {...register('fullname')} required

                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Enter phone</label>
                                        <input type="text" className="form-control" placeholder="Enter phone"
                                            {...register('phone')} required

                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Enter username</label>
                                        <input type="text" className="form-control" placeholder="Enter Password"
                                            {...register('username')} required

                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Enter Password</label>
                                        <input type="password" className="form-control" placeholder="Enter Password"
                                            {...register('password')} required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="#">Confirm Password</label>
                                        <input type="password" className="form-control" placeholder="Confirm Password" />
                                    </div>
                                    <input type="submit" className="btn btn-main mt-3 btn-block" value="Register" />
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