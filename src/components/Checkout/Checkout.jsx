import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CartContext } from '../../context/CartContext';

export default function Checkout() {
  let {checkoutPayment,getCart}=useContext(CartContext)
    const [isLoading,setLoading] = useState(false)
    const [errMsg,setErr]= useState(null)
    const [cartId,setCartId]=useState('')
  
  useEffect(()=>{
    (async ()=>{
     let data = await getCart();
    //  console.log(data.data.data._id)
     setCartId(data.data.data._id)
    // setCartId()
    })()
    },[])
    
    
    async function payment(val){
    // console.log(val) object 
    let data =await checkoutPayment(cartId,val)
    console.log(data.data)
    if(data.data.status == 'success'){
    window.location=data.data.session.url
    }
    }
    
    let formik =useFormik({
    initialValues:{
    details:'',
    city:'',
    phone:'',
    },
    onSubmit:payment
    })
    
      return (
        <div className='my-5'>
        <h1 className='text-main text-center'>Payment Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
          <div className="col-md-8 m-auto  bg-light shadow p-4">
          <div className="row  gy-4">
          <div className="col-md-12">
            <label htmlFor='userEmail'>details</label>
            <input type='text' id='userEmail' value={formik.values.details} name="details" onChange={formik.handleChange}  className='form-control'/>
          </div>
       
          <div className="col-md-12">
            <label htmlFor='urCity'>city</label>
            <input type='text' id='urCity'  value={formik.values.city} name="city" onChange={formik.handleChange}  className='form-control'/>
          </div>
          <div className="col-md-12">
            <label htmlFor='urPhone'>phone</label>
            <input type='tel' id='urPhone'  value={formik.values.phone} name="phone" onChange={formik.handleChange}  className='form-control'/>
          </div>
      
          <div className="col-md-12 text-end my-2">
          <button  type='submit' className='btn bg-main text-light'>Pay
  
          </button>
          </div>
          </div>
          </div>
         
          </div>
        </form>
        </div>
      )
  }
  