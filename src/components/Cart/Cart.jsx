import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [data,setData] = useState([])
  const [price,setPrice] = useState('')
  let {getCart,updateCart,deleteCart,setCartNum} = useContext(CartContext);


  useEffect(()=>{
    (async()=>{
     let data = await getCart()
    // console.log(data)
     setData(data.data.data.products)
     setPrice(data.data.data.totalCartPrice)
    })()
  },[])


   async function removeProduct(id){
   let data =  await deleteCart(id)
   setData(data.data.data.products)
   setCartNum(data.data.numOfCartItems)
  }

   async function updateProduct(id,count){
   let data =  await updateCart(id,count)
   setData(data.data.data.products)
   setCartNum(data.data.numOfCartItems)
  }


  return (
    <div className='container'>
      <h2>Shopping Cart</h2>
      <Link to='/checkout'>
        <button className='btn bg-main text-light'>Online Payment</button>
      </Link>
      <div className="row">
        <div className="col-md-11 bg-main-light shadow p-5 m-auto my-5">
          <div className='d-flex justify-content-between'>
          <h3><span className='text-main fw-bold'>Total Price </span>{price}</h3>
          </div>
          
          {
            data.map((product)=>{
              return <div className="row border-bottom py-5" key={product._id}>
                <div className="col-md-2">
                  <img src={product.product.imageCover} className='w-100' alt="cover" />
                </div>
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{product.product.title}</h5>
                    <p>Price: {product.price}</p>
                    <button onClick={()=>{removeProduct(product.product._id)}} className='btn btn-outline-danger'><i className='fa-regular fa-trash-can'></i> Remove</button>
                  </div>
                  <div>
                  <button onClick={()=>{updateProduct(product.product._id,product.count+1)}} className='btn btn-outline-success'>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={()=>{updateProduct(product.product._id,product.count-1)}} className='btn btn-outline-success'>-</button>

                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}
