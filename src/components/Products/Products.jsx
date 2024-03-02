import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

export default function Products() {
  let {addToCart,setCartNum} = useContext(CartContext)
  async function addToMyCart(id){
   let {data} =  await addToCart(id)
   if(data.status =='success'){
    toast.success(data.message);
    setCartNum(data.numOfCartItems)
   }
   
   console.log(data)
  }


  async function getProducts(){
  return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
 
  }

  let {data} =  useQuery('products',getProducts)

  return (
    <div className='row gy-3'>
      {
        data?.data.data.length > 0 ?  <>
        {
          data?.data.data.map((product)=>{
            return <div className="col-md-3" key={product._id}>
              <div className="product p-5">
                <Link to={`/details/${product._id}`}>
                <img src={product.imageCover} alt={product.title} className='w-100' />
                <p className='text-main'>{product.category.name}</p>
                <h6>{product.title}</h6>
                <div className='d-flex justify-content-between'>
                  <p>{product.price} EGP</p>
                  <p><i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage}</p>
                </div>
                </Link>
                
                <button onClick={()=>{addToMyCart(product._id)}} className='btn bg-main text-light w-100'>Add to Cart</button>
              </div>
            </div>
          })
        }
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
