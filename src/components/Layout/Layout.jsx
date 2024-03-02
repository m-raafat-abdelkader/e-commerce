import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { UserToken } from '../../context/TokenContext'
export default function Layout() {
 let {setToken} = useContext(UserToken); 
 useEffect(()=>{
  if(localStorage.getItem('userToken') !== null){
    setToken(localStorage.getItem('userToken'))
  }
 },[])
  return (
    <div>
      <Navbar/>
      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}
