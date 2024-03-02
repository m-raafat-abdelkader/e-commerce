import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserToken } from '../../context/TokenContext'
import { CartContext } from '../../context/CartContext'
export default function Navbar() {
let {cartNum,getCart,setCartNum} = useContext(CartContext) 
let {userToken,setToken} = useContext(UserToken)

let navigate = useNavigate()
let logout = ()=>{
  localStorage.removeItem('userToken')
  setToken(null)
  navigate('/signin')
}

useEffect(()=>{
  (async()=>{
   let data = await getCart()
   setCartNum(data.data.numOfCartItems)
  })()  
},[])


  return (
   <nav className="navbar navbar-expand-sm navbar-light bg-light fw-bold">
  
    <a className="navbar-brand" href="#"><i className="fa-solid fa-cart-shopping text-main "></i> <span className='fw-bold'>FreshCart</span></a>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">
      {
        userToken !== null?
        <ul className="navbar-nav m-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="product">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="category">Category</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>
        
        
      </ul>:''
      }
      
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        {
          userToken == null? <>
          <li className="nav-item">
          <Link className="nav-link" to="signup">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="signin">Login</Link>
        </li>
          </>:''
        }
        

        {
          userToken !== null? <>
        <li className="nav-item d-flex align-items-center">
        <i className="fa-brands fa-facebook mx-1"></i>   
        <i className="fa-brands fa-twitter mx-1"></i>   
        <i className="fa-brands fa-instagram mx-1"></i>   
        <i className="fa-brands fa-linkedin mx-1"></i>   
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="cart">
            <i className='fa-solid fa-shopping-cart text-main fs-5'></i>
            <span className='badge bg-main text-light'>{cartNum}</span>
          </Link>
        </li>
        <li onClick={logout} className="nav-item">
          <Link className="nav-link">Logout</Link>
        </li>
        </>:''
        }
        
        
      </ul>
      
    </div>
 
</nav>

    
  )
}
