import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from '../../../components/Admin/Card'
import Bradcrumbs from "../../../components/Admin/Bradcrumbs"
import { MainContext } from '../../../Main';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '../../../components/Admin/LoadingButton';

function Edit() {
  const Navigate = useNavigate()
  const { id } = useParams()
  const [UpdateData, SetUpdateData] = useState(null)
  const { apiBaseUrl, ColorBaseUrl, notify, fetchColor} = useContext(MainContext);
  const [Loading , SetLoading] = useState(false)

   useEffect(() => {
    fetchColor(id)
     .then((success) => {
      if(success.status === 1) {
        SetUpdateData(success.data)
      }else{
        SetUpdateData(null)
      }
    }).catch((err) => {
        console.log(err)
      })
  }, [id])
  const titleref = useRef();
  const Slugref = useRef();
  const Bradcrumb = [
    {
      name: "Color",
      path: "/admin/color/view"
    },
    {
      name: "Edit",
      path: "/admin/color/edit"
    }
  ]
  const fromSubmitHandler = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const color = e.target.color.value;
    if (name != " " && color != "") {
      axios.put(apiBaseUrl + ColorBaseUrl + "/update/" + id, {name:name, color:color} )
        .then((success) => {
          if (success.data.status === 1) {
            notify(success.data.msg, success.data.status ? "success" : "error");
            e.target.reset();
            Navigate("/admin/color/view");
          } else {
            notify("error");
          }

        }).catch((error) => {
          console.error(error)
          notify("Internal server error", "error");

        })
    } else {

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
              placeholder="Enter name"
              required=""
              value={UpdateData?.name}
              onChange={(e) => {
                SetUpdateData({
                  ...UpdateData,
                name : e.target.value
                })
              }}
              ref={titleref}
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
              style={{backgroundColor: UpdateData?.color}}
              onChange={(e) => {
                SetUpdateData({
                  ...UpdateData,
                color : e.target.value
                })
              }}
              className='w-[12vw] py-3'
            />
          </div>
         <LoadingButton Loading={Loading} SetLoading={SetLoading} name={"Update"}/>
        </form>
      </div>


    </Card>
  )
}

export default Edit;
