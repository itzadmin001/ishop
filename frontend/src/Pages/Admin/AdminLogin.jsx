import axios from 'axios'
import React, { useContext } from 'react'
import { MainContext } from '../../Main';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const { apiBaseUrl, notify } = useContext(MainContext);
const Navigate = useNavigate()




    const AdminLoginHandler = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if(email === "admin@ishop.com" && password !== ""){
                axios.post(apiBaseUrl + "/admin/login",{email: email, password: password}, {
                    withCredentials: true
                  })
                .then(
                    (success) => {
                        if(success.data.status === 1){
                            Navigate("/admin")
                        }else{
                            notify(success.data.msg, "error")
                            Navigate("/admin/login");
                        }
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                    }
                )

        }else{
            notify("Please enter correct email and password", "error")
        }
    }







  return (
    <section className="bg-white dark:bg-gray-200">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-3xl font-semibold text-red-400 dark:text-red"
      >
        ishop
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black">
           Login Admin
          </h1>
          <form className="space-y-4 md:space-y-6" action="#" onSubmit={AdminLoginHandler}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black dark:text-zinc-600"
              >
                 Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-zinc-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-black dark:text-zinc-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  
  )
}

export default AdminLogin
