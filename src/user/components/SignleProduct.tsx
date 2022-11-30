import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProduct } from "../service/HomePage";
import { addToCart, getProductOption } from "../service/SignleProduct";
import { IInfo } from "../type/HomePage";
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { useAuthStore } from "../../hooks/zustand/auth";
import Swal from "sweetalert2";
function SingleProduct() {
    const accessToken = useAuthStore((e) => e.accessToken)
    let nf = new Intl.NumberFormat();
    const { id } = useParams();
    const [infos, setInfos] = useState({} as IInfo);
    const [option1, setOption1] = useState([]);
    const [option2, setOption2] = useState([]);
    const [option3, setOption3] = useState([]);

    const [op1, setOp1] = useState('');
    const [op2, setOp2] = useState('');
    const [op3, setOp3] = useState('');

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
            console.log(response.data)
            setInfos(response.data)
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
            console.log(err)
            if (role == 'anonymous') {
                navigate('/login')
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Thêm vào giỏ thất bại'
                })
            }
        })
    }
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
                                    Mã hàng: <span className="text-muted">AB1563456789 </span>
                                </div>

                                <hr />

                                <h3 className="product-price">{nf.format(infos.price)} vnd<del>$119.90</del></h3>

                                <p className="product-description my-4 ">
                                    Điều rất quan trọng đối với khách hàng là phải chú ý đến quá trình adipiscing. Người ta cho rằng, bản thân lao động là do có người bỏ mặc cho đau đớn, hưởng lợi. Tất cả các kết quả hạnh phúc của chúng tôi, kết quả của họ? Nó sẽ là hậu quả của việc từ chối chính lời nói.
                                </p>

                                {/* <form className="cart" action="#" method="post"> */}
                                <div className="quantity d-flex align-items-center">
                                    <input type="number" id="qty" className="input-text qty text form-control w-25 mr-3"

                                        onChange={(e: any) => {
                                            setQuantityBuy(e.target.value)
                                        }}
                                        max={infos.quantity} name="quantity" size={4} value={quantityBuy} />
                                    <button className="btn btn-main btn-small"
                                        onClick={() => {
                                            addToCartCustomer()
                                        }}
                                    >Add to cart</button>
                                </div>
                                {/* </form> */}


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

                                    <div className="product-share mt-5">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <a href="!#"><i className="tf-ion-social-facebook"></i></a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="!#"><i className="tf-ion-social-twitter"></i></a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="!#"><i className="tf-ion-social-linkedin"></i></a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="!#"><i className="tf-ion-social-pinterest"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="product-info-tabs wc-tabs mt-5 mb-5">
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Description</a>
                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Additional Information</a>
                                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Reviews(2)</a>
                                </div>
                            </nav>

                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <p>Trẻ em đang sống với bệnh tật, tuổi già và trẻ em, và họ đang phải chịu đựng cái đói và cái nghèo. Vestibulum tra tấn quam, feugiat vitae, cần tối tân, thời gian phải có trước đó. Cho đến lúc đó, bóng đá tự do quan trọng hơn bao giờ hết. Aenean là kẻ thù của cuộc đời tôi. Mauris investmentrat eleifend leo.</p>

                                    <h4>Tính năng sản phẩm</h4>

                                    <ul className="">
                                        <li>Được ánh xạ với 3M ™ Thinsulate ™ Cách nhiệt [40G Thân áo / Tay áo / Mũ trùm]</li>
                                        <li>Lót Taffeta dập nổi</li>
                                        <li>Vải Oxford 2 lớp DRYRIDE Durashell ™ [10.000MM, 5.000G]</li>
                                    </ul>

                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                                    <ul className="list-unstyled info-desc">
                                        <li className="d-flex">
                                            <strong>Trọng lượng </strong>
                                            <span>400 g</span>
                                        </li>
                                        <li className="d-flex">
                                            <strong>Kích thước </strong>
                                            <span>10 x 10 x 15 cm</span>
                                        </li>
                                        <li className="d-flex">
                                            <strong>Vật liệu</strong>
                                            <span >60% cotton, 40% polyester</span>
                                        </li>
                                        <li className="d-flex">
                                            <strong>Màu sắc </strong>
                                            <span>Blue, Gray, Green, Red, Yellow</span>
                                        </li>
                                        <li className="d-flex">
                                            <strong>Kích thước</strong>
                                            <span>L, M, S, XL, XXL</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <div className="media review-block mb-4">
                                                <img src="assets/images/avater-1.jpg" alt="reviewimg" className="img-fluid mr-4" />
                                                <div className="media-body">
                                                    <div className="product-review">
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                    </div>
                                                    <h6>Therichpost <span className="text-sm text-muted font-weight-normal ml-3">-June 23, 2019</span></h6>
                                                    <p>Điều rất quan trọng đối với khách hàng là phải chú ý đến quá trình adipiscing. Anh ta nhận lấy hậu quả, nhìn thấy những người khen ngợi cô bỏ trốn. Nó thường là một sai lầm để đúng.</p>
                                                </div>
                                            </div>

                                            <div className="media review-block">
                                                <img src="assets/images/avater-2.jpg" alt="reviewimg" className="img-fluid mr-4" />
                                                <div className="media-body">
                                                    <div className="product-review">
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                        <span><i className="tf-ion-android-star"></i></span>
                                                        <span><i className="tf-ion-android-star-outline"></i></span>
                                                    </div>
                                                    <h6>Therichpost <span className="text-sm text-muted font-weight-normal ml-3">-June 23, 2019</span></h6>
                                                    <p>Điều rất quan trọng đối với khách hàng là phải chú ý đến quá trình adipiscing. Anh ta nhận lấy hậu quả, nhìn thấy những người khen ngợi cô bỏ trốn. Nó thường là một sai lầm để đúng.</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-lg-5">
                                            <div className="review-comment mt-5 mt-lg-0">
                                                <h4 className="mb-3">Thêm một bài đánh giá</h4>

                                                <form action="#">
                                                    <div className="starrr"></div>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Your Name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" placeholder="Your Email" />
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea name="comment" id="comment" className="form-control" cols={30} rows={4} placeholder="Your Review"></textarea>
                                                    </div>

                                                    <a href="/product-single" className="btn btn-main btn-small">Gửi đánh giá</a>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
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
                                <h2>Bạn có thể thích điều này</h2>
                                <p>Bán hàng trực tuyến tốt nhất để mua sắm vào cuối tuần này</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-6" >
                            <div className="product">
                                <div className="product-wrap">
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                                    <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/444.jpg" alt="product-img" /></a>
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default SingleProduct;
