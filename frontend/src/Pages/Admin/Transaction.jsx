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
    const { apiBaseUrl, OrderBaseUrl,TransactionBaseUrl, notify } = useContext(MainContext);
    const [Transaction , SetTransaction] = useState([])
    const Navigate = useNavigate()




    useEffect(
        () => {
            axios.get(apiBaseUrl + TransactionBaseUrl + "/get-transaction", {
                withCredentials: true
              })
                .then(
                    (success) => {
                        if(success.data.status === 1) {
                            console.log(success.data.data)
                            SetTransaction(success.data.data)
                        }else{
                            notify(success.data.msg, "error")
                            Navigate("/admin")

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
                                Product Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                               Razorpay order id
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
                            Transaction.map((trans, i) => {
                                return (
                                    <TableRow trans={trans} key={i} index={i} />
                                    
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </Card>
    )
}

const TableRow = ({ trans, index, i }) => {
  console.log(trans)

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
               <div>
                    amount : {trans.amount}
                </div>
            </th>
            <td className="px-6 py-4">
                <div>
                    Order_id : {trans.order_id}
                </div>
               
                <div>
                    razorpay_order_id : {trans.razorpay_order_id}
                </div>
                <div>
                    razorpay_payment_id : {trans.razorpay_payment_id}
                </div>

            </td>
            <td className="px-6 py-4 ">
                {new Date(trans.createdAt).toLocaleDateString()}
                <br />
                {new Date(trans.createdAt).toLocaleTimeString()}
                <hr />
                {new Date(trans.updatedAt).toLocaleDateString()}
                <br />
                {new Date(trans.updatedAt).toLocaleTimeString()}
            </td>
            <td className="px-6 py-4 ">
                
            </td>


        </tr>
    )
}

export default Orders
