import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllProduct, getDetailProduct } from "../service/HomePage";
import { addToCart, getProductOption } from "../service/SignleProduct";
import { IHomePage, IInfo } from "../type/HomePage";
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { useAuthStore } from "../../hooks/zustand/auth";
import Swal from "sweetalert2";
import { Pagination } from "antd";
function SingleProduct() {
    const accessToken = useAuthStore((e) => e.accessToken)
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }
    const { id } = useParams();
    const [infos, setInfos] = useState({} as IInfo);
    const [option1, setOption1] = useState([]);
    const [option2, setOption2] = useState([]);
    const [option3, setOption3] = useState([]);
    const [products, setProducts] = useState([{} as IHomePage]);

    const [op1, setOp1] = useState('');
    const [op2, setOp2] = useState('');
    const [op3, setOp3] = useState('');
    const [disable, setDisable] = useState(false);
    const [quantityBuy, setQuantityBuy] = useState(1);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })


    useEffect(() => {
        getDetailProduct(parseInt(id as string)).then((response) => {
            setInfos(response.data.InfoProduct)
            setOption1(response.data.Option1)
            setOption2(response.data.Option2)
            setOption3(response.data.Option3)
        });
        getAllProduct().then((r) => {
            setProducts(r.data);
        });
    }, []);


    const defaultOption1 = infos.option1
    const defaultOption2 = infos.option2
    const defaultOption3 = infos.option3

    const role = useAuthStore((state) => state.role)


    useEffect(() => { onChangeOptions() }, [op1, op2, op3])
    let navigate = useNavigate()

    const onChangeOptions = () =>
    (
        console.log(" op1:" + op1),
        console.log(" op2:" + op2),
        console.log(" op3:" + op3),
        getProductOption(parseInt(id as string), op1 as string, op2 as string, op3 as string).then((response) => {
            console.log(response.data.quantity > 0)
            setInfos(response.data)
            setDisable(response.data.quantity > 0)
        }, (err) => {
            setDisable(false)
        }))
    const addToCartCustomer = () => {
        console.log('In add to cart')
        console.log('Quantity ????', quantityBuy);
        addToCart(Number(quantityBuy), infos.id, accessToken).then((res) => {
            console.log(res.data)
            Toast.fire({
                icon: 'success',
                title: 'Thêm vào giỏ thành công '
            })
        }, (err) => {
            navigate("/login")
            // console.log(err)
            Toast.fire({
                icon: 'success',
                title: 'Hãy đăng nhập'
            })
        })
    }
    const [page, setPage] = useState({ fist: 0, last: 4 });
    const handleChange = (value: any) => {
        if (value <= 1) {
            setPage({
                fist: 0,
                last: 4
            });
        } else if (value * 4 > products.length) {
            setPage({
                fist: (value * 4) - 4,
                last: products.length
            });
        } else {
            setPage({
                fist: (value * 4) - 4,
                last: value * 4
            });
        }
    };
    const checkQuantity = (quantity: any, quantityBuy: any) => { return Number(quantityBuy) > quantity }
    return (
        <div className="single-product-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">CHI TIẾT SẢN PHẨM</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Chi tiết sản phẩm</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="single-product">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="single-product-slider">
                                <div className="carousel slide" data-ride="carousel" id="single-product-slider">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src={infos.image} alt="" className="img-fluid" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src={infos.image} alt="" className="img-fluid" />
                                        </div>
                                        <div className="carousel-item ">
                                            <img src={infos.image} alt="" className="img-fluid" />
                                        </div>
                                    </div>

                                    <ol className="carousel-indicators">
                                        <li data-target="#single-product-slider" data-slide-to="0" className="active">
                                            <img src="assets/images/product-3.jpg" alt="" className="img-fluid" />
                                        </li>
                                        <li data-target="#single-product-slider" data-slide-to="1">
                                            <img src="assets/images/product-2.jpg" alt="" className="img-fluid" />
                                        </li>
                                        <li data-target="#single-product-slider" data-slide-to="2">
                                            <img src="assets/images/product-1.jpg" alt="" className="img-fluid" />
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className="single-product-details mt-5 mt-lg-0">
                                <h2>{infos.name}</h2>
                                <div className="sku_wrapper mb-4">
                                    Mã hàng: <span className="text-muted">{infos.code} </span>
                                </div>

                                <hr />

                                <h3 className="product-price">{new Intl.NumberFormat('vi-VN', config).format(infos.price)}vnd
                                    {/* <del>$119.90</del> */}
                                </h3>

                                <p className="product-description my-4 ">
                                    Chú ý: Chính sách trả hàng của chúng tôi trong vòng 3 ngày kể từ khi bạn nhận được hàng. Vì vậy hãy chọn những sản phẩm mà bạn ưng ý nhất. Chúc bạn có những trải nghiệp tốt nhất ở website của chúng tôi
                                </p>


                                <div className="color-swatches mt-4 d-flex align-items-center">
                                    <span className="font-weight-bold text-capitalize product-meta-title ">Màu sắc:</span>
                                    <RadioGroup
                                        aria-label="platform"
                                        defaultValue={defaultOption1}
                                        overlay
                                        name="platform"
                                        onChange={(event) => {
                                            setOp1(event.target.value)

                                        }}
                                        sx={{
                                            flexDirection: 'row',
                                            gap: 1,
                                            [`& .${radioClasses.checked}`]: {
                                                [`& .${radioClasses.action}`]: {
                                                    inset: -1,
                                                    border: '2px solid',
                                                    borderColor: 'primary.500',
                                                },
                                            },
                                            [`& .${radioClasses.radio}`]: {
                                                display: 'contents',
                                            },
                                        }}
                                    >
                                        {option1.map((value) => (
                                            <Sheet
                                                key={value}
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: '10px',
                                                    bgcolor: 'background.level1',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    p: 1,
                                                    minWidth: 60,
                                                }}
                                            >
                                                <Radio id={value} value={value} />
                                                <FormLabel htmlFor={value}>{value}</FormLabel>
                                            </Sheet>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="product-size d-flex align-items-center mt-4">
                                    <span className="font-weight-bold text-capitalize product-meta-title">Kích thước:</span>
                                    <RadioGroup
                                        aria-label="platform"
                                        defaultValue={defaultOption2}
                                        overlay
                                        name="platform"
                                        onChange={(event) => {
                                            setOp2(event.target.value)
                                        }}
                                        sx={{
                                            flexDirection: 'row',
                                            gap: 1,
                                            [`& .${radioClasses.checked}`]: {
                                                [`& .${radioClasses.action}`]: {
                                                    inset: -1,
                                                    border: '2px solid',
                                                    borderColor: 'primary.500',
                                                },
                                            },
                                            [`& .${radioClasses.radio}`]: {
                                                display: 'contents',
                                            },
                                        }}
                                    >
                                        {option2.map((value) => (
                                            <Sheet
                                                key={value}
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: '10px',
                                                    bgcolor: 'background.level1',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    p: 1,
                                                    minWidth: 60,
                                                }}
                                            >
                                                <Radio id={value} value={value} />
                                                <FormLabel htmlFor={value}>{value}</FormLabel>
                                            </Sheet>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="products-meta mt-4">
                                    <div className="product-category d-flex align-items-center">
                                        <span className="font-weight-bold text-capitalize product-meta-title">Chất liệu:</span>
                                        <RadioGroup
                                            aria-label="platform"
                                            defaultValue={defaultOption3}
                                            overlay
                                            name="platform"
                                            onChange={(event) => {
                                                setOp3(event.target.value)
                                            }}
                                            sx={{
                                                flexDirection: 'row',
                                                gap: 1,
                                                [`& .${radioClasses.checked}`]: {
                                                    [`& .${radioClasses.action}`]: {
                                                        inset: -1,
                                                        border: '2px solid',
                                                        borderColor: 'primary.500',
                                                    },
                                                },
                                                [`& .${radioClasses.radio}`]: {
                                                    display: 'contents',
                                                },
                                            }}
                                        >
                                            {option3.map((value) => (
                                                <Sheet
                                                    key={value}
                                                    variant="outlined"
                                                    sx={{
                                                        borderRadius: '10px',
                                                        bgcolor: 'background.level1',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        p: 1,
                                                        minWidth: 60,
                                                    }}
                                                >
                                                    <Radio id={value} value={value} />
                                                    <FormLabel htmlFor={value}>{value}</FormLabel>
                                                </Sheet>
                                            ))}
                                        </RadioGroup>

                                    </div>
                                    {/* <form className="cart" action="#" method="post"> */}
                                    <div className="mt-3">
                                        <div hidden={disable}>Lựa chọn này đã hết hàng!</div>
                                        <div className="quantity d-flex align-items-center">
                                            <input type="number" id="qty" className="input-text qty text form-control w-25 mr-3"

                                                onChange={(e: any) => {
                                                    setQuantityBuy(e.target.value)
                                                    if (checkQuantity(infos.quantity, e.target.value)) {
                                                        Toast.fire({
                                                            icon: 'error',
                                                            title: 'Số lượng trong kho không đủ'
                                                        })
                                                        setQuantityBuy(infos.quantity)
                                                    }
                                                    if (e.target.value < 1) {
                                                        Toast.fire({
                                                            icon: 'error',
                                                            title: 'Số lượng tối thiểu là 1'
                                                        })
                                                        setQuantityBuy(1)
                                                    }
                                                }}
                                                min='1' max={infos.quantity} name="quantity" size={4} value={quantityBuy} />
                                            <Button variant="contained" disabled={!disable} color="primary" size="large" onClick={() => {
                                                addToCartCustomer()
                                            }}>Add to cart</Button>
                                        </div>
                                    </div>
                                    {/* </form> */}
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            <section className="products related-products section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="title text-center">
                                <h2>Các sản phẩm khác</h2>
                                <p>Mua hàng trực tuyến tốt nhất để mua sắm vào cuối tuần</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {products && products.length > 0 &&
                            products.slice(page.fist, page.last).map(p => {
                                return (
                                    <div className="col-lg-3 col-6" >
                                        <div className="product">
                                            <>
                                                <div className="product-wrap">
                                                    <Link to={{ pathname: `/single-product/${p.id}` }}>
                                                        <img className="img-fluid w-100 mb-3 img-first" src={p.image} alt="product-img" />
                                                        <img className="img-fluid w-100 mb-3 img-second" src={p.image} alt="product-img" />
                                                    </Link>
                                                </div>
                                                <div className="product-hover-overlay">
                                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                                </div>

                                                <div className="product-info">
                                                    <h2 className="product-title h5 mb-0">
                                                        <Link to={{ pathname: `/single-product/${p.id}` }}>
                                                            {p.name}
                                                        </Link>
                                                    </h2>
                                                    <span className="price">
                                                        {p.wholesale_price}
                                                    </span>
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                )

                            })}
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={4}
                            onChange={handleChange}
                            total={products.length}
                            style={{ margin: "auto" }}
                        />


                        {/* <div className="col-lg-3 col-6" >
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                                </div>

                                <span className="onsale">Doanh thu</span>
                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="/product-single">Kirby Shirt</a></h2>
                                    <span className="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-3 col-6" >
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/322.jpg" alt="product-img" /></a>
                                </div>

                                <span className="onsale">Doanh thu</span>
                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="/product-single">Kirby Shirt</a></h2>
                                    <span className="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/444.jpg" alt="product-img" /></a>
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                                </div>

                                <span className="onsale">Doanh thu</span>
                                <div className="product-hover-overlay">
                                    <a href="!#"><i className="tf-ion-android-cart"></i></a>
                                    <a href="!#"><i className="tf-ion-ios-heart"></i></a>
                                </div>

                                <div className="product-info">
                                    <h2 className="product-title h5 mb-0"><a href="/product-single">Kirby Shirt</a></h2>
                                    <span className="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    )
}
export default SingleProduct;
