import React, { Children, useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { IoCaretDown } from "react-icons/io5";
import { IoIosColorPalette } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { GrTransaction } from "react-icons/gr";
import { MdLocalShipping } from "react-icons/md";
function Sidebar() {
    const [active , Setactive ] = useState(null);
    const menu = [
        {
            name: "Dashboard",
            icon: <MdDashboard />,
            url: "/admin",
            Children:[]

        },
        {
            name: "Transactions",
            icon: <GrTransaction />,
            url: "/admin/transactions",
            Children:[]

        },
        {
            name: "Orders",
            icon: <MdLocalShipping />,
            url: "/admin/order",
            Children:[]

        },
        {
            name: "Category",
            icon: <BiSolidCategoryAlt />,
            url: null,
            Children: [
                {
                    name: "Add",
                    url: "/admin/category/add"
                },
                {
                    name: "View",
                    url: "/admin/category/view"
                }
            ]
        },
        {
            name: "Products",
            icon: <AiFillProduct />,
            url: null,
            Children: [
                {
                    name: "Add",
                    url: "/admin/product/add"
                },
                {
                    name: "View",
                    url: "/admin/product/view"
                }

            ]


        },
        {
            name: "Colors",
            icon: <IoIosColorPalette />,
            url: null,
            Children:[
                {
                    name: "Add",
                    url: "/admin/color/add"
                },
                {
                    name: "View",
                    url: "/admin/color/view"
                }
            ]
        },
        {
            name: "Account Settings",
            icon: < IoMdSettings/>,
            url: null,
            Children:[]
        }
    ]
    return (
        <div className='bg-purple-500 min-h-screen'>
            <h1 className='text-white font-semibold text-3xl text-center py-3'>Admin panel</h1>
            <hr />
            <ul className='text-white text-xl '>
               { menu.map((item,i) =>{
                    return (
                        <Listitem data={item} Setactive={Setactive} active={active} key={i} index={i}/>
                    )
                })}
            </ul>
        </div>
    )
}

const Listitem = ({data , active ,Setactive , index}) => {
    return(
        <>
        {
            data.Children.length == 0 ? <Link to={data.url} className='ml-2 px-2  select-none flex gap-2 items-center py-2 cursor-pointer text-zinc-200 hover:text-white' onClick={()=> Setactive(index)}>
            <span>{data.icon }</span> {data.name}</Link>
            :
            <div className='relative flex items-center  flex-wrap justify-between px-2 select-none'>
            <li className='  ml-2 flex gap-2 items-center py-2 text-zinc-200 hover:text-white cursor-pointer ' onClick={() => {
                
                if(active === index){

                    Setactive(null)
                }else{

                    Setactive(index)
                }
                }}><span>{data.icon }</span> {data.name} <IoCaretDown className={`${active === index ? "rotate-180 , duration-300" : "rotate-0 , duration-300"}`}/></li>
                <ul className={`flex flex-col w-[100%] py-2 px-2 rounded bg-white text-zinc-600 item-center ${active === index ? "block" : "hidden"}`}>
                    {
                        data.Children.map((child,i) => {
                            return <Link key={i}  to={child.url} onClick={(e) => e.stopPropagation()}>{child.name}</Link>
                        })
                    }
                </ul>
            </div>
        }
        
        
        </>
    )
}
export default Sidebar
