import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/Website/Container'
import { MainContext } from '../../Main'
import { useSelector, useDispatch } from 'react-redux';
import { Changeqty ,empptyCart } from "../../reducers/Cart"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useRazorpay from "react-razorpay";


function CheckOut() {
    const [Razorpay] = useRazorpay();
    const { fetchProduct,OrderBaseUrl, apiBaseUrl,notify, UserBaseUrl  } = useContext(MainContext);
    const [product, setProduct] = useState([]);
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const [userDetail, SetuserDetail] = useState(null)
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(
        () => {
            fetchProduct()
                .then(
                    (success) => {
                        if (success.status == 1) {
                            setProduct(success.data);
                        } else {
                            setProduct([])
                        }
                    }
                ).catch((error) => {
                    console.log(error)
                })
        }, [])
        useEffect(
            () => {
                if(user.data != null){
                    SetuserDetail({
                        name: user.data?.name,
                        email: user.data?.email,
                        contact: user.data?.phone,
                        address: user.data?.address,
                        paymentMode:2
                    })
                }
            },[user]
        )
    const DbcartUpdate = (pId, qty) => {
        if (user.data != null) {
            console.log(apiBaseUrl + UserBaseUrl + "/change-qty/" + user.data._id + "/" + pId + "/" + qty);

            axios.get(apiBaseUrl + UserBaseUrl + "/change-qty/" + user.data._id + "/" + pId + "/" + qty)
                .then(
                    (success) => {
                        if (success.data.status == 1) {

                        } else {
                            console.log(success.data.msg)
                        }
                    }
                )
        }
    }

    let Setitem = []

    for (const p of product) {
        const Found = cart.data.find(i => i.pId === p._id)
        if (Found) {
            Setitem.push(

                <tr className="bg-white border-b" key={p._id}>
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                    >
                        {p.name}
                    </th>
                    <td className="px-6 py-4 text-black">${p.discount_Price}</td>

                    <td className="px-6 py-4 text-black flex items-center gap-2">
                        <button className=' p-2 shadow ' onClick={() => {
                            dispatch(Changeqty({ pId: p._id, flag: 0, price: p.discount_Price }))
                            DbcartUpdate(p._id, Found.qty - 1)
                        }}>-</button>
                        <div className='border w-[20%] text-center' >{Found.qty}</div>
                        <button className=' p-2 shadow ' onClick={() => {
                            dispatch(Changeqty({ pId: p._id, flag: 1, price: p.discount_Price }))
                            DbcartUpdate(p._id, Found.qty + 1)
                        }}>+</button>
                    </td>

                    <td className="px-6 py-4 text-black">{parseInt(p.discount_Price * Found.qty)}</td>
                </tr>

            )
        }
    }

    const hanlderSubmit = (e) => {
        e.preventDefault()

        const order_total = cart.total + ( userDetail.paymentMode === 1 ? 12 : 0);
        
        const product_detail = [];
        for (const p of product) {
            const Found = cart.data.find(i => i.pId === p._id)
            if (Found) {
                product_detail.push({
                    price: p.discount_Price,
                    name:p.name,
                    slug:p.slug,
                    image:p.image,
                    ...Found
                })
            }
            
        }
        const data = {
            user_details: userDetail,
            product_detail,
            order_total,
            user_id : user.data._id

        }
        axios.post(apiBaseUrl + OrderBaseUrl + "/create-order" ,  data)
        .then(
            (success) => {
                if(success.data.status === 1 ){
                    if(userDetail.paymentMode === 1){
                        Navigate(`/order-summary/${success.data.order_id}`)
                        dispatch(empptyCart())
                    }else{
                        RazorpayPaymentPopUp(success.data.order_id , success.data.RozarpayOrder, )
                    }
                }else{
                    
                }
            }
        )
      }




  const RazorpayPaymentPopUp = (order_id, RozarpayOrder  ) =>{
    const options = {
        key: 'rzp_test_4BD1Vo8NcmQipy', // Enter the Key ID generated from the Dashboard
        amount: RozarpayOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Ishop",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: RozarpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (response) {
         axios.post(apiBaseUrl + OrderBaseUrl + "/razorpay-payment-handle" ,{amount:RozarpayOrder.amount, razorpay_response:response ,order_id})
            .then(
                (success) => {
                    notify(success.data.msg, success.data.status === 1 ? 'success' : 'error')
                    Navigate(`/order-summary/${success.data.order_id}`)
                    dispatch(empptyCart())
                }
            ).catch(
                (error) => {
                    console.log("error",error);
                }
            )
        //   alert(response.razorpay_payment_id);
        //   alert(response.razorpay_order_id);
        //   alert(response.razorpay_signature);
        },
        prefill: {
          name: userDetail.name,
          email: userDetail.email,
          contact: userDetail.contact,
        },
        theme: {
          color: "#3399cc",
        },
      };
    
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed", function (response) {
        axios.post(apiBaseUrl + OrderBaseUrl + "/razorpay-payment-handle" ,{amount:RozarpayOrder.amount, razorpay_response:response.error.metadata ,order_id})
            .then(
                (success) => {
                    console.log(success);
                    notify(success.data.msg, success.data.status === 1 ? 'success' : 'error')
                    Navigate(`/checkout`)
                    dispatch(empptyCart())
                }
            ).catch(
                (error) => {
                    
                    console.log("error",error);
                }
            )

        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
      });
    
      rzp1.open();
  }    






      
 return (
        <Container>
            <div className='grid grid-cols-2'>
                <div className="relative overflow-x-auto mt-10">
                    <table className="w-full text-sm text-left rtl:text-right text-black bg-white">
                        <thead className="text-xs text-black uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Setitem}
                        </tbody>
                    </table>

                </div>
                <div className=' p-4'>
                    <form onSubmit={hanlderSubmit} action='#'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                value={userDetail?.name}
                                onChange={(e) =>SetuserDetail({
                                     ...userDetail,
                                    name:e.target.value
                                })}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                required
                                value={userDetail?.email}
                                onChange={(e) => SetuserDetail({
                                     ...userDetail,
                                    email:e.target.value
                                })}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                Address
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="address"
                                required
                                value={
                                    userDetail?.address
                                }
                                onChange={(e) => SetuserDetail({
                                     ...userDetail,
                                    address:e.target.value
                                })}
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                                Contact
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="contact"
                                type="text"
                                required
                                value={userDetail?.contact}
                                onChange={(e) => SetuserDetail({
                                    ...userDetail,
                                    contact:e.target.value
                                })}
                                placeholder="Enter your contact number"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">
                                Pincode
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="pincode"
                                type="text"
                                placeholder="Enter your pincode"
                            />
                        </div>
                           <div >
                           COD ($ 12 extra) <input type="checkbox"  className=' cursor-pointer  ' onClick={() => SetuserDetail({...userDetail, paymentMode : 1})}  checked={userDetail?.paymentMode == 1 ? true : false} value={1}/>  <br />
                           Rozarpay (No extra cost) <input type="checkbox"  className=' cursor-pointer  ' onClick={() => SetuserDetail({...userDetail, paymentMode : 2})} checked={userDetail?.paymentMode == 2 ? true : false} value={2}/>  <br />
                           </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                            type="submit"
                        >
                           Proceed
                        </button>
                    </form>
                </div>

            </div>
        </Container>
    )
}

export default CheckOut;
