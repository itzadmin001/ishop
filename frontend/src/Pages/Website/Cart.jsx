import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/Website/Container'
import { MainContext } from '../../Main'
import { useDispatch, useSelector } from 'react-redux';
import { Changeqty } from "../../reducers/Cart"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { fetchProduct, apiBaseUrl, UserBaseUrl,notify } = useContext(MainContext);
  const [product, setProduct] = useState([])
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const Navigate = useNavigate()

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


  const DbcartUpdate = (pId, qty) => {
    if (user.data != null) {

      axios.get(apiBaseUrl + UserBaseUrl + "/change-qty/" + user.data._id + "/" + pId + "/" + qty)
        .then(
          (success) => {
            if (success.data.status == 1) {
            } else {
              notify(success.data.msg, "error")
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

        <tr className="bg-white border-b">
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
    } else {

    }
  }

  const  checkOutHandler = (e) => {
        e.preventDefault()
        if(user.data  == null){
          Navigate("/login?ref=checkout")
        }else{
          Navigate("/checkout")

        }

  }
  return (
    <Container>
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
      <div id="summary" className="w-1/4 px-8 py-10 bg-white shadow-lg rounded-lg ">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="border-t mt-8 pt-6">
          <div className="flex font-semibold justify-between text-sm uppercase">
            <span>Total cost</span>
            <span>${cart.total}</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase rounded-md w-full mt-4" onClick={(e) => checkOutHandler(e)}>
            Checkout
          </button>
        </div>
      </div>

    </Container>

  )
}

export default Cart
