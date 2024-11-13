import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/Website/Container'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MainContext } from '../../Main';

function OrderSummary() {
    const { OrderBaseUrl, apiBaseUrl } = useContext(MainContext);
    const { order_id } = useParams()
    const [order, setOrder] = useState([])
    const [imgBaseUrl , SetimgBaseUrl ] = useState(null)
    const Navigate = useNavigate()

    useEffect(
        () => {
            axios.get(apiBaseUrl + OrderBaseUrl + "/get-order/" + order_id)
                .then(
                    (success) => {
                        console.log(success)
                        if (success.data.status == 1) {
                            setOrder(success.data.data);
                            SetimgBaseUrl(success.data.imgBaseUrl)
                            
                        } else {
                            console.log(success.data.msg)
                        }
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                    }
                )
        }, []
    )


    return (
        <Container classes="mt-10 min-h-screen">
            <div className=" flex flex-col justify-center items-center bg-gray-100">
                <div className="bg-white p-10 rounded-lg shadow-md text-center w-full">
                    <div className="flex justify-center items-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mt-4">Thank you for your purchase</h2>
                    <p className="mt-2 text-gray-600">
                        We've received your order. It will ship in 5-7 business days.
                    </p>
                    <p className="font-semibold mt-2">Your order number is <span className="font-bold">#B6CT3</span></p>

                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg">Order Summary</h3>
                        {
                            order.product_details?.map(
                                (prod) => {
                                    return (
                                        <div className="flex justify-between items-center mt-4">
                                            <img
                                                src={apiBaseUrl+imgBaseUrl + prod.image}
                                                alt="Product"
                                                className="w-15 h-10 rounded"
                                            />
                                            <div className="flex-1 ml-4 text-left">
                                                <p>{prod.name}</p>
                                            </div>
                                            <p className="font-semibold">${prod.price}</p>
                                        </div>
                                    )
                                }
                            )
                        }

                        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">{order.order_total}</span>
                        </div>
                    </div>

                    <button
                        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        onClick={() => Navigate("/")}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </Container>

    )
}

export default OrderSummary