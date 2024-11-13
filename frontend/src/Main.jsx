import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { createContext } from 'react'
const MainContext = createContext()

function Main(props) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
 const CategoryBaseUrl = process.env.REACT_APP_API_CATEGORY_URL;
 const ColorBaseUrl = process.env.REACT_APP_API_COLOR_URL;
 const ProductBaseUrl = process.env.REACT_APP_API_PRODUCT_URL;
 const UserBaseUrl = process.env.REACT_APP_API_USER_URL;
 const OrderBaseUrl = process.env.REACT_APP_API_ORDER_URL;
 const TransactionBaseUrl  = process.env.REACT_APP_API_TRANSACTION_URL;





//  Payments Modes


 const notify = (msg , flag) => toast(msg ,{type:flag});
 const fetchCategory =  async () => {
    const response = await fetch(apiBaseUrl + CategoryBaseUrl)
    const data = await response.json()
    return data;
 }
 const fetchCategoryById =  async (id) => {
    const response = await fetch(apiBaseUrl + CategoryBaseUrl + "/" + id)
    const data = await response.json()
    return data;
 }
 const fetchColor =  async (id = null) => {
  const api = apiBaseUrl + ColorBaseUrl
  let response = null;
  if(id != null){

    response = await fetch(apiBaseUrl + ColorBaseUrl + "/" + id)
  }else{
    response = await fetch(api)
  }
    const data = await response.json()
    return data;
 }

 const fetchProduct = async (limit = 0, slug = undefined , color = null) => {
  const QueryLimit = new URLSearchParams({limit , slug, color})
  const response = await fetch(apiBaseUrl + ProductBaseUrl + "?" + QueryLimit.toString())
  const data = await response.json()
  return data;
 }
  return (
    <MainContext.Provider value={{apiBaseUrl ,TransactionBaseUrl,OrderBaseUrl,fetchProduct,UserBaseUrl, CategoryBaseUrl , ProductBaseUrl,notify ,ColorBaseUrl, fetchCategory , fetchColor, fetchCategoryById}}>
       <ToastContainer />
      {props.children}
    </MainContext.Provider>
  )
}

export default Main;
export {MainContext};
