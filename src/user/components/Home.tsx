import React from "react";

function Home() {
    return (
        <div className="home-container">
            <div className="main-slider slider slick-initialized slick-slider">
                <div className="slider-item" style={{ backgroundImage: "url('assets/images/slideshow1-2.jpg')", backgroundPosition: "50%", backgroundRepeat: "no-repeat" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12 offset-lg-6 offset-md-6">
                                <div className="slider-caption">
                                    <span className="lead">Trang phục hợp thời trang</span>
                                    <h1 className="mt-2 mb-5"><span className="text-color">Winter </span>Collection</h1>
                                    <a href="!#" className="btn btn-main">Mua ngay</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="category section pt-3 pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="cat-item mb-4 mb-lg-0">
                                <img src="assets/images/cat-1.jpg" alt="" className="img-fluid" />
                                <div className="item-info">
                                    <p className="mb-0">Đồng hồ da thời trang</p>
                                    <h4 className="mb-4">up to <strong>50% </strong>off</h4>
                                    <a href="!#" className="read-more">Mua ngay</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="cat-item mb-4 mb-lg-0">
                                <img src="assets/images/cat-2.jpg" alt="" className="img-fluid" />
                                <div className="item-info">
                                    <p className="mb-0">Túi xách tay nữ</p>
                                    <h4 className="mb-4">up to <strong>40% </strong>off</h4>
                                    <a href="!#" className="read-more">Mua ngay</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="cat-item">
                                <img src="assets/images/cat-3.jpg" alt="" className="img-fluid" />
                                <div className="item-info">
                                    <p className="mb-0">Giày hợp thời trang</p>
                                    <h4 className="mb-4">up to <strong>50% </strong>off</h4>
                                    <a href="!#" className="read-more">Mua ngay</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section products-main">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="title text-center">
                                <h2>Điểm đến mới</h2>
                                <p>Bán hàng trực tuyến tốt nhất để mua sắm vào cuối tuần này</p>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5" >
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/444.jpg" alt="product-img" /></a>
                                </div>

                                <span className="onsale">Sale</span>
                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="!#">Hoa Kirby</a></h2>
                                    <span className="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/444.jpg" alt="product-img" /></a>
                                </div>

                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="!#">Áo len đan hở</a></h2>
                                    <span className="price">
                                        $29.10
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5" >
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/222.jpg" alt="product-img" /></a>
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/322.jpg" alt="product-img" /></a>
                                </div>

                                <span className="onsale">Sale</span>
                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="!#">Hợp thời trang chính thức</a></h2>
                                    <span className="price">
                                        $350.00 – $355.00
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/111.jpg" alt="product-img" /></a>
                                </div>

                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="!#">Đuôi ngắn</a></h2>
                                    <span className="price">
                                        $249
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="!#"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/444.jpg" alt="product-img" /></a>
                                    <a href="!#"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                                </div>

                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="!#">Đầm tay</a></h2>
                                    <span className="price">
                                        $59.10
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5" >
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="!#"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                                    <a href="!#"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                                </div>

                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="!#">Ăn mặc thời trang</a></h2>
                                    <span className="price">
                                        $99.00
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5 " >
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="!#"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                                    <a href="!#"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/444.jpg" alt="product-img" /></a>
                                </div>

                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="!#">Bộ body</a></h2>
                                    <span className="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5 " >
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="!#"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/222.jpg" alt="product-img" /></a>
                                    <a href="!#"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/322.jpg" alt="product-img" /></a>
                                </div>

                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="!#">Áo sơ mi vải lanh</a></h2>
                                    <span className="price">
                                        <del>60<pre wp-pre-tag-3=""></pre></del>
                                        $50.10
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ads section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 offset-lg-6">
                            <div className="ads-content">
                                <span className="h5 deal">Ưu đãi trong ngày Giảm giá 50%</span>
                                <h2 className="mt-3 text-white">Bộ đồ hợp thời trang</h2>
                                <p className="text-md mt-3 text-white">Nhanh lên! Ưu đãi trong thời gian có hạn.</p>

                                <div id="simple-timer" className="syotimer mb-5"></div>
                                <a href="!#" className="btn btn-main"><i className="ti-bag mr-2"></i>Mua ngay </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section products-list">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-12 col-md-12">
                            <img src="assets/images/adsv.jpg" alt="Product big thumb" className="img-fluid w-100" />
                        </div>
                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="widget-featured-entries mt-5 mt-lg-0">
                                <h4 className="mb-4 pb-3">Bán chạy nhất</h4>
                                <div className="media mb-3">
                                    <a className="featured-entry-thumb" href="/product-single">
                                        <img src="assets/images/p-1.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Keds - Kickstart Pom Pom</a></h6>
                                        <p className="featured-entry-meta">$42.99</p>
                                    </div>
                                </div>
                                <div className="media mb-3">
                                    <a className="featured-entry-thumb" href="!#">
                                        <img src="assets/images/p-2.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Nike - Brasilia Medium Backpack</a></h6>
                                        <p className="featured-entry-meta">$27.99</p>
                                    </div>
                                </div>
                                <div className="media mb-3">
                                    <a className="featured-entry-thumb" href="!#">
                                        <img src="assets/images/p-3.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Guess - GU7295</a></h6>
                                        <p>$38.00</p>
                                    </div>
                                </div>
                                <div className="media mb-3">
                                    <a className="featured-entry-thumb" href="!#">
                                        <img src="assets/images/p-4.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Adidas Originals Cap</a></h6>
                                        <p className="featured-entry-meta">$35.00</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <a className="featured-entry-thumb" href="!#">
                                        <img src="assets/images/p-5.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Big Star Flip Tops</a></h6>
                                        <p className="featured-entry-meta">$10.60</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="widget-featured-entries mt-5 mt-lg-0">
                                <h4 className="mb-4 pb-3">New Arrivals</h4>
                                <div className="media mb-3">
                                    <a className="featured-entry-thumb" href="/product-single">
                                        <img src="assets/images/p-7.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Keds - Kickstart Pom Pom</a></h6>
                                        <p className="featured-entry-meta">$42.99</p>
                                    </div>
                                </div>
                                <div className="media mb-3">
                                    <a className="featured-entry-thumb" href="!#">
                                        <img src="assets/images/p-8.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Nike - Brasilia Medium Backpack</a></h6>
                                        <p className="featured-entry-meta">$27.99</p>
                                    </div>
                                </div>
                                <div className="media mb-3">
                                    <a className="featured-entry-thumb" href="!#">
                                        <img src="assets/images/p-1.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Guess - GU7295</a></h6>
                                        <p>$38.00</p>
                                    </div>
                                </div>
                                <div className="media mb-3">
                                    <a className="featured-entry-thumb" href="!#">
                                        <img src="assets/images/p-2.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Adidas Originals Cap</a></h6>
                                        <p className="featured-entry-meta">$35.00</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <a className="featured-entry-thumb" href="!#">
                                        <img src="assets/images/p-4.jpg" alt="Product thumb" width="64" className="img-fluid mr-3" />
                                    </a>
                                    <div className="media-body">
                                        <h6 className="featured-entry-title mb-0"><a href="!#">Big Star Flip Tops</a></h6>
                                        <p className="featured-entry-meta">$10.60</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="features border-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="feature-block">
                                <i className="tf-ion-android-bicycle"></i>
                                <div className="content">
                                    <h5>Miễn phí vận chuyển</h5>
                                    <p>Trên tất cả các đơn đặt hàng $39.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="feature-block">
                                <i className="tf-wallet"></i>
                                <div className="content">
                                    <h5>30 ngày trở lại</h5>
                                    <p>Đảm bảo lại tiền</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="feature-block">
                                <i className="tf-key"></i>
                                <div className="content">
                                    <h5>Kiểm tra an toàn</h5>
                                    <p>100% được bảo vệ bởi paypal</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="feature-block">
                                <i className="tf-clock"></i>
                                <div className="content">
                                    <h5>Hỗ trợ 24/7</h5>
                                    <p>Hỗ trợ khách hàng mọi lúc </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home;