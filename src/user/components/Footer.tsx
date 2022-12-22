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
                                <div className="">
                                    <p className="mb-0"><strong>Địa điểm : </strong>65 Đường Mạc Thị Bưởi</p>
                                    <p><strong>Email hỗ trợ: </strong>vietanhnh123@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Loại</h4>
                                <ul className="pl-0 list-unstyled mb-0">
                                    <li><p>Thời trang nam</p></li>
                                    <li><p>Thời trang của phụ nữ</p></li>
                                    <li><p>Phụ kiện</p></li>
                                    <li><p>Bộ sưu tập giày</p></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Liên kết hữu ích</h4>
                                <ul className="pl-0 list-unstyled mb-0">
                                    <li><p>Tin tức &amp; Lời khuyên</p></li>
                                    <li><p>Về chúng tôi</p></li>
                                    <li><p>Ủng hộ</p></li>
                                    <li><p>Cửa hàng của chúng tôi</p></li>
                                    <li><p>Liên hệ chúng tôi</p></li>
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

                                <h5>Gọi ngay bây giờ : 033242123</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            <div className="footer-btm py-4 ">
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-6">
                            <p className="copyright mb-0 ">@ Bản quyền được bảo lưu cho therichpost &amp; made by <p>therichpost</p></p>
                        </div>
                        <div className="col-lg-6">
                            <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                                <li className="list-inline-item"><p>Chính sách bảo mật</p></li>
                                <li className="list-inline-item"><p>Điều kiện &amp; Các điều kiện</p></li>
                                <li className="list-inline-item"><p>Chính sách Cookie</p></li>
                                <li className="list-inline-item"><p>Điều khoản bán hàng</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;