import React from "react"

function ForgotPassword() {
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

                                <form action="#">
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Nhập địa chỉ email</label>
                                        <input type="text" className="form-control" placeholder="Nhập địa chỉ email" />
                                    </div>
                                    <a href="#" className="btn btn-main mt-3 btn-block">Yêu cầu OTP</a>
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