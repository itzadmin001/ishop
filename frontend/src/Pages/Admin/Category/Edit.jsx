import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from '../../../components/Admin/Card'
import Bradcrumbs from "../../../components/Admin/Bradcrumbs"
import { MainContext } from '../../../Main';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '../../../components/Admin/LoadingButton';

function Edit() {
  const Navigate = useNavigate()
  const { id } = useParams()
  const [UpdateData, SetUpdateData] = useState(null)
  const { apiBaseUrl, CategoryBaseUrl, notify, fetchCategoryById } = useContext(MainContext);
  const [Loading , SetLoading] = useState(false)

   useEffect(() => {
    fetchCategoryById(id)
     .then((success) => {
      if(success.status === 1) {
        SetUpdateData(success.data)
      }else{
        SetUpdateData(null)
      }
    }).catch((err) => {
        console.log(err)
      })
  }, [id])
  
  const titleref = useRef();
  const Slugref = useRef();
  const Bradcrumb = [
    {
      name: "Category",
      path: "/admin/category/view"
    },
    {
      name: "Edit",
      path: "/admin/category/edit"
    }
  ]
  const fromSubmitHandler = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const slug = e.target.slug.value;
    const image = e.target.image.files[0];
    if (name != " " && slug != "") {
      const formdata = new FormData()
      formdata.append("name", name);
      formdata.append("slug", slug);
      formdata.append("old_image", UpdateData.image);
      formdata.append("image", image);
      axios.put(apiBaseUrl + CategoryBaseUrl + "/update/" + id , formdata, {
        withCredentials: true
      })
        .then((success) => {
          if (success.data.status === 1) {
            notify(success.data.msg, success.data.status ? "success" : "error");
            e.target.reset();
            Navigate("/admin/category/view");
          } else {
            notify("error");
          }

        }).catch((error) => {
          console.error(error)
          notify("Internal server error", "error");

        })
    } else {

    }


  }
  const titleToSlug = (value) => {
    const slug = value.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
    return slug;
  };
  return (
    <Card>
      <Bradcrumbs Bradcrumb={Bradcrumb} />
      <div className="w-full max-w-full p-4 mt-5 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={fromSubmitHandler} encType='multipart/form-data'>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="name"
              name="name"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter name"
              required=""
              value={UpdateData?.name}
              onChange={(e) => {
                SetUpdateData({
                  ...UpdateData,
                  slug: titleToSlug(e.target.value),
                name : e.target.value
                })
              }}
              ref={titleref}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Slug
            </label>
            <input
              type="slug"
              name="slug"
              ref={Slugref}
              value={UpdateData?.slug}
              readOnly
              placeholder='Slug'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            />
          </div>
          
         <LoadingButton Loading={Loading} SetLoading={SetLoading} name={"Update"}/>
        </form>
      </div>


    </Card>
  )
}

export default Edit;
