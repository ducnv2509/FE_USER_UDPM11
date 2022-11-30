import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProduct } from "../service/HomePage";
import { IHomePage } from "../type/HomePage";

function Shop() {

    const [products, setProducts] = useState([{} as IHomePage]);

    useEffect(() => {
        document.title = "All Product"
    }, [])

    // call server
    useEffect(() => {
        // setTimeout(() => {
        getAllProduct().then((r) => {
            setProducts(r.data.reverse());
        });
    }, []);



    // // calling loafding soucreser

    // useEffect(() => {
    //     getAllCoursesFromServer();
    // }, []);



    // console.log(products[0].name);

    // const updateCourses = (id) => {
    //     setCourses(courses.filter((c) => c.id != id))
    // }

    return (
        <div className="shop-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">CỬA HÀNG</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Cửa hàng</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="products-shop section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row align-items-center">
                                <div className="col-lg-12 mb-4 mb-lg-0">
                                    <div className="section-title">
                                        <h2 className="d-block text-left-sm">Cửa hàng</h2>

                                        <div className="heading d-flex justify-content-between mb-5">
                                            <p className="result-count mb-0">Hiển thị 1–6 trong số 17 kết quả</p>
                                            <form className="ordering " method="get">
                                                <select name="orderby" className="orderby form-control" aria-label="Shop order" >
                                                    <option value="" selected>Mặc định phân loại</option>
                                                    <option value="">Sắp xếp theo mức độ phổ biến</option>
                                                    <option value="">Sắp xếp theo xếp hạng trung bình</option>
                                                    <option value="">Sắp xếp theo mới nhất</option>
                                                    <option value="">Sắp xếp theo giá: thấp đến cao</option>
                                                    <option value="">Sắp xếp theo giá: cao đến thấp</option>
                                                </select>
                                                <input type="hidden" name="paged" value="1" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {products.map(p =>
                                    <div key={p.id} className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5" >
                                        <div className="product">
                                            <div className="product-wrap">
                                                <Link to={{ pathname: `/single-product/${p.id}` }}>
                                                <img className="img-fluid w-100 mb-3 img-first" src={p.image} alt="product-img" />
                                                {/* <a href={`/single-product/${p.id}`}> */}
                                                    <img className="img-fluid w-100 mb-3 img-second" src={p.image} alt="product-img" />
                                                    {/* </a> */}
                                                </Link>
                                                  {/* <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src={p.image} alt="product-img" /></a> */}
                                            </div>

                                            <span className="onsale">Sale</span>
                                            <div className="product-hover-overlay">
                                                <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                                <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                            </div>

                                            <div className="product-info">
                                            <Link to={{ pathname: `/single-product/${p.id}` }}>
                                                {/* <h2 className="product-title h5 mb-0"><a href="/product-single">{p.name}</a></h2> */}
                                                <h2 className="product-title h5 mb-0">{p.name}</h2>
                                            </Link>
                                                <span className="price">
                                                    {p.wholesale_price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                )}

                                <div className="col-12">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a className="page-link" href="!#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link" href="!#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="!#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="!#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="!#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">




                            <form className="mb-5">



                                <section className="widget widget-colors mb-5">
                                    <h3 className="widget-title h4 mb-4">Mua sắm theo màu</h3>
                                    <ul className="list-inline">
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color1" />
                                                <label className="custom-control-label sky-blue" htmlFor="color1"></label>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color2" checked />
                                                <label className="custom-control-label red" htmlFor="color2"></label>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color3" />
                                                <label className="custom-control-label dark" htmlFor="color3"></label>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color4" />
                                                <label className="custom-control-label magenta" htmlFor="color4"></label>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color5" />
                                                <label className="custom-control-label yellow" htmlFor="color5"></label>
                                            </div>
                                        </li>
                                    </ul>
                                </section>


                                <section className="widget widget-sizes mb-5">
                                    <h3 className="widget-title h4 mb-4">Mua sắm theo kích cỡ</h3>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size1" checked />
                                        <label className="custom-control-label" htmlFor="size1">L Lớn</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size2" />
                                        <label className="custom-control-label" htmlFor="size2">XL Cực lớn</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size3" />
                                        <label className="custom-control-label" htmlFor="size3">M Vừa phải</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size4" />
                                        <label className="custom-control-label" htmlFor="size4">S Nhỏ bé</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size5" />
                                        <label className="custom-control-label" htmlFor="size5">XS Rất nhỏ</label>
                                    </div>
                                </section>

                                <button type="button" className="btn btn-black btn-small">Lọc</button>
                            </form>


                            <section className="widget widget-popular mb-5">
                                <h3 className="widget-title mb-4 h4">Sản phẩm phổ biến</h3>
                                <a className="popular-products-item media" href="/product-single">
                                    <img src="assets/images/p-1.jpg" alt="" className="img-fluid mr-4" />
                                    <div className="media-body">
                                        <h6>Tương phản <br />Balo</h6>
                                        <span className="price">$45</span>
                                    </div>
                                </a>

                                <a className="popular-products-item media" href="/product-single">
                                    <img src="assets/images/p-2.jpg" alt="" className="img-fluid mr-4" />
                                    <div className="media-body">
                                        <h6>Hoodie with <br />Logo</h6>
                                        <span className="price">$45</span>
                                    </div>
                                </a>

                                <a className="popular-products-item media" href="/product-single">
                                    <img src="assets/images/p-3.jpg" alt="" className="img-fluid mr-4" />
                                    <div className="media-body">
                                        <h6>Traveller<br />Backpack</h6>
                                        <span className="price">$45</span>
                                    </div>
                                </a>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Shop;