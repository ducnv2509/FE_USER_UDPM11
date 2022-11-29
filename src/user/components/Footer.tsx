import React from "react";

function Footer() {
    return (
        <div className="footer-container">
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
                            <div className="footer-widget">
                                <h4 className="mb-4">E-Shop</h4>
                                <p className="lead">Ai có thể ngoại trừ những nỗi đau này một cách đúng đắn, họ đang thiếu.</p>

                                <div className="">
                                    <p className="mb-0"><strong>Địa điểm : </strong>Bắc Punjab, ẤN ĐỘ</p>
                                    <p><strong>Email hỗ trợ: </strong> support@email.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Loại</h4>
                                <ul className="pl-0 list-unstyled mb-0">
                                    <li><a href="!#">Thời trang nam</a></li>
                                    <li><a href="!#">Thời trang của phụ nữ</a></li>
                                    <li><a href="!#">Thời trang trẻ em</a></li>
                                    <li><a href="!#">phụ kiện</a></li>
                                    <li><a href="!#">Bộ sưu tập giày</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Liên kết hữu ích</h4>
                                <ul className="pl-0 list-unstyled mb-0">
                                    <li><a href="!#">Tin tức &amp; Lời khuyên</a></li>
                                    <li><a href="!#">Về chúng tôi</a></li>
                                    <li><a href="!#">Ủng hộ</a></li>
                                    <li><a href="!#">Cửa hàng của chúng tôi</a></li>
                                    <li><a href="!#">Liên hệ chúng tôi</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 col-sm-6 text-center text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Giờ mở cửa</h4>
                                <ul className="pl-0 list-unstyled mb-5">
                                    <li className="d-lg-flex justify-content-between">Thứ hai thứ Sáu <span>8.00-20.00</span></li>
                                    <li className="d-lg-flex justify-content-between">Thứ bảy <span>10.00-20.00</span></li>
                                    <li className="d-lg-flex justify-content-between">Chủ nhật <span>12-20.00</span></li>
                                </ul>

                                <h5>Gọi ngay bây giờ : +(000) 000-000</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            <div className="footer-btm py-4 ">
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-6">
                            <p className="copyright mb-0 ">@ Bản quyền được bảo lưu cho therichpost &amp; made by <a href="https://therichpost.com/">therichpost</a></p>
                        </div>
                        <div className="col-lg-6">
                            <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                                <li className="list-inline-item"><a href="!#">Chính sách bảo mật</a></li>
                                <li className="list-inline-item"><a href="!#">Điều kiện &amp; Các điều kiện</a></li>
                                <li className="list-inline-item"><a href="!#">Chính sách Cookie</a></li>
                                <li className="list-inline-item"><a href="!#">Điều khoản bán hàng</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;