import React from 'react'
import Products from '../Products/Products'
import Category from '../Category/Category'
import HomeSlider from '../HomeSlider/HomeSlider'
export default function Home() {
  return (
    <div>
      <HomeSlider/>
      <h1 className='text-center my-3'>Category</h1> 
      <Category/>
      <h1 className='text-center mt-5'>Products</h1> 
      <Products/>
    </div>
  )
}
