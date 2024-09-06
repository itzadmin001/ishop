import React from 'react'
import Header from "../../components/Website/Header"
import Footer from "../../components/Website/Footer"
import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Main
