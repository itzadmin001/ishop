import React, { useContext, useEffect, useState } from 'react'
import Card from '../../../components/Admin/Card'
import Bradcrumbs from '../../../components/Admin/Bradcrumbs'
import { Link } from 'react-router-dom';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { MainContext } from '../../../Main';
import axios from 'axios';

function View() {
  const { fetchProduct, apiBaseUrl,ProductBaseUrl, notify } = useContext(MainContext);
  const [product, SetProduct] = useState([]);
  const [imagBase, SetimgBase] = useState([])
  const Bradcrumb = [
    {
      name: "Product",
      path: "/admin/product/view"
    },
    {
      name: "View",
      path: "/admin/product/View"
    }
  ]
  const getCategory = () => {
    fetchProduct()
      .then((success) => {
        SetProduct(success.data)
        SetimgBase(success.imgBaseUrl)
      }).catch((err) => {
        SetProduct([])
      })

  }
  useEffect(
    () => {
      getCategory()
    }, [])

  const delDeta = (cId, imageName) => {
    axios.delete(apiBaseUrl + ProductBaseUrl  + "/delete" + "/" + cId + "/" + imageName, {
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
    axios.patch(apiBaseUrl + ProductBaseUrl + "/change-status/" + id + "/" + status, {
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
              Category name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
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
            product.map((Prod, i) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="col"
                    className="px-6 py-3"
                  > {i + 1}</th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {
                      Prod.name
                    }
                  </th>
                  <td className="px-6 py-4">{Prod.slug}</td>
                  <td className="px-6 py-4 ">
                    <img src={`${apiBaseUrl + imagBase + Prod.image}`} width={70} alt="" />
                  </td>
                  <td className="px-6 py-4">{
                    Prod.category.name
                  }</td>
                  <td className="px-6 py-4">{
                    Prod.color.map((col) => {
                      return (
                        <li>{col.name}</li>
                      )
                    })
                  }</td>
                  <td className="px-6 py-4">
                    {
                      Prod.status
                        ?
                        <span className="inline-block px-3 py-1 text-xs font-semibold cursor-pointer bg-green-400 rounded-full text-white" onClick={() => { changeStatus(Prod._id, false) }}>Active</span>
                        :
                        <span className="inline-block px-3 py-1 text-xs font-semibold cursor-pointer bg-red-400 rounded-full text-white" onClick={() => { changeStatus(Prod._id, true) }}>Inactive</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-xl flex gap-4 mt-2">
                    <MdDeleteOutline className='cursor-pointer hover:text-blue-200' onClick={() => delDeta(Prod._id, Prod.image)} />
                    <Link to={"/admin/product/edit/" + Prod._id}>
                      <MdOutlineEdit className='cursor-pointer hover:text-blue-200' />
                    </Link>
                  </td>
                </tr>

              )
            })
          }

        </tbody>
      </table>


    </Card>
  )
}

export default View
