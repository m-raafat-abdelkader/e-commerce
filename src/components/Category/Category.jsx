import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function Category() {
  const api = `https://ecommerce.routemisr.com/api/v1/`
  const [categoryList,setCategory] = useState([])
  async function getCategory(){
    let {data} = await axios.get(`${api}categories`)
    setCategory(data.data)
  }
  useEffect(()=>{
    getCategory()
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <div>
       <Slider {...settings} >
        {
          categoryList.map((category,i)=>{
            return <div key={i}>
              <img src={category.image} alt="slide" className='w-100' height={300} />
              <p className='text-muted'>{category.name}</p>
            </div>
          })
        }
       </Slider>
    </div>
  )
}
