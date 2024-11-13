import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Container from "./Container"
import { FaCaretDown } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoIosBasket } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import {logout} from "../../reducers/User"
import {empptyCart} from "../../reducers/Cart"

function Header() {
  const [resTogle , setresTogle ] = useState(false)
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const Menus = [
    {
      name: "home",
      path: '/',

    },
    {
      name: "store",
      path: '/store',
    },
    {
      name: "iphone",
      path: '/iphone',
    },
    {
      name: "ipad",
      path: '/ipad',
    },
    {
      name: "macbook",
      path: '/macbook',
    },
    {
      name: "accessories",
      path: '/accessories',
    }

  ]

  return (
    <>
      <div className='w-full bg-border sticky top-0 z-50'>
        <Container classes="p-3 justify-between md:flex hidden">
          <div className='flex gap-3 items-center'>
            <span>EN</span>
            <FaCaretDown />
            <span>$</span>
            <FaCaretDown />
          </div>
          <div className='flex gap-2 items-center'>
            <FaRegUser />


            {
              user.data == null ? <Link to={"/login"}>Login</Link>:<>
             <Link><span>My Profile</span></Link>
               <IoIosLogOut className='text-xl cursor-pointer hover:text-blue-400' onClick={()=> {
                dispatch(logout())
                dispatch(empptyCart())
                } }/>
             </>
            }
            <IoIosBasket onClick={() => Navigate("/cart")} className='cursor-pointer'/>
            <span onClick={() => Navigate("/cart")} className='cursor-pointer'>{cart.data.length} items</span>
            <span>${parseInt(cart.total)}</span>
            {/* <IoMdSearch /> */}
           
            
          </div>
        </Container>
      </div>
      <div className='w-full px-4 mt-[7vh]'>
        <div className='flex item-center md:justify-center justify-between'>
          <img src="images/logo.svg" alt="" />
          <IoMenu className='text-3xl md:hidden' onClick={() => {setresTogle(true)}}  />
        </div>
        <ul className='md:flex hidden justify-center mt-5 gap-10 uppercase font-semibold'>
          {
            Menus.map((item, i) => {
              return (
                <Link key={i} to={item.path} className=' cursor-pointer hover:text-blue-400  duration-300'> {item.name}</Link>
              )
            })
          }
        </ul>
      </div>
      <div className={`w-full fixed left-[-100%] top-0 h-[100vh] responsive-bg z-10 duration-300 ${resTogle ? "left-[0%]" : ""}`}>
        <div className='w-full mx-auto p-10'>
        <RxCross2 className='text-3xl font-bold mb-5' onClick={() => {setresTogle(false)}}/>
          <div className='w-full flex sm:justify-center gap-3 items-center border-b-2  border-zinc-700 '>
            <IoIosBasket />
            <span>2 items</span>
            <span>$999</span>
            <span>2 items</span>
            <span>$999</span>
            <span>EN</span>
            <FaCaretDown />
            <span>$</span>
            <FaCaretDown />
          </div>
        </div>
          <ul className=' flex flex-col justify-center items-center gap-6 uppercase font-semibold '>
          {
            Menus.map((item, i) => {
              return (
                <Link key={i} to={item.path} className=' cursor-pointer' onClick={() => {setresTogle(false)}}> {item.name}</Link>
              )
            })
          }
          <img src="images/logo.svg" alt=""  className='mt-10 '/>
          </ul>
         
      </div>
    </>
  )
}

export default Header
