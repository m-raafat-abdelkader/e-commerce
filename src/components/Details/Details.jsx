import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

export default function Details() {
  let {addToCart,setCartNum} = useContext(CartContext)
  async function addToMyCart(id){
   let {data} =  await addToCart(id)
   if(data.status =='success'){
    toast.success(data.message);
    setCartNum(data.numOfCartItems)
   }
   console.log(data)
  }

  const [productDetails,setProduct] = useState(null)
  let obj = useParams()
  let productId = obj.id
  async function getProduct(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    setProduct(data.data)
    }
   
  useEffect(()=>{
    getProduct() 
  },[])
  return (
    <div className="container my-3">
      <div className="row align-items-center">
        <div className="col-md-3">
          <img className='w-100' src={productDetails?.imageCover} alt="" />
        </div>
        <div className="col-md-9">
          <div>
            <h2>{productDetails?.title}</h2>
            <p>{productDetails?.description}</p>
          </div>
          <div>
            <p>{productDetails?.category.name}</p>
            <p><span className='text-main'>Price: </span>{productDetails?.price}</p>
            <button onClick={()=>{addToMyCart(productDetails._id)}}  className='btn bg-main text-light w-100'>Add To Cart</button>
         </div>
        </div>
      </div>
    </div>
   
  )
}
