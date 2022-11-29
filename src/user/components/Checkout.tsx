import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/zustand/auth";
import { addOrderPush, getCartItems, getInfoHuyen, getInfoTP, getInfoXa, moneyFee } from "../service/CheckoutService";
import { ICartItem } from "../type/CartItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { IInfoHuyen, IInfoMoneyFee, IInfoTP, IInfoXa } from "../type/InfoGHN";
import { Avatar, NativeSelect, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const accessToken = useAuthStore((e) => e.accessToken)


    // console.log('Local checkout --------------' + JSON.parse(localStorage.getItem('test1') || '{}'))

    const [cartItem, setCartItems] = useState([] as ICartItem[]);
    const [tp, setTP] = useState('');
    const [hy, setHy] = useState('');
    const [xa, setXa] = useState('');

    const [listTP, setListTP] = useState([] as IInfoTP[]);
    const [listHy, setListHy] = useState([] as IInfoHuyen[]);
    const [listXa, setListXa] = useState([] as IInfoXa[]);

    // const [hSelect, setHSelect] = useState(false);


    const [nameTP, setNameTP] = useState('');
    const [nameHy, setNameHy] = useState('');
    const [nameXa, setNameXa] = useState('');


    const [moneyFeeShip, setMoneyFeeShip] = useState({} as IInfoMoneyFee);


    let id_cart_item_local = JSON.parse(localStorage.getItem('test1') || '{}')
    useEffect(() => {
        getCartItems(id_cart_item_local as any, accessToken).then((response) => {
            setCartItems(response.data)
        }, (err) => {
            console.log(err)
        })

        getInfoTP().then((response) => {
            setListTP(response.data.infomation)
        })
    }, [])

    useEffect(() => {
        getInfoHuyen(Number(tp)).then((res) => {
            console.log('response huyen, ' + res.data)
            setListHy(res.data.infomation)

        })

    }, [tp])

    useEffect(() => {
        getInfoXa(Number(hy)).then((res) => {
            console.log('response axa, ' + res.data)
            setListXa(res.data.infomation)

        })
    }, [hy])
    let nf = new Intl.NumberFormat();
    let sumPrice = 0;
    let sumQuantity = 0;
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        cartItem.forEach((e) => {
            console.log(e.priceTotal)
            sumQuantity += Number(e.quantity)
            sumPrice += Number(e.priceTotal)
        })
        setTotalQuantity(Number(sumQuantity))
        setTotalPrice(Number(sumPrice))
    }, [cartItem]);


    useEffect(() => {
        moneyFee(totalPrice, Number(hy), xa, totalQuantity * 300).then((res) => {
            console.log('response fee' + res.data.infomation[0])
            setMoneyFeeShip(res.data.infomation[0])
        })
    }, [hy, xa, tp])


    const navigate = useNavigate();
    const addOrder123 = () => {
        console.log('OKOKOOKk' + (nameXa + ' ' + nameHy + ' ' + nameTP) + 'comming' + id_cart_item_local + moneyFeeShip.total + accessToken)
        addOrderPush((nameXa + ' ' + nameHy + ' ' + nameTP), 'comming', id_cart_item_local, moneyFeeShip.total, accessToken).then((res) => {
            console.log('12313123123' + res)
            navigate("/page-checkout")
        }, (err) => {
            console.log(err)
        })
    }
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}



    return (
        <div className="checkout-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">THỦ TỤC THANH TOÁN</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Thủ tục thanh toán</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="page-wrapper">
                <div className="checkout shopping">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 pr-5">
                                <div className="coupon-notice " data-toggle="modal" data-target="#coupon-modal">
                                    <div className="bg-light p-3">
                                        Có phiếu giảm giá? <a href="/checkout" className="showcoupon" >Bấm vào đây để nhập mã của bạn</a>
                                    </div>
                                </div>

                                <div className="billing-details mt-5">
                                    <h4 className="">Chi tiết thanh toán</h4>
                                    <div className="row m-5">
                                        <div className="col-md-6">
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                                                        Thành phố
                                                    </InputLabel>
                                                    <NativeSelect
                                                        defaultValue={30}
                                                        inputProps={{
                                                            name: 'Thanh Pho',
                                                            id: 'uncontrolled-native1',
                                                        }}
                                                        onChange={(e) => {
                                                            setNameTP(e.target.options[e.target.selectedIndex].text)
                                                            setTP(String(e.target.value))
                                                        }}
                                                    >
                                                        <option aria-label="None" value="" />
                                                        {
                                                            listTP.map((e) => {
                                                                return (
                                                                    <option value={e.ProvinceID}>{e.ProvinceName}</option>
                                                                )
                                                            })
                                                        }
                                                        {/* <option value={10}>Ten</option>
                                                <option value={20}>Twenty</option>
                                                <option value={30}>Thirty</option> */}
                                                    </NativeSelect>
                                                </FormControl>
                                            </Box>
                                        </div>
                                        <div className="col-md-6">
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                                                        Huyện
                                                    </InputLabel>
                                                    <NativeSelect
                                                        defaultValue={30}
                                                        inputProps={{
                                                            name: 'Huyen',
                                                            id: 'uncontrolled-native1',
                                                        }}
                                                        onChange={(e) => {
                                                            setNameHy(e.target.options[e.target.selectedIndex].text)
                                                            setHy(String(e.target.value))
                                                        }}
                                                    >
                                                        <option aria-label="None" value="" />
                                                        {
                                                            listHy.map((e) => {
                                                                return (
                                                                    <option value={e.DistrictID}>{e.DistrictName}</option>
                                                                )
                                                            })
                                                        }
                                                        {/* <option value={10}>Ten</option>
                                                <option value={20}>Twenty</option>
                                                <option value={30}>Thirty</option> */}
                                                    </NativeSelect>
                                                </FormControl>
                                            </Box>
                                        </div>
                                        <div className="col-md-12">
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                                                        Xã
                                                    </InputLabel>
                                                    <NativeSelect
                                                        defaultValue={30}
                                                        inputProps={{
                                                            name: 'Xa',
                                                            id: 'uncontrolled-native1',
                                                        }}
                                                        onChange={(e) => {
                                                            setNameXa(e.target.options[e.target.selectedIndex].text)
                                                            setXa(String(e.target.value))
                                                        }}
                                                    >
                                                        <option aria-label="None" value="" />
                                                        {
                                                            listXa.map((e) => {
                                                                return (
                                                                    <option value={e.WardCode}>{e.WardName}</option>
                                                                )
                                                            })
                                                        }
                                                    </NativeSelect>
                                                </FormControl>
                                            </Box>
                                        </div>
                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" >Tên sản phẩm</TableCell>
                                                    <TableCell align="center">Tùy chọn</TableCell>
                                                    <TableCell align="center">Số lượng</TableCell>
                                                    <TableCell align="center">Giá tiền (VNĐ)</TableCell>
                                                    <TableCell align="center">Tổng tiền (VNĐ)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cartItem.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <Avatar src={row.image} />
                                                        </TableCell>
                                                        <TableCell align="center">{row.option1 + ' - ' + row.option2 + ' - ' + row.option3}</TableCell>
                                                        <TableCell align="center">{row.quantity}</TableCell>
                                                        <TableCell align="center">
                                                            {new Intl.NumberFormat('vi-VN', config).format(row.wholesale_price)}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {new Intl.NumberFormat('vi-VN', config).format(row.priceTotal)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>


                            <div className="col-md-6 col-lg-4">
                                <div className="product-checkout-details mt-5 mt-lg-0">
                                    <h4 className="mb-4 border-bottom pb-4">Tóm tắt theo thứ tự</h4>

                                    <div className="media product-card">
                                        <p>Áo sơ mi Kirby</p>
                                        <div className="media-body text-right">
                                            <p className="h5">1 x $249</p>
                                        </div>
                                    </div>

                                    <ul className="summary-prices list-unstyled mb-4">
                                        <li className="d-flex justify-content-between">
                                            <span >Tổng phụ:</span>
                                            <span className="h5">
                                                {new Intl.NumberFormat('vi-VN', config).format(totalPrice)}
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span >Phí vận chuyển:</span>
                                            <span className="h5">
                                                {new Intl.NumberFormat('vi-VN', config).format(moneyFeeShip.total)}
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span>Tổng:</span>
                                            <span className="h5">
                                                {new Intl.NumberFormat('vi-VN', config).format(moneyFeeShip.total + totalPrice)}
                                            </span>
                                        </li>
                                    </ul>

                                    <form action="#">
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                Chuyển khoản trực tiếp
                                            </label>

                                            <div className="alert alert-secondary mt-3" role="alert">
                                                Thực hiện thanh toán của bạn trực tiếp vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng ID đơn đặt hàng của bạn làm tham chiếu thanh toán. Đơn đặt hàng của bạn sẽ không được chuyển cho đến khi tiền đã hết trong tài khoản của chúng tôi.
                                            </div>
                                        </div>

                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                Kiểm tra các khoản thanh toán
                                            </label>
                                        </div>

                                        <div className="form-check mb-3">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck3" />
                                            <label className="form-check-label" htmlFor="exampleCheck3">Tôi đã đọc và đồng ý với các điều khoản và điều kiện của trang web *</label>
                                        </div>
                                    </form>

                                    <div className="info mt-4 border-top pt-4 mb-5">
                                        Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn đặt hàng, hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này và cho các mục đích khác được mô tả trong <a href="#">Chính sách bảo mật</a>.
                                    </div>

                                    <button className="btn btn-main btn-small d-flex justify-content-center"
                                        onClick={() => {
                                            addOrder123()
                                        }}
                                    >Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal fade" id="coupon-modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content py-5">
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Enter Coupon Code" />
                                </div>
                                <button type="button" className="btn btn-main btn-small" data-dismiss="modal">Apply Coupon</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout;