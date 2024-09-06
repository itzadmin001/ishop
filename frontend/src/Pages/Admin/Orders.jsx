import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from '../../components/Admin/Card'
import Bradcrumbs from '../../components/Admin/Bradcrumbs'
import axios from 'axios';
import { MainContext } from '../../Main';
import { useNavigate } from 'react-router-dom';

const Bradcrumb = [
    {
        name: "Orders",
        path: "/admin/Orders"
    }
]

function Orders() {
    const { apiBaseUrl, OrderBaseUrl, notify } = useContext(MainContext);
    const [order, SetOrder] = useState([])
    const Navigate = useNavigate()




    useEffect(
        () => {
            axios.get(apiBaseUrl + OrderBaseUrl + "/get-order", {
                withCredentials: true
              })
                .then(
                    (success) => {
                        if(success.data.status === 1) {
                            console.log(success.data.Orderdata)
                            SetOrder(success.data.Orderdata)
                        }else{
                            notify(success.data.msg, "error")
                            Navigate("/admin/login")

                        }
                    }
                ).catch(
                    (error) => {
                        notify("Failed to fetch orders", "error")
                    }
                )

        }, []
    )











    return (
        <Card>
            <div className='p-2'>
                <input type="date" className=' cursor-pointer'/>
                <input type="date" className=' cursor-pointer'/>
            </div>
            <Bradcrumbs Bradcrumb={Bradcrumb} />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-800">
                    <thead className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Shipping Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map((Od, i) => {
                                return (
                                    <TableRow Od={Od} key={i} index={i} />
                                    
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </Card>
    )
}

const TableRow = ({ Od, index, i }) => {
    const [orderStatus, SetorderStatus] = useState(Od.order_status)


    const OrderStatusChange = (new_status) => {
        SetorderStatus(new_status)
    }

    return (
        <tr className="bg-white border-b dark:bg-gray4200 dark:border-gray-400">
            <th
                scope="col"
                className="px-6 py-3"
            > {index + 1}</th>
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
            >
                {
                    Od.product_details.map(
                        (detail, i) => {
                            return (
                                <div key={i}>
                                    <div className=' py-2'> <b>{i + 1} ) </b>
                                        Name: {detail.name}
                                    </div>
                                    <div className='py-2'>
                                        Price: {detail.price}
                                    </div>
                                    <div className='py-2'>
                                        qty:  {detail.qty}
                                        </div>
                                </div>
                            )
                        }
                    )
                }
            </th>
            <td className="px-6 py-4">
                <div>
                    Name : {Od.shipping_details.name}
                </div>
                <div>
                    Email : {Od.shipping_details.email}
                </div>
                <div>
                    Contact : {Od.shipping_details.contact}
                </div>
                <div>
                    Address : {Od.shipping_details.address}
                </div>

            </td>
            <td className="px-6 py-4">
                    <select name="" value={orderStatus} onChange={(e) => OrderStatusChange(e.target.value)} id="" className='dark:bg-gray-200  p-2'>
                        <option value="1">Payment pending</option>
                        <option value="2">Payment done</option>
                        <option value="3">Shipped</option>
                        <option value="4">Delivered</option>
                        <option value="5">Cancelled</option>
                        <option value="6">Return </option>
                    </select>
                </td>
            <td className="px-6 py-4 ">
                {new Date(Od.createdAt).toLocaleDateString()}
                <br />
                {new Date(Od.createdAt).toLocaleTimeString()}
                <hr />
                {new Date(Od.updatedAt).toLocaleDateString()}
                <br />
                {new Date(Od.updatedAt).toLocaleTimeString()}
            </td>
            <td className="px-6 py-4 ">
                
            </td>


        </tr>
    )
}

export default Orders
