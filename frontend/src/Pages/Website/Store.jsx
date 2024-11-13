import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/Website/Container'
import { MainContext } from '../../Main';
import Slider from "react-slick";
import { randomGradient } from '../../helper';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Product from "../../components/Website/Product"
import { CgMenuGridO } from "react-icons/cg";
import { GrMenu } from "react-icons/gr";

function Store() {
  const { apiBaseUrl, fetchProduct, fetchColor, fetchCategory, CategoryBaseUrl, notify } = useContext(MainContext);
  const [product, setProduct] = useState([]);
  const [Category, setCategory] = useState([]);
  const [color, setColor] = useState([])
  const [imgBaseUrl, setImgBaseUrl] = useState({})
  const [ProductImgBaseUrl, setProductImgBaseUrl] = useState([])
  const [grid, setgrid] = useState(true);
  const [limit, setlimit] = useState(5);
  const { category_slug } = useParams()
  const [Usercolor, SetUserColor] = useState(null)
  const [SearchParams] = useSearchParams()

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
          setImgBaseUrl(success.imgBaseUrl)
        }
      ).catch(
        (err) => {
          setCategory([])
        }
      )
    fetchColor()
      .then(
        (success) => {
          setColor(success.data)
        }
      ).catch(
        (err) => {
          setColor([])
        }
      )

  }
  useEffect(
    () => {
      getData()
    }, [])

  const seturlQuery = () => {
    const Urlquery = new URLSearchParams({ limit })
    if (Usercolor != null) {
      Urlquery.append('color', Usercolor)
    }
    const curruntUrl = window.location.pathname;
    const newurl = curruntUrl + "?" + Urlquery.toString()
    window.history.pushState({ path: newurl }, "", newurl)
    localStorage.setItem("pathInfo", newurl)
  }
  useEffect(
    () => {
      seturlQuery()
    }, [limit, Usercolor]
  )
  useEffect(
    () => {
        const Searchlimit = SearchParams.get("limit");
        const SearchColor = SearchParams.get("color");
        if(Searchlimit != null || SearchColor != null){
          if(Searchlimit != null) setlimit(Searchlimit);
          if(SearchColor != null) SetUserColor(SearchColor);
        }
    },[]
  )
  useEffect(
    () => {
      fetchProduct(limit, category_slug , Usercolor)
        .then((success) => {
          setProduct(success.data)
          setProductImgBaseUrl(success.imgBaseUrl)
          
        }).catch((err) => {
          setProduct([])
        })
    }, [limit, category_slug, Usercolor]
  )
  useEffect(
    () => {
      const Lsitem = localStorage.getItem("grid")
      if (Lsitem != undefined) {
        Lsitem == 1 ? setgrid(true) : setgrid(false)
      }
    }, [grid]
  )
  return (
    <Container classes="mt-10">
      <div className='md:grid mx-auto grid-cols-4'>
        <div className='md:block hidden'>
          <div className=' bg-[#F6F7F8]'>
            <ul className='p-4 '>
              <h1 className='text-xl font-semibold mb-2'>Categories</h1>
              {
                Category.map(
                  (cat) => {
                    return (
                      <Link to={`/store/${cat.slug}`}>
                        <li key={cat._id} className='cursor-pointer hover:text-blue-400 duration-300'>{cat.name}</li>
                      </Link>
                    )
                  }
                )
              }
            </ul>
          </div>
          <div className=' bg-[#F6F7F8] mt-2'>
            <ul className='p-4 flex flex-col justify-center'>
              <h1 className='text-xl font-semibold mb-2'>Color</h1>
              {
                color.map(
                  (col) => {
                    return (
                      <Link onClick={() => SetUserColor(col._id)}>
                        <li key={col._id} className={`flex items-center cursor-pointer hover:text-blue-400 duration-300 uppercase ${Usercolor === col._id ? "font-semibold" : ""} `}>
                          <span style={{ background: col.color }} className='p-2 mr-2 rounded '></span>{col.name}</li>
                      </Link>
                    )
                  }
                )
              }
            </ul>
          </div>
        </div>
        <div className=' col-span-3' >
          <SimpleSlider data={Category} apiBaseUrl={apiBaseUrl} imgBaseUrl={imgBaseUrl} />
          <div className=' p-2 shadow mt-5 flex gap-3 bg-[#F6F7F8] mx-5'>
            <div>
              <select name="" id="" className=' focus:outline-none bg-transparent' value={limit} onChange={(e) => setlimit(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>

              </select>
            </div>
            <GrMenu className={`text-xl cursor-pointer ${grid ? "black" : "text-blue-300"}`} onClick={() => {
              setgrid(false)
              localStorage.setItem("grid", 0)
            }} />
            <CgMenuGridO className={`text-xl cursor-pointer ${grid ? "text-blue-300" : 'black'} `} onClick={() => {
              setgrid(true)
              localStorage.setItem("grid", 1)
            }} />
          </div>
          <div className={`${grid ? " grid md:grid-cols-3 grid-cols-2" : ""} gap-3`}>
            <Product data={product} ProductImgBaseUrl={ProductImgBaseUrl} grid={grid} />
          </div>
        </div>
      </div>
    </Container>
  )
}

const SimpleSlider = ({ data, apiBaseUrl, imgBaseUrl }) => {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };
  return (
    <Slider {...settings}>
      {
        data.map(
          (d) => {
            return (
              <div key={d._id} className="relative h-[40vh] slick-bg">
                <div style={{ background: randomGradient() }} className='w-full h-full'>
                  <div className='p-[4vw]'>

                    <h1 className='text-zinc-200 text-4xl uppercase'>{d.name}</h1>
                    <Link to={`/store/${d.slug}`}>
                      <button className='border-2 border-zinc-200 ml-10 mt-10 py-2 px-3 hover:bg-zinc-200 hover:rounded-sm'>Shop now</button>
                    </Link>
                  </div>
                  <img
                    src={`${apiBaseUrl}${imgBaseUrl}${d.image}`}
                    alt=""
                    className="absolute md:h-[15vw] h-[38vw] right-0 bottom-0 object-cover"
                  />
                </div>
              </div>
            );
          }
        )
      }

    </Slider>
  );
}
export default Store

