import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from '../../../components/Admin/Card'
import Bradcrumbs from '../../../components/Admin/Bradcrumbs'
import LoadingButton from "../../../components/Admin/LoadingButton"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MainContext } from '../../../Main';
import axios from 'axios';

function Add() {
  const { apiBaseUrl, CategoryBaseUrl, fetchColor,fetchCategory, ProductBaseUrl,notify } = useContext(MainContext);
  const [Loading, SetLoading] = useState(false)
  const [colors, SetColor] = useState([])
  const [category, SetCategory] = useState([])
const [SelectCategory, SetSelectCategory] = useState(null)
const [SelectColor , SetSelectColor] = useState([])


  const animatedComponents = makeAnimated();



  const titleRef = useRef()
  const Slugref = useRef()
  const PriceRef = useRef()
  const DisPresentRef = useRef()
  const DiscountRef = useRef()
  const Bradcrumb = [
    {
      name: "Product",
      path: "/admin/product/view"
    },
    {
      name: "Add",
      path: "/admin/product/Add"
    }
  ]
  useEffect(
    () => {
      fetchColor()
        .then(
          (success) => {
            SetColor(success.data)
          }).catch(
            (err) => {
              SetColor([])
            })
      fetchCategory()  
      .then(
        (success) =>{
         SetCategory(success.data)
        }
      ).catch(
        (err) => {
          SetCategory([])
        }
      )   
    }, [])
    
  const fromSubmitHandler = (e) => {
    e.preventDefault()
    const name = e.target.name.value ;
    const slug = e.target.slug.value;
    const price = e.target.price.value;
    const discount_percent = e.target.discount_price.value;
    const discount_price = DiscountRef.current.value;
    const image = e.target.image.files[0];
    if(name != "" && slug != "" && price != "" && discount_price != "" && image != undefined){
      const formdata = new FormData()
      formdata.append("name", name)
      formdata.append("slug", slug)
      formdata.append("price", price)
      formdata.append("discount_Price", discount_price)
      formdata.append("category", SelectCategory.value)
      const cArr = SelectColor.map(c => c.value) 
      formdata.append("color", JSON.stringify(cArr))
      formdata.append("image", image)
      axios.post(apiBaseUrl +  ProductBaseUrl + "/create" , formdata , {
        withCredentials: true
      })
      .then(
        (success) => {
          notify(success.data.msg, success.data.status ?  "success" : "error")
            if(success.data.status === 1 ){
              e.target.reset();
              SetLoading(false);
              SetSelectCategory(null)
              SetSelectColor([])

            }else{

            }
        }
      ).catch(
        (error) => {
          console.log(error)
          notify("internal server error", "error");
        }
      )
    }else{
      notify("complete the filed ")
    }

  }
  const titleToSlug = () => {
    const slug = titleRef.current.value.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
    Slugref.current.value = slug;
  };
  const Categoryhandler = (selecteOption) => {
    SetSelectCategory(selecteOption)
  }
  const ColorHandler = (options) => {
    SetSelectColor(options)
  }
  const calculatePrice = () => {
      const dis = (PriceRef.current.value * DisPresentRef.current.value) / 100
      DiscountRef.current.value = PriceRef.current.value - dis;
  }

  return (
    <Card>
      <Bradcrumbs Bradcrumb={Bradcrumb} />
      <div className="w-full max-w-full p-4 mt-5 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-200">
        <form className="space-y-6" onSubmit={fromSubmitHandler} encType='multipart/form-data'>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Name
              </label>
              <input
                type="name"
                name="name"
                onChange={titleToSlug}
                ref={titleRef}
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter name"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="slug"
                className="block mb-2 text-sm font-medium text-black"
              >
                Slug
              </label>
              <input
                type="slug"
                name="slug"
                readOnly
                ref={Slugref}
                placeholder='Slug'
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required=""
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-black"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                min={1}
                placeholder='Price'
                onChange={calculatePrice}
               ref={PriceRef}
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="discount"
                className="block mb-2 text-sm font-medium text-black"
              >
                Discount Percent %
              </label>
              <input
                type="number"
                name="discount_price"
                max={99}
                onChange={calculatePrice}
                ref={DisPresentRef}
                placeholder='Discount Percent'
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="discountPrice"
                className="block mb-2 text-sm font-medium text-black"
              >
                Discount Price
              </label>
              <input
                type="number"
                ref={DiscountRef}
                name="discount_price"
                readOnly
                placeholder='Discount Price'
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required=""
              />
            </div>
          </div>
          <div className='grid grid-cols-2'>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-black"
              >
                Category
              </label>
              <Select
              value={SelectCategory}
                 className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                onChange={Categoryhandler}
                components={animatedComponents}
                options={
                  category.map((cat, i) => {
                    return (
                      { value: cat._id, label: cat.name }
                    )
                  })
                }
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-black"
              >
                Color
              </label>
              <Select
                 className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={SelectColor}
                onChange={ColorHandler}
                options={
                  colors.map((color, i) => {
                    return (
                      { value: color._id, label: color.name }
                    )
                  })
                }
              />
            </div>
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-black"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              placeholder="Upload Image"
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required=""
            />
          </div>
          <LoadingButton Loading={Loading} SetLoading={SetLoading} name={"Save"} />
        </form>

      </div>
    </Card>
  )
}

export default Add
