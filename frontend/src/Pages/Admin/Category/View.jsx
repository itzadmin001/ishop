import React, { useContext, useEffect, useState } from 'react'
import Card from '../../../components/Admin/Card'
import Bradcrumbs from '../../../components/Admin/Bradcrumbs'
import { MainContext } from '../../../Main'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios"
import { Link } from 'react-router-dom';

function View() {
  const { fetchCategory, apiBaseUrl, CategoryBaseUrl, notify } = useContext(MainContext);
  const [Category, SetCategory] = useState([]);
  const [imgeUrl, SetimgUrl] = useState("")

  const getCategory = () => {
    fetchCategory()
      .then((success) => {
        SetCategory(success.data)
        SetimgUrl(success.imgBaseUrl)
      }).catch((err) => {
        SetCategory([])
      })
  }
  useEffect(
    () => {
      getCategory()
    }, [])
  const Bradcrumb = [
    {
      name: "Category",
      path: "/admin/category/view"
    },
    {
      name: "View",
      path: "/admin/category/View"
    }
  ]
  const delDeta = (cId, imageName) => {
    axios.delete(apiBaseUrl + CategoryBaseUrl + "/delete" + "/" + cId + "/" + imageName ,{
      withCredentials: true
    })
      .then((success) => {
        if (success.data.status === 1) {
          notify(success.data.msg, success.status ? "success" : "error")
          getCategory()
        } else {
          notify(success.data.msg, "error")
        }
      }).catch((err) => {
        notify("internal server error", "error")
      })
  }
  const changeStatus = (id , status) => {
    axios.patch(apiBaseUrl + CategoryBaseUrl + "/change-status/" + id + "/" + status, {
      withCredentials: true
    })
    .then((success) => {
      if(success.data.status === 1){
        notify(success.data.msg, success.status? "success" : "error")
        getCategory()
      }else{
        notify(success.data.msg, "error")
      }
    })
  }
  return (
    <Card>
      <Bradcrumbs Bradcrumb={Bradcrumb} />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                Sr
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Category.map((cat, i) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="col"
                      className="px-6 py-3"
                    > {i+1}</th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {
                        cat.name
                      }
                    </th>
                    <td className="px-6 py-4">{cat.slug}</td>
                    <td className="px-6 py-4 ">
                    <img src={`${apiBaseUrl + imgeUrl + cat.image}`} width={70} alt="" />
                    </td>
                    <td className="px-6 py-4">
                      {
                        cat.status
                         ?
                          <span className="inline-block px-3 py-1 text-xs font-semibold cursor-pointer bg-green-400 rounded-full text-white" onClick={() => { changeStatus(cat._id , false) } }>Active</span>
                          :
                          <span className="inline-block px-3 py-1 text-xs font-semibold cursor-pointer bg-red-400 rounded-full text-white" onClick={() => { changeStatus(cat._id , true) } }>Inactive</span>

  
                      }
                    </td>
                    <td className="px-6 py-4 text-xl flex gap-4 mt-2">
                      <MdDeleteOutline className='cursor-pointer hover:text-blue-200' onClick={() => delDeta(cat._id, cat.image)} />
                        <Link to={"/admin/category/edit/"+cat._id}>
                      <MdOutlineEdit className='cursor-pointer hover:text-blue-200'/>
                        </Link>
                    </td>
                  </tr>

                )
              })
            }

          </tbody>
        </table>
      </div>

    </Card>
  )
}

export default View
