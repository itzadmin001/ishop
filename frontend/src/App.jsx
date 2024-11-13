import React, { useEffect } from 'react'
import { createBrowserRouter ,RouterProvider, useLocation } from 'react-router-dom'
import WebsiteMain from "./Pages/Website/Main"
import Home from "./Pages/Website/Home"
import Store from "./Pages/Website/Store"
import Cart from "./Pages/Website/Cart"
import AdminMain from "./Pages/Admin/Main"
import Dashboard from './Pages/Admin/Dashboard'
import CategoryAdd from "./Pages/Admin/Category/Add"
import CategoryView from "./Pages/Admin/Category/View"
import CategoryEdit from "./Pages/Admin/Category/Edit"

import ProductAdd from "./Pages/Admin/Product/Add"
import ProductView from "./Pages/Admin/Product/View"

import ColorAdd from "./Pages/Admin/Color/Add"
import ColorView from "./Pages/Admin/Color/View"
import ColorEdit from "./Pages/Admin/Color/Edit"
import { useDispatch } from 'react-redux'
import {lsToCart} from "./reducers/Cart"
import {lsToState} from "./reducers/User"
import Login from './Pages/Website/Login'
import Signup from './Pages/Website/Signup'
import CheckOut from './Pages/Website/CheckOut'
import OrderSummary from './Pages/Website/OrderSummary'
import Transaction from './Pages/Admin/Transaction'
import Orders from './Pages/Admin/Orders'
import AdminLogin from './Pages/Admin/AdminLogin'
import ErrorPage from './components/Website/ErrorPage'
function App() {
  

  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(lsToCart())
      dispatch(lsToState())
  },[])


    const router = createBrowserRouter(
      [
        {
          path: '/',
          element: <WebsiteMain/>,
          children:[
            {
              path:"",
              element : <Home/>
            },
            {
              path:"store/:category_slug?",
              element: <Store/>
            },
            {
              path:"cart",
              element:<Cart/>
            },
            {
              path:"checkout",
              element:<CheckOut/>
            },
            {
              path:"order-summary/:order_id",
              element:<OrderSummary/>
            }
          ]
        },
        {
          path:"/admin",
          element: <AdminMain/>,
          children:[
            {
              path:"",
              element:<Dashboard/>
            },
            {
              path:"transactions",
              element:<Transaction/>
            },
             {
              path:"order",
              element:<Orders/>
            },
            {
              path:"category",
              children:[
                {

                  path:"/admin/category/add",
                  element : <CategoryAdd/>
                },
                {
                  path:"/admin/category/view",
                  element: <CategoryView/>
                },
                {
                  path:"/admin/category/edit/:id",
                  element:<CategoryEdit/>
                }
              ]
            },
            {
              path:"product",
              children:[
                {

                  path:"/admin/product/add",
                  element : <ProductAdd/>
                },
                {
                  path:"/admin/product/view",
                  element: <ProductView/>
                }
              ]
            },
            {
              path:"color",
              children:[
                {

                  path:"/admin/color/add",
                  element : <ColorAdd/>
                },
                {
                  path:"/admin/color/view",
                  element: <ColorView/>
                },
                {
                  path:"/admin/color/edit/:id",
                  element:<ColorEdit/>
                }
              ]
            }
          ]
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
            path:"/admin/login",
            element:<AdminLogin/>
          
        },
        {
          path:"*",
          element:<ErrorPage/>
        }
      ]
    )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
