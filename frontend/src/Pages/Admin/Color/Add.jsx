import React, { useContext, useState } from 'react'
import Card from '../../../components/Admin/Card'
import Bradcrumbs from "../../../components/Admin/Bradcrumbs"
import { MainContext } from '../../../Main';
import axios from "axios";
import { Link,  } from 'react-router-dom';
import LoadingButton from '../../../components/Admin/LoadingButton';

function Add() {
  const { apiBaseUrl, ColorBaseUrl, notify } = useContext(MainContext);
  const [Loading, SetLoading] = useState(false)
  
  const Bradcrumb = [
    {
      name: "Color",
      path: "/admin/color/view"
    },
    {
      name: "Add",
      path: "/admin/color/add"
    }
  ]
  const fromSubmitHandler = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const color = e.target.color.value;
    if (name != " " && color != "") {
      console.log(apiBaseUrl + ColorBaseUrl + "/create", { name: name, color: color })
      axios.post(apiBaseUrl + ColorBaseUrl + "/create", { name: name, color: color })
        .then((success) => {
          if (success.data.status === 1) {
            notify(success.data.msg, success.data.status ? "success" : "error");
            e.target.reset();
            SetLoading(false);
          } else {
            notify("error");
          }

        }).catch((error) => {
          notify("Internal server error", "error");

        })
    } else {
      SetLoading(false)
      notify("All fields are required");

    }


  }
  return (
    <Card>
      <Bradcrumbs Bradcrumb={Bradcrumb} />
      <div className="w-full max-w-full p-4 mt-5 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={fromSubmitHandler} encType='multipart/form-data'>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="name"
              name="name"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter Color Name"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Color
            </label>
            <input
              type="color"
              name="color"
              readOnly
              className="w-[8vw]"
              required=""
            />
          </div>
          <LoadingButton Loading={Loading} SetLoading={SetLoading} name={"Save"} />

        </form>
      </div>


    </Card>
  )
}

export default Add
