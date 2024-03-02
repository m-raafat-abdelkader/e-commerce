import axios from 'axios'
import React from 'react'
import { Circles } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Brands() {
  const api = `https://ecommerce.routemisr.com/api/v1/`
  async function getBrands(){
    return await axios.get(`${api}brands`)
  }
  
 let {data,isLoading} =  useQuery('brands',getBrands)
 
  return (
    <div className='row'>
      {
        !isLoading?
        <>
        {data?.data.data.map((brand)=>{
          return <div className="col-md-3" key={brand._id}>
            <img className='w-100' src={brand.image} alt="image" />
            <p className='text-muted text-center'>{brand.name}</p>
          </div>
        })}
        </>: 
         <div className='vh-100 d-flex justify-content-center align-items-center'>
         <Circles
 height="80"
 width="80"
 color="#4fa94d"
 ariaLabel="circles-loading"
 wrapperStyle={{}}
 wrapperClass=""
 visible={true}
 />
       </div>
        
      }
    </div>
  )
}
