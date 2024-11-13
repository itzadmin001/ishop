import React from 'react'
import NavigateBtn from './NavigateBtn'

function BlueBanner() {
  return (
    <div className='w-full min-h-[60vh]  bg-banner relative mt-5  text-zinc-200 flex flex-col sm:justify-center '>
      <div className='ml-[12vw] flex flex-col sm:justify-center  gap-3'>
        <h1 className='sm:text-5xl text-5xl'>iPhone 6 Plus</h1>
        <p className='sm:text-xl text-sm'>Performance and design. Taken right to the edge.</p>

    <NavigateBtn data={"SHOP NOW"}/>
      </div>
    <img src="images/iphone_6_plus.png" alt="" className='absolute sm:right-[5%] right-[0%] md:bottom-0 sm:bottom-0 bottom-0 lg:h-[500px] md:h-[400px]  h-[40vh]' />
  </div>
  
  
  )
}

export default BlueBanner
