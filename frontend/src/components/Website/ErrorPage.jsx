import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className=' w-full h-screen  flex flex-col justify-center items-center gap-3'>
     <span className='text-9xl'> 404</span>
      <div>

      <Link to={"/"} className='bg-blue-500 p-3 hover:px-4 hover:py-2  rounded-md text-white hover:text-zinc-200 hover:bg-zinc-800 duration-300'>Back to Home</Link>
      </div>
    </div>
  )
}

export default ErrorPage
