import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams, } from 'react-router-dom'
import { MainContext } from '../../Main'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../reducers/User";
import { DbTocart } from '../../reducers/Cart';

function Login() {
  const { UserBaseUrl, notify, apiBaseUrl } = useContext(MainContext)
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const Navigate = useNavigate()
  const Dispatcher = useDispatch()
  const [searchParams] = useSearchParams()


  useEffect(
    () => {
      if(user.data != null){
        if(searchParams.get("ref") != null){
          Navigate("/checkout")
        }else{
          Navigate("/")
        }
      }

    },[user]
  )
  const Loginhandler = (e) => {
    e.preventDefault()
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    if (data.email != "" && data.password != "") {
      axios.post(apiBaseUrl + UserBaseUrl + "/login", data)
        .then(
          (success) => {
            if (success.data.status == 1) {
              Dispatcher(login({ user: success.data.user }))
              e.target.reset()
              notify(success.data.msg, success.data.status ? 'success' : 'error')
              axios.post(apiBaseUrl + UserBaseUrl + "/update-user-cart" + "/" + success.data.user._id, { state_user: cart.data })
                .then(
                  (success) => {
                    if(success.data.UserCart.length != 0 ){
                      let total = 0 
                      const newCart = success.data.UserCart.map(
                        (cat) => {
                          total += cat.qty * cat.product_id.discount_Price
                          return {
                            pId:cat.product_id._id,
                            qty: cat.qty,
                          }
                        }
                      )
                      Dispatcher(DbTocart({newCart, total}))
                    }
                  }
                ).catch(
                  (err) => {
                    console.log(err)
                  }
                )
              Navigate("/")

            } else {
              notify(success.data.msg, success.data.status ? 'success' : 'error')
            }
          }
        )
    } else {
      notify("Please fill all fields", "error")
    }

  }


  return (
    <section className="bg-gray-50 dark:bg-zinc-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black"
        >
          <img
            className=""
            src="images/logo.svg"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={Loginhandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black dark:text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to={"/signup"} className="font-medium text-primary-600 hover:underline dark:text-blue-500">
                  Sign up
                </Link>

              </p>
            </form>
          </div>
        </div>
      </div>
    </section>



  )
}

export default Login
