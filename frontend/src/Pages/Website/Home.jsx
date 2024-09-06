import React, { useContext, useEffect, useState } from 'react'
import Container from "../../components/Website/Container"
import BlueBanner from './BlueBanner'
import Services from './Services'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product, { Stars } from "../../components/Website/Product"
import { MainContext } from '../../Main'
function Home() {

  const { apiBaseUrl, fetchProduct, fetchColor, fetchCategory, notify } = useContext(MainContext);
  const [product, setProduct] = useState([]);
  const [Category, setCategory] = useState([]);
  const [ProductImgBaseUrl, setProductImgBaseUrl] = useState(null);

  const getData = () => {
    fetchProduct()
      .then((success) => {
        setProduct(success.data)
        setProductImgBaseUrl(success.imgBaseUrl)
      }).catch((err) => {
        setProduct([])
      })
    fetchCategory()
      .then(
        (success) => {
          setCategory(success.data)
        }
      ).catch(
        (err) => {
          setCategory([])
        }
      )

  }
  useEffect(
    () => {
      getData()
    }, [])
  return (
    <>
      <div className='w-full min-h-[70vh]  bg-home relative mt-5'>
        <img src="images/2_corousel.png" alt="" className='absolute sm:right-[10%] right-[0%] h-full' />
      </div>
      <BestSaller Category={Category} product={product} ProductImgBaseUrl={ProductImgBaseUrl} />
      <BlueBanner />
      <Services />
      <SlickSlider />
    </>
  )
}

const BestSaller = ({ Category, product, ProductImgBaseUrl }) => {
  const [SelectCategory , SetselectCategory] = useState(null)
if(SelectCategory != null) {
  product = product.filter(
    (prod) => {
      return  prod.category._id == SelectCategory
    }
  )}
  return (
    <>
      <Container classes="text-center">
        <h2 className='text-3xl mt-5 uppercase mb-5'>Best Seller</h2>
        <ul className='hidden md:flex item-center justify-center gap-5'>
          <li onClick={() => SetselectCategory(null)} className=' cursor-pointer  hover:text-blue-400  duration-300'>All</li>
          {
            Category.map((c, i) => {
              return (
                <li className='cursor-pointer  hover:text-blue-400  duration-300' key={i} onClick={() => SetselectCategory(c._id)}>{c.name}</li>
              )
            })
          }
        </ul>
        <ul>
          <form className="md:hidden max-w-sm mx-auto">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Select an option</label>
            <select defaultValue={""} onChange={(e) => SetselectCategory(e.target.value == "" ? null : e.target.value)} id="countries" class="bg-white border  border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-auto mx-auto p-2.5">
              <option selected value="">All</option>
              {
                 Category.map((c, i) => {
                  return (
                    <option value={c._id} key={i} >{c.name}</option>
                  )
                })
              }
             
            </select>
          </form>
        </ul>
        <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3'>
                <Product data={product} ProductImgBaseUrl={ProductImgBaseUrl} grid={true}/>
        </div>
        <h1 className='text-blue-400 font-semibold mt-20 underline'>Load More...</h1>

      </Container>
    </>
  )
}

const SlickSlider = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const product = [
    {
      name: "Beats Solo 2 On Ear Headphones - Black",
      img: "beats_solo_2",
      star: 3,
      price: "$499",
      actual_price: "$299"
    },
    {
      name: "H-Squared tvTray",
      img: "H-squared",
      star: 4,
      price: "$199",
      actual_price: "$99"
    },
    {
      name: "Netatmo Rain Gauge",
      img: "Netatmo_rain",
      star: 3,
      price: "$198",
      actual_price: "$299"
    },
    {
      name: "Beats Solo 2 On Ear Headphones - Black",
      img: "beats_solo_2",
      star: 3,
      price: "$499",
      actual_price: "$299"
    },
    {
      name: "H-Squared tvTray",
      img: "H-squared",
      star: 4,
      price: "$199",
      actual_price: "$99"
    },
    {
      name: "Netatmo Rain Gauge",
      img: "Netatmo_rain",
      star: 3,
      price: "$198",
      actual_price: "$299"
    }
  ]
  return (
    <>
      <h1 className='text-3xl mt-20 text-center'>FEATURED PRODUCTS</h1>
      <Container classes="mt-20" >
        <div className="slider-container">
          <Slider {...settings}>
            {
              product.map((p, i) => {
                return (
                  <div className='rounded slider p-3' key={i}>
                    <img src={`images/${p.img}.png`} alt="" />
                    <div className='flex flex-wrap'>
                      <h3 className='text-[14px] font-semibold'>{p.name}</h3>
                      <div className='flex w-full'>
                        <Stars yellow={p.star} />
                      </div>
                      <h3 className='mr-2 font-semibold'>{p.price}</h3>
                      <h3 className=' line-through text-zinc-400'>{p.actual_price}</h3>
                    </div>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </Container>
    </>
  );
}

export default Home
