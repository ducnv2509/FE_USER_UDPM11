import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addOrderPush } from "../service/CheckoutService";
import { filterByCategory, getAllProduct, getPopular, showAllCategory } from "../service/HomePage";
import { ICategory, IHomePage } from "../type/HomePage";
import { Toast } from "./OrderHistory";

function Shop() {
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }
    const [products, setProducts] = useState([{} as IHomePage]);
    const [popular, setPopular] = useState([{} as IHomePage]);
    const [filterProduct, setFilterProduct] = useState([{} as IHomePage]);
    const [category, setCategory] = useState([{} as ICategory]);
    const { urlParamsCheck } = useParams();
    useEffect(() => {
        document.title = "All Product"
    }, [])

    // call server
    useEffect(() => {
        // setTimeout(() => {
        getAllProduct().then((r) => {
            console.log(r.data);
            setProducts(r.data.reverse());
            // const filterPriceAscU = r.data.sort((a: any, b: any) => (a.wholesale_price > b.wholesale_price) ? 1 : -1).map((e: any) => {
            //     return e;
            // })
            // console.log(filterPriceAscU);
            // setFilterProduct(filterPriceAscU);
            setFilterProduct(r.data);
        });
        showAllCategory().then((r) => {
            setCategory(r.data)
        })
        getPopular().then(res => {
            setPopular(res.data)
        })
    }, []);
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log("url", urlParams.get('transCode'));
        let objPay = JSON.parse(localStorage.getItem('objPayment') || '{}');
        if (urlParams.get('code') == '0' && urlParams.get('transCode')?.startsWith('PAY-') != undefined) {
            console.log('THIS IS BUG FIRST', objPay)
            console.log('This is BUG ----------------------- ', objPay.address, objPay.note, objPay.cart_items, objPay.shipMoney, objPay.accessToken, objPay.typePay);
            addOrderPush(objPay.address, objPay.note, objPay.cart_items, objPay.shipMoney, objPay.accessToken, objPay.typePay).then((res) => {
                localStorage.removeItem('objPayment')
                localStorage.removeItem('listItem')
                Toast.fire({
                    icon: 'success',
                    title: 'Chúc mừng bạn đặt hàng thành công !'
                })

            }, (err) => {
                console.log(err);
            })
        }
    }, [urlParamsCheck])

    const [page, setPage] = useState({ fist: 0, last: 6 });
    const [sortFilterCurrent, setSortFilterCurrent] = useState('');
    const handleChange = (value: any) => {
        if (value <= 1) {
            setPage({
                fist: 0,
                last: 6
            });
        } else if (value * 6 > products.length) {
            setPage({
                fist: (value * 6) - 6,
                last: products.length
            });
        } else {
            setPage({
                fist: (value * 6) - 6,
                last: value * 6
            });
        }
    };

    const sortFilterASC = () => {
        const filterPriceAsc = products.sort((a, b) => (a.wholesale_price > b.wholesale_price) ? 1 : -1).map((e) => {
            return e;
        })
        console.log(filterPriceAsc);
        setSortFilterCurrent('asc')
        setFilterProduct(filterPriceAsc);
    }

    const sortFilterDSC = () => {
        const filterPriceDsc = products.sort((a, b) => (a.wholesale_price < b.wholesale_price) ? 1 : -1).map((e) => {
            return e;
        })
        setSortFilterCurrent('desc')
        setFilterProduct(filterPriceDsc);
    }

    const filterCate = (id: number[]) => {
        filterByCategory(id).then((res) => {
            console.log(res.data);
            if (sortFilterCurrent === 'asc') {
                const filterPrice = res.data.sort((a: any, b: any) => (a.wholesale_price > b.wholesale_price) ? 1 : -1)
                    .map((e: any) => { return e; })
                console.log(filterPrice);
                setFilterProduct(filterPrice);
            } else if (sortFilterCurrent === 'desc') {
                const filterPrice = res.data.sort((a: any, b: any) => (a.wholesale_price < b.wholesale_price) ? 1 : -1)
                    .map((e: any) => { return e; })
                console.log(filterPrice);
                setFilterProduct(filterPrice);
            } else {
                setFilterProduct(res.data);
            }
        })
    }

    const [selected, setSelected] = React.useState<number[]>([]);
    useEffect(() => {
        if (selected.length !== 0) {
            filterCate(selected)
        } else {
            setFilterProduct(products)
        }
    }, [selected])
    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf((id));
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        console.log(newSelected)
        setSelected(newSelected);
    };

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
                                            <p className="result-count mb-0">Hiển thị 1–6 trong số {products.length} kết quả</p>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Giá</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Giá"
                                                        onChange={
                                                            (e) => {
                                                                if (e.target.value == 10) {
                                                                    sortFilterDSC()
                                                                } else {
                                                                    sortFilterASC()
                                                                }
                                                            }
                                                        }
                                                    >
                                                        <MenuItem value={20}>Từ thấp đến cao</MenuItem>
                                                        <MenuItem value={10}>Từ cao đến thấp</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {filterProduct && filterProduct.length > 0 &&
                                    filterProduct.slice(page.fist, page.last).map(p =>
                                        <div key={p.id} className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5" >
                                            <div className="product">
                                                <div className="product-wrap">
                                                    <Link to={{ pathname: `/single-product/${p.id}` }}>
                                                        <img className="img-fluid w-100 mb-3 img-first" src={p.image} alt="product-img" />
                                                        <img className="img-fluid w-100 mb-3 img-second" src={p.image} alt="product-img" />
                                                    </Link>
                                                </div>

                                                <div className="product-info">
                                                    <Link to={{ pathname: `/single-product/${p.id}` }}>
                                                        {/* <h2 className="product-title h5 mb-0"><a href="/product-single">{p.name}</a></h2> */}
                                                        <h2 className="product-title h5 mb-0">{p.name}</h2>
                                                    </Link>
                                                    <span className="price">
                                                        {new Intl.NumberFormat('vi-VN', config).format(p.wholesale_price)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    )}

                                <div className="col-12" style={{ textAlign: "center" }}>
                                    <Pagination
                                        defaultCurrent={1}
                                        defaultPageSize={6}
                                        onChange={handleChange}
                                        total={filterProduct.length}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">




                            {/* <form className="mb-5"> */}

                            {/* <section className="widget widget-colors mb-5">
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
                                </section> */}


                            <section className="widget widget-sizes mb-5">
                                <h3 className="widget-title h4 mb-4">Danh mục</h3>
                                <FormGroup>
                                    {category.map((c) => {
                                        return (
                                            <>
                                                <FormControlLabel
                                                    value={c.id}
                                                    control={<Checkbox
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            handleClick(c.id)
                                                        }}
                                                        defaultChecked={false} />} label={c.name} />

                                            </>
                                        )
                                    })}
                                </FormGroup>
                                {/* <div className="custom-control custom-checkbox">
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
                                </div> */}
                            </section>

                            {/* <button type="button" className="btn btn-black btn-small">Lọc</button> */}
                            {/* </form> */}


                            <section className="widget widget-popular mb-5">
                                <h3 className="widget-title mb-4 h4">Sản phẩm phổ biến</h3>
                                {popular.map(p => {
                                    return (
                                        <Link to={{ pathname: `/single-product/${p.id}` }}>
                                            <p className="popular-products-item media">
                                                <img src={p.image} alt="" className="img-fluid mr-4" />
                                                <div className="media-body">
                                                    <h6>{p.name}</h6>
                                                    <span className="price">{p.wholesale_price}</span>
                                                </div>
                                            </p>
                                        </Link>
                                    )
                                })}
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Shop;