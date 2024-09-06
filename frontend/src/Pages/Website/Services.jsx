import React from 'react'
import Container from '../../components/Website/Container'

function Services() {
    const Service = [
        {
            name: "FREE SHIPPING",
            img: "shipping",
            des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
        },
        {
            name: "100% REFUND",
            img: "refund",
            des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
        },
        {
            name: "SUPPORT 24/7",
            img: "support",
            des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
        }

    ]
    return (
        <Container classes=" grid md:grid-cols-3 sm:grid-cols-2 gap-6 justify-center items-center mt-10">
            {
                Service.map((item, i) => {
                    return (
                        <div className='shadow md:w-[26vw] sm:w-[44vw] w-[72vw] p-5 rounded mx-auto' key={i}>
                            <img src={`images/${item.img}.svg`} alt="" className='mx-auto mb-4' />
                            <div className='text-center'>
                                <h1 className=' uppercase mb-2'>{item.name}</h1>
                                <p>{item.des}</p>
                            </div>
                        </div >
                    )
                })
            }
        </Container>
    )
}

export default Services
