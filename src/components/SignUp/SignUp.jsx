import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function SignUp() {
const [isLoading,setLoading] = useState(false)
const [errMsg,setErr] = useState(null)
let navigate = useNavigate()
// custom validation 
// function validate(values){
//   let errors = {}
//   if(!values.name){
//     errors.name = 'name is required'
//   }
//   else if (values.name.length < 3){
//     errors.name = 'minimum of name chars is 3'
//   } 
//   else if (values.name.length > 10){
//     errors.name = 'maximum of name chars is 10'
//   } 

//   if(!values.email){
//     errors.email = 'email is required'
//   }
//   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
//     errors.email = 'enter a valid email'
//   }

//   if(!values.phone){
//     errors.phone = 'phone is required'
//   }
//   else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
//     errors.phone = 'enter a valid phone'
//   }

//   if(!values.password){
//     errors.password='password is required'
//   }
//   else if(!/^[A-Z][a-z0-9]{6,8}$/.test(values.password)){
//     errors.password= 'enter a valid password'
//   }

//   if(!values.rePassword){
//     errors.rePassword='Confirmation password is required'
//   }
//   else if(values.password !== values.rePassword){
//     errors.rePassword = 'confirmation password is not matched'
//   }
//   return errors

// }

//yup validation 
let validation=Yup.object({
  name: Yup.string().required('name is required').min(3,'min chars are 3').max(10,'max chars are 10'), 
  email: Yup.string().required('email is required').email('enter a valid email'), 
  phone: Yup.string().required('phone is required').matches(/^01[105][0-9]{8}$/,'enter a valid phone number'), 
  password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter a valid password'), 
  rePassword: Yup.string().required('Confirmation password is required').oneOf([Yup.ref('password')],'not matched')
})

  async function SignUp(val){
    // console.log(val)
   setLoading(true)
   let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val).catch((err)=>{
    setErr(err.response.data.message)
    setLoading(false)
   })
   if(data.message == 'success'){
    navigate('/signin')
   }
   setLoading(false)
  
  }
  const formik = useFormik({
    initialValues:{
      name:'', 
      email:'', 
      password:'', 
      rePassword:'', 
      phone:''
    },
    validationSchema:validation,
    onSubmit:SignUp
  })
  
  return (
    <div>
      <h2 className='text-main text-center my-4'>Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
      <div className="container my-3">
      <div className="row gy-3 bg-light shadow p-4">
        <div className="col-md-12">
          <label htmlFor="userName">name:</label>
          <input type="text" id='userName' name='name' onBlur={formik.handleBlur}  value={formik.values.name} className='form-control'  onChange={formik.handleChange}/>
          {
            formik.errors.name && formik.touched.name ? 
            <p className='text-danger'>{formik.errors.name}</p>:''
          }

        </div>
        <div className="col-md-12">
          <label htmlFor="userMail">email:</label>
          <input type="email" id='userMail' name='email' onBlur={formik.handleBlur}  value={formik.values.email}  className='form-control' onChange={formik.handleChange}/>
          {
            formik.errors.email && formik.touched.email? 
            <p className='text-danger'>{formik.errors.email}</p>:''
          }

        </div>
        <div className="col-md-12">
          <label htmlFor="userPass">password:</label>
          <input type="password" id='userPass' name='password'  onBlur={formik.handleBlur} value={formik.values.password} className='form-control' onChange={formik.handleChange}/>
          {
            formik.errors.password && formik.touched.password? 
            <p className='text-danger'>{formik.errors.password}</p>:''
          }
        </div>
        <div className="col-md-12">
          <label htmlFor="userConfirm">rePassword:</label>
          <input type="password" id='userConfirm' name='rePassword' onBlur={formik.handleBlur}  value={formik.values.rePassword} className='form-control'onChange={formik.handleChange} />
          {
            formik.errors.rePassword && formik.touched.rePassword? 
            <p className='text-danger'>{formik.errors.rePassword}</p>:''
          }
        </div>
        <div className="col-md-12">
          <label htmlFor="userPhone">phone:</label>
          <input type="tel" id='userPhone' name='phone' className='form-control' onBlur={formik.handleBlur}  value={formik.values.phone}  onChange={formik.handleChange} />
          {
            formik.errors.phone && formik.touched.phone? 
            <p className='text-danger'>{formik.errors.phone}</p>:''
          }
        </div>
        {
          errMsg !== null ? 
          <p className='text-danger'>{errMsg}</p>:''
        }
        <div className="col-md-12 my-3 text-end">
        <button type='submit' disabled={!(formik.dirty && formik.isValid)} className='btn bg-main text-light'>Register
          {
            isLoading? 
            <span><i className='fa-solid fa-spinner fa-spin mx-2'></i></span>:''
          }
        </button>
      </div>
      <p className='text-muted'>I have an account <Link to='/signin' className='text-main fw-bold'>Login</Link> </p>
      </div>
      </div>
      
      
      </form>
      
    </div>
  )
}
