import React from 'react'
import Container from './Container'

function Footer() {

  const info = [
    {
      heading: "About Us",

    },
    {
      heading: "information",
    },
    {
      heading: "Privacy policy",
    },
    {
      heading: "terms and conditions"
    }
  ]
  return (
    <Container classes=" md:block hidden  p-2 mt-20 ">
      <div className='w-full p-5 grid  grid-cols-3 '>
        <div>
          <img src="images/ishop.svg" alt="" />
          <div className='mt-5'>
            <p className='text-sm text-zinc-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.</p>
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-semibold '>Follow Us</h1>
          <div className='mt-2 '>
            <p className='text-sm  text-zinc-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.</p>
            <div className='flex  gap-5 mt-2'>
              <img src="images/facebook.svg" alt="" />
              <img src="images/twitter.svg" alt="" />
            </div>
          </div>
        </div>
        <div className='mt-2'>
          <h1 className='text-2xl font-semibold'>Contact us</h1>
          <div>
            <p className='text-sm  text-zinc-500'>iShop: address @building 124 Call us now: 0123-456-789 Email: support@whatever.com</p>
          </div>
        </div>
      </div>
      <hr />
      <div className='w-full grid grid-cols-4'>
      {
        info.map((item, i) => {
          return (
            <div className='mt-5 p-2 ' key={i}>
              <h1 className='font-semibold mb-5'>{item.heading}</h1>
              <ul className='text-zinc-500'>
                <li>About us</li>
                <li>Information</li>
                <li>Privacy policy</li>
                <li>terms & Condition</li>
              </ul>
            </div>
          )
        })
      }
      </div>
    </Container>
  )
}

export default Footer
