import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/zustand/auth";
import { ICartItem } from "../type/CartItem";
import { showCart } from "../service/SignleProduct";
import { Box, Button, Grid, Input, Modal, Paper, styled, TextField, Typography } from "@mui/material";
import { infoUser, updateProfile } from "../service/Authentication";
import { IInfoUserProfile } from "../type/Profile";
import { SubmitHandler, useForm } from "react-hook-form";
import { Preview } from "@mui/icons-material";
import { Toast } from "./OrderHistory";

export type updateFormProfile = {
    id: number
    email: string
    username: string
    name: string
    phone: string
}


const Header: React.FC = () => {
    let navigate = useNavigate()
    const resetAuth = useAuthStore((state) => state.resetAuth)
    const name = useAuthStore((state) => state.name)
    function onLogout() {
        resetAuth()
        navigate('/login')
    }

    let nf = new Intl.NumberFormat();
    const idUser = useAuthStore((e) => e.id);
    const accessToken = useAuthStore((e) => e.accessToken);
    let sumPrice = 0;
    console.log('access 1231', idUser)
    const [cartItems, setCartItems] = useState([] as ICartItem[]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [profile, setProfile] = useState({} as IInfoUserProfile);

    useEffect(() => {

        localStorage.removeItem('test1')
        showCart(Number(idUser), accessToken).then((response) => {

            console.log(response.data)
            setCartItems(response.data)
        },
            (err) => {
                console.log('OUT', err);
            });
    }, []);

    // useEffect(() => {
    //     set
    // }, []);

    useEffect(() => {
        cartItems.forEach((e) => {
            console.log(e.priceTotal)

            sumPrice += Number(e.priceTotal)
        })
        setTotalPrice(Number(sumPrice))
    }, [cartItems]);
    const clickShowProfile = () => {
        infoUser(accessToken).then((res) => {
            setProfile(res.data)
            console.log(res.data);

        }, (err) => {
            console.log(err);
        })
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        clickShowProfile()
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const {
        register,
        handleSubmit,
    } = useForm<updateFormProfile>()

    let [registerError, setRegisterError] = useState()

    const handleFormSubmit: SubmitHandler<updateFormProfile> = async (data) => {
        // loginApi
        //   .add({ username: 'hoangnd25@fpt.com.vn', password: 'ArianaGrande2' })
        //   .then((res) => {
        //     dispatch(logIn({ username: 'hoang', password: 'hoang123' }))
        //   })
        //   .catch((err) => console.log(err))
        try {
            const response = await updateProfile(data.name, data.phone, data.email, accessToken).then(
                (res) => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Cập nhật thành công'
                    })
                    // window.location.reload();
                }
            );
        } catch (error: any) {
            setRegisterError(error);
            console.log('this bug', error)
        }

    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation" id="navbar">
            <div className="container">
                <Link className="navbar-brand font-weight-bold" to={{ pathname: "/home-user" }}>E-Shop</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
                    aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="main-navbar">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={{ pathname: "/home-user" }}>Trang chủ</Link>
                        </li>


                        {/* <li
                                hidden={idUser != 'Bạn' ? false : true}
                            ><Link to={{ pathname: "/history" }}>lịch sử đơn hàng</Link></li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link" href="!#">Giới thiệu</a>
                        </li> */}

                        {/* <li className="nav-item dropdown dropdown-slide">
                            <a className="nav-link dropdown-toggle" href="!#" id="navbarDropdown4" role="button" data-delay="350"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Các trang.
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                                <li><a href="!#">Về chúng tôi</a></li>
                                <li><a href="!#">Blog</a></li>
                                <li><a href="!#">Blog Đơn</a></li>
                                <li><a href="!#">Liên hệ</a></li>
                                <li><a href="!#">404 Trang</a></li>
                                <li><a href="!#">Câu hỏi thường gặp</a></li>
                            </ul>
                        </li> */}
                        <li className="nav-item dropdown dropdown-slide">
                            <a className="nav-link dropdown-toggle" href="!#" id="navbarDropdown3" role="button" data-delay="350"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Link to={{ pathname: "/shop" }}>Cửa hàng</Link>
                            </a>
                            {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                                <li><Link to={{ pathname: "/shop" }}>Cửa hàng</Link></li>
                                <li><Link to={{ pathname: "/checkout" }}>Thủ tục thanh toán</Link></li>
                            </ul> */}
                        </li>
                        <li
                            hidden={idUser != 'Bạn' ? false : true}
                            className="nav-item active">
                            <Link className="nav-link" to={{ pathname: "/history" }}>lịch sử đơn hàng</Link>
                        </li>
                    </ul>
                </div>

                <ul className="top-menu list-inline mb-0 d-none d-lg-block" id="top-menu">
                    <li
                        hidden={idUser != 'Bạn' ? false : true}
                        className="dropdown cart-nav dropdown-slide list-inline-item">
                        <Link to={{ pathname: "/cart" }} className="dropdown-toggle cart-icon" data-toggle="dropdown" data-hover="dropdown">
                            <i className="tf-ion-android-cart">
                            </i>
                            {/* <Link className="btn btn-small btn-transparent btn-block" to={{ pathname: "/cart" }}>
                            </Link> */}

                        </Link>
                    </li>

                    <li className="nav-item dropdown dropdown-slide list-inline-item">
                        <a className="nav-link dropdown-toggle" href="!#" id="navbarDropdown3" role="button" data-delay="350"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="tf-ion-ios-person"></i>
                        </a>

                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">

                            <li
                                hidden={idUser != 'Bạn' ? false : true}
                            ><a type="button" onClick={onLogout}>Đăng xuất</a></li>

                            <li

                                hidden={idUser != 'Bạn' ? false : true}
                            ><a type="button" onClick={handleOpen}>Profile</a></li>
                            <li
                                hidden={idUser == 'Bạn' ? false : true}
                            ><Link to={{ pathname: "/login" }}>Đăng nhập</Link></li>
                            <li
                                hidden={idUser == 'Bạn' ? false : true}
                            ><Link to={{ pathname: "/signup" }}>Đăng ký</Link></li>
                            <li
                                hidden={idUser == 'Bạn' ? false : true}
                            ><Link to={{ pathname: "/forgot-password" }}>Quên mật khẩu</Link></li>
                        </ul>

                    </li>

                    <li className="list-inline-item">Xin chào: {name}</li>
                </ul>
            </div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center">
                                <Box
                                    component="img"
                                    sx={{


                                        maxHeight: { xs: 233, md: 167 },
                                        maxWidth: { xs: 350, md: 250 },
                                    }}
                                    alt="The house from the offer."
                                    src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                />
                            </Grid>
                            {/* <Grid xs={6}>
                                    <Item>xs=6</Item>
                                </Grid> */}
                        </Box>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { marginLeft: 2, m: 1, width: '25ch' },
                            }}
                            // justifyContent={"center"}
                            onSubmit={handleSubmit(handleFormSubmit)}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField

                                id="outlined-read-only-input"
                                variant="outlined"
                                label="phone"
                                value={profile.username}
                            />
                            <TextField
                                required
                                variant="outlined"
                                label="Tên"
                                value={profile.name}
                                {...register('name')}
                                onChange={(e) => {
                                    console.log(profile)
                                    setProfile(prev => ({ ...prev, name: e.target.value }))
                                }}
                            />
                            <TextField
                                variant="outlined"
                                label="email"
                                value={profile.email}
                                {...register('email')} required
                                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}

                            />
                            <TextField
                                variant="outlined"
                                label="phone"
                                value={profile.phone}
                                {...register('phone')} required
                                // onBeforeInput={(e) => (console.log(e.target.value))}
                                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}

                            />
                            <Button
                                type="submit"
                                variant="contained">Lưu</Button>
                        </Box>

                    </Typography>
                </Box>
            </Modal>
        </nav>

    );
}
export default Header;