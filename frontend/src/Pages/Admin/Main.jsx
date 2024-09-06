import React from 'react'
import Header from '../../components/Admin/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Admin/Sidebar'

function Main() {
    return (
        <>
            <div className='grid grid-cols-5 min-h-screen'>
                <Sidebar />
                <div className='col-span-4'>
                    <Header />
                    <div className='p-3'>
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Main
