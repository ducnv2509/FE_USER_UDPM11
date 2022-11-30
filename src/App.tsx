import './App.css';
import { useRoutes } from 'react-router-dom';
import React from 'react';

import HomePageUser from "./user/components/HomePage";
import Checkout from "./user/components/Checkout";
import Login from "./user/components/Login";
import SignUp from "./user/components/Signup";
import ForgotPassword from "./user/components/ForgotPassword";
import Cart from "./user/components/Cart";
import Home from "./user/components/Home";
import Shop from "./user/components/Shop";
import SignleProduct from "./user/components/SignleProduct";
import { useAuthStore } from './hooks/zustand/auth';
import OrderHistory from './user/components/OrderHistory';
import PageCheckout from './user/components/checkout/PageCheckout';


const App: React.FC = () => {
  // const dispatch = useDispatch();
  // dispatch(
  //     setUserStore({
  //       token: localStorage.getItem('token') || ''
  //     })
  // );
  const role = useAuthStore((state) => state.role)
  let routes: any;
  console.log(role);
  switch (role) {
    case 'user':
      routes = [
        {
          path: "/",
          element: <HomePageUser />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "home-user",
              element: <Home />,
            },
            {
              path: "shop",
              element: <Shop />,
            },
            {
              path: "checkout",
              element: <Checkout />,
            },
            {
              path: "signup",
              element: <SignUp />,
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />,
            },
            {
              path: "cart",
              element: <Cart />,
            },
            {
              path: "history",
              element: <OrderHistory />,
            },
            {
              path: "single-product/:id",
              element: <SignleProduct />,
            },
            {
              path: "page-checkout",
              element: <PageCheckout />,
            },
          ],
        }]
      break;
    case 'anonymous':
      routes = [
        {
          path: "/",
          element: <HomePageUser />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "home-user",
              element: <Home />,
            },
            {
              path: "shop",
              element: <Shop />,
            },
            {
              path: "single-product/:id",
              element: <SignleProduct />,
            }
          ]
        },
        {
          path: "login",
          element: <Login />,

        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ]
      break;
  }
  return useRoutes(routes)
};

export default App;

