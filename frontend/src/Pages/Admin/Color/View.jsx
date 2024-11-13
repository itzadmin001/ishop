import React, { useContext, useEffect, useState } from 'react'
import Card from '../../../components/Admin/Card'
import Bradcrumbs from '../../../components/Admin/Bradcrumbs'
import { MainContext } from '../../../Main'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios"
import { Link } from 'react-router-dom';

function View() {
  const { fetchColor, apiBaseUrl, ColorBaseUrl, notify } = useContext(MainContext);
  const [Color, SetColor] = useState([]);

  const getColor = () => {
    fetchColor()
      .then((success) => {
        SetColor(success.data)
      }).catch((err) => {
        SetColor([])
      })
  }
  useEffect(
    () => {
      getColor()
    }, [])
  const Bradcrumb = [
    {
      name: "Color",
      path: "/admin/color/view"
    },
    {
      name: "View",
      path: "/admin/color/View"
    }
  ]
  const delDeta = (cId) => {
    axios.delete(apiBaseUrl + ColorBaseUrl + "/delete" + "/" + cId)
      .then((success) => {
        if (success.data.status === 1) {
          notify(success.data.msg, success.status ? "success" : "error")
          getColor()
        } else {
          notify(success.data.msg, "error")
        }
      }).catch((err) => {
        notify("internal server error", "error")
      })
  }
  const changeStatus = (id, status) => {
    axios.patch(apiBaseUrl + ColorBaseUrl + "/change-status/" + id + "/" + status,)
      .then((success) => {
        if (success.data.status === 1) {
          notify(success.data.msg, success.status ? "success" : "error")
          getColor()
        } else {
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
                Name
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
              Color.map((col, i) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {
                        col.name
                      }
                    </th>
                    <td className="px-5 py-4">
                      <div className='py-4 px-4 ' style={{backgroundColor:col.color}}></div></td>
                    <td className="px-6 py-4">
                      {
                        col.status
                          ?
                          <span className="inline-block px-3 py-1 text-xs font-semibold cursor-pointer bg-green-400 rounded-full text-white" onClick={() => { changeStatus(col._id, false) }}>Active</span>
                          :
                          <span className="inline-block px-3 py-1 text-xs font-semibold cursor-pointer bg-red-400 rounded-full text-white" onClick={() => { changeStatus(col._id, true) }}>Inactive</span>


                      }
                    </td>
                    <td className="px-6 py-4 text-xl flex gap-4 mt-2">
                      <MdDeleteOutline className='cursor-pointer hover:text-blue-200' onClick={() => delDeta(col._id)} />
                      <Link to={"/admin/color/edit/" + col._id}>
                        <MdOutlineEdit className='cursor-pointer hover:text-blue-200' />
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
