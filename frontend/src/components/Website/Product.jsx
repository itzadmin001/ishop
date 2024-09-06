import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { MainContext } from '../../Main';
import { MdOutlineFavorite } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import {addToCart} from "../../reducers/Cart"
import axios from "axios"

function Product({ data, ProductImgBaseUrl, grid }) {
  const { apiBaseUrl , UserBaseUrl} = useContext(MainContext);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const addToDbcart = (product_id) => {
    if(user.data != null){
      axios.post(apiBaseUrl + UserBaseUrl + "/add-to-cart" , {product_id: product_id, user_id: user.data._id})
      .then(
        (success) => {
          console.log(success)
        }
      ).catch(
      (error) => {
        console.log(error)
      })
    }
  }
  return (
    data.map(
      (item) => {
        return (
          grid ?
            <div className='relative py-4 px-3 rounded-lg gap-5 shadow-lg mt-10 flex flex-col items-center'>
              {/* <div className={`absolute top-0 left-1 px-2 bg-red-500 ${prod.hot ? "opacity-1" : "opacity-0"}`}>hot</div> */}
              <img src={`${apiBaseUrl + ProductImgBaseUrl + item.image}`} alt="" className='lg:w-[13vw] md:w-[16vw] w-[26vw] mt-5 ' />
              <div className='flex  flex-col items-center gap-5'>
                <h1 className='text-xl font-semibold uppercase'>{item.name}</h1>
                <div className='flex item-center justify-center gap-1'>
                  <Stars yellow={4} />
                </div>
                <h3 className='font-semibold'>${item.discount_Price} <span className='text-zinc-500 font-semibold line-through'>${item.price}</span></h3>
                <div className='flex gap-3 text-xl'>
                  <MdOutlineFavorite className='cursor-pointer text-xl' />
                  <IoCart className='cursor-pointer text-xl' onClick={() => {
                    dispatch(addToCart({pId:item._id, price:item.discount_Price}))
                    addToDbcart(item._id)
                  }}/>
                </div>
              </div>
            </div> :
            <div className='relative py-4 px-3 lg:h-[30vh] md:h-[25vh] sm:h-[25] rounded-lg flex items-center justify-center gap-5 shadow-lg mt-10 '>
              {/* <div className={`absolute top-0 left-1 px-2 bg-red-500 ${prod.hot ? "opacity-1" : "opacity-0"}`}>hot</div> */}
              <img src={`${apiBaseUrl + ProductImgBaseUrl + item.image}`} alt="" className='lg:w-[13vw] md:w-[16vw] w-[26vw] mt-5 ' />
              <div className='flex  flex-col items-center gap-5'>
                <h1 className='text-xl font-semibold uppercase'>{item.name}</h1>
                <div className='flex item-center justify-center gap-1'>
                  <Stars yellow={4} />
                </div>
                <h3 className='font-semibold'>${item.price} <span className='text-zinc-500 font-semibold line-through'>${item.discount_Price}</span></h3>
                <div className='flex gap-3 text-xl'>
                  <MdOutlineFavorite className='cursor-pointer text-xl' />
                  <IoCart className='cursor-pointer text-xl' />
                </div>
              </div>

            </div>
        )
      })
  )
}
export const Stars = ({ yellow }) => {
  let YellowStar = [];
  for (var i = 1; i <= yellow; i++) {
    YellowStar.push(<FaStar className='text-yellow-200' />)
  }
  let WhiteStar = [];
  for (var j = 1; j <= 5 - yellow; j++) {
    WhiteStar.push(<FaRegStar className='text-yellow-200' />)
  }
  return (
    <>
      {YellowStar}
      {WhiteStar}
    </>
  )
}



export default Product

