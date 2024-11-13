import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MainContext } from '../../Main'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../reducers/User";

function Signup() {
  const { UserBaseUrl, notify, apiBaseUrl } = useContext(MainContext)
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)

  const Navigate = useNavigate()
  const Dispatcher = useDispatch()


  useEffect(
    () => {
      if(user.data != null){
        Navigate("/")
      }

    },[user]
  )
  const SignupHandler = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const confirm_Password = e.target.confirm_Password.value

    if (name != "" && email != "" && password != "" && confirm_Password != "") {
      if (password == confirm_Password) {
        axios.post(apiBaseUrl + UserBaseUrl + "/" + "create-account", { name, email, password, confirm_Password }, {
          withCredentials: true
        })
          .then(
            (success) => {
              if (success.data.status === 1) {
                console.log(success.data.CreateUser)
                Dispatcher(login({ user: success.data.CreateUser }));
                notify(`Hi , welcome ${success.data.CreateUser.name} `, "success")
                e.target.reset()
                axios.post(apiBaseUrl + UserBaseUrl + "/update-user-cart" + "/" + success.data.CreateUser._id, { state_user: cart.data })
                .then(
                  (Success) => {

                  }
                ).catch(
                  (err) => {

                  }
                )
                Navigate("/")
              } else {
                notify(success.data.msg, "error")
              }
            }
          ).catch(
            (error) => {
              console.log(error)
            }
          )
      } else {
        notify("Password and confirm password should be same", "error")
      }
    } else {
      notify("all Fields should be required", "error")
    }

  }

  return (
    <section className="bg-gray-50 dark:bg-gray-200">
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
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-700">
          <div className="p-4 space-y-4 md:space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-4" action="#" onSubmit={SignupHandler} >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder='Name here'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Email@emagil.com'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm_Password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-blue-500 hover:underline dark:text-blue-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to={"/login"}
                  className="font-medium text-blue-500 hover:underline dark:text-blue-500">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>



  )
}

export default Signup
