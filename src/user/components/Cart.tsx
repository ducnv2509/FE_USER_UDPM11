import { Avatar, Input, Button } from "@mui/material";
import { useAuthStore } from "../../hooks/zustand/auth";
import { showCart } from "../service/SignleProduct";
import { ICartItem } from "../type/CartItem";
import { DataGrid, GridCellEditCommitParams, GridColDef, } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { deleteCart, updateQuantityCart } from "../service/HistoryOrder";
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useEffect, useState} from "react";
const Cart = () => {
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })
    let nf = new Intl.NumberFormat();
    const idUser = useAuthStore((e) => e.id);
    const accessToken = useAuthStore((e) => e.accessToken);
    let sumPrice = 0;
    const [cartItems, setCartItems] = useState([] as ICartItem[]);
    const [selectedRow, setSelectedRow] = useState([] as ICartItem[]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('test1')
        setLoading(true)
        showCart(Number(idUser), accessToken).then((response) => {
            setLoading(false)
            console.log(response.data)
            setCartItems(response.data)
        },
            (err) => {
                setLoading(false)
                console.log('OUT', err);
            });
    }, []);
    useEffect(() => {
        sumPrice=0
        selectedRow.forEach((e) => {
            console.log(e.priceTotal)
            sumPrice += Number(e.priceTotal)
        })
        setTotalPrice(Number(sumPrice))
    }, [selectedRow]);

    const onClickUpdateQuantityCart = (quantity: number, id_cart_item: number) => {
        console.log(quantity);
        console.log(id_cart_item);
        setLoading(true)
        if (quantity < 1) {
            quantity = 1
            Toast.fire({
                icon: 'error',
                title: 'Số lượng tối thiếu phải là 1'
            })
            updateQuantityCart(quantity, id_cart_item, accessToken).then((res) => {
                console.log(res.data);
                loadData()
            }, (err) => {
                Toast.fire({
                    icon: 'error',
                    title: err.response.data.description
                })
                loadData()
            })
        } else {
            updateQuantityCart(quantity, id_cart_item, accessToken).then((res) => {
                console.log(res.data);
                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công '
                })
                loadData()
            }, (err) => {
                Toast.fire({
                    icon: 'error',
                    title: err.response.data.description
                })
                loadData()
            })
        }
    }
    const loadData = () => {
        showCart(Number(idUser), accessToken).then((response) => {
            setLoading(false)
            let newSelected: ICartItem[] = [];
            response.data.map((p:any)=>{
                const selectedIndex = selectedRow.findIndex((row)=>row.id_cart_item === p.id_cart_item);
                console.log(selectedIndex);
                if(selectedIndex!== -1){
                    newSelected.push(p)
                }
            })
            console.log(newSelected);
            if(newSelected.length !== 0){
                setSelectedRow(newSelected)
                localStorage.setItem('listItem', JSON.stringify(newSelected))
            }
            setCartItems(response.data)
        },
            (err) => {
                setLoading(false)
                console.log('OUT', err);
            });
    }
    const onClickDeleteCartItem = (id_cart_item: number[]) => {
        setLoading(true)
        deleteCart(id_cart_item, accessToken).then((res) => {
            console.log(res.data);
            Toast.fire({
                icon: 'success',
                title: 'Cập nhật thành công '
            })
            showCart(Number(idUser), accessToken).then((response) => {
                setLoading(false)
                console.log(response.data)
                setCartItems(response.data)
            },
                (err) => {
                    setLoading(false)
                    console.log('OUT', err);
                });
        }, (err) => {
            console.log(err);
            Toast.fire({
                icon: 'success',
                title: 'Cập nhật thất bại '
            })
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'image', headerName: 'Ảnh', width: 70, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Avatar src={params.value} />
                        {params.value.username}
                    </>
                );
            }
        },
        {
            field: 'name', headerName: 'Tên sản phẩm', width: 210, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        {params.value.split('-')[0]}
                    </>
                );
            }
        },
        { field: 'option1', headerName: 'Màu', width: 100, headerAlign: 'center', align: 'center', },
        { field: 'option2', headerName: 'Kích cỡ', width: 100, headerAlign: 'center', align: 'center', },
        { field: 'option3', headerName: 'Chất liệu', width: 100, headerAlign: 'center', align: 'center', },
        { field: 'quantity', headerName: 'Số lượng', width: 100, headerAlign: 'center', align: 'center', type: 'number', editable: true,
            renderCell: (params) => {
                return (
                    <Input inputProps={{ min: 1, style: { textAlign: 'center' } }} type="number" minRows={1} value={params.row.quantity} onChange={() => {
                        console.log(params);
                    }} disableUnderline={true} />
                );
            }
        },
        { field: 'wholesale_price', headerName: 'Giá tiền (VNĐ)', width: 130, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        {new Intl.NumberFormat('vi-VN', config).format(params.value)}
                    </>
                );
            }
        },
        {
            field: 'priceTotal', headerName: 'Tổng tiền (VNĐ)', width: 150, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return (
                    <>
                    {new Intl.NumberFormat('vi-VN', config).format(params.value)}
                    </>
                );
            }
        },
        {
            field: '', headerName: 'Xoá', width: 100, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Button color="error"
                            onClick={() => {
                                const id: number[] = [];
                                let id_main = params.row.id_cart_item
                                id.push(id_main)
                                onClickDeleteCartItem(id)
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        }
    ];

    const onRowsSelectionHandler = (ids: any) => {
        const selectedRowsData = ids.map((id: any) => cartItems.find((row) => row.id_cart_item === id));
        localStorage.setItem('listItem', JSON.stringify(selectedRowsData))
        setSelectedRow(selectedRowsData)
    };



    return (
        <div className="checkout-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">GIỎ HÀNG</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cart shopping page-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="product-list">
                                <form className="cart-form">
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            loading={loading}
                                            rows={cartItems}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            getRowId={(cartItems) => cartItems.id_cart_item}
                                            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                                            checkboxSelection
                                            disableSelectionOnClick
                                            onCellEditCommit={(params: GridCellEditCommitParams) => {
                                                // Clicking outside the cell vs enter/tab yields different results.
                                                console.log(params);
                                                onClickUpdateQuantityCart(params.value, Number(params.id))
                                            }}
                                        />
                                    </div>

                                   

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-lg-4">
                            <div className="cart-info card p-4 mt-4">
                                <h4 className="mb-4">Tổng số giỏ hàng</h4>
                                <ul className="list-unstyled mb-4">
                                    {/* <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Tổng phụ:</h5>
                                        <> VNĐ</>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Phí vận chuyển:</h5>
                                        <span>Miễn phí</span>
                                    </li> */}
                                    <li className="d-flex justify-content-between pb-2">
                                        <h5>Tổng:</h5>
                                        <span>{nf.format(totalPrice)} VNĐ</span>
                                    </li>
                                </ul>
                                <button className="btn btn-main btn-small"
                                    onClick={() => {
                                        navigate('/checkout')
                                    }}
                                    disabled={selectedRow.length < 1}
                                >Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Cart

