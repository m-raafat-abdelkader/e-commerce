import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props){
    const [cartNum,setCartNum] = useState(0)
    const BaseUrl = `https://ecommerce.routemisr.com`
    const header = {
        token: localStorage.getItem('userToken')
    }

    function addToCart(id){
        return axios.post(`${BaseUrl}/api/v1/cart`,
        {
            productId:id
        },
        {
          headers:header  
        })
    }

    function getCart(){
        return axios.get(`${BaseUrl}/api/v1/cart`,
        {
          headers:header  
        })
    }

    function updateCart(id,count){
        return axios.put(`${BaseUrl}/api/v1/cart/${id}`,
        {
            count:count
        },
        {
          headers:header  
        })
    }

    function deleteCart(id){
        return axios.delete(`${BaseUrl}/api/v1/cart/${id}`,
        {
          headers:header  
        })
    }

    function checkoutPayment(id,formData){
        return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${id}/?url=http://localhost:3000`,
        {
            shippingAddress: formData
        },
        {
          headers:header  
        })
    }



    return <CartContext.Provider value={{addToCart,cartNum,setCartNum,getCart,updateCart,deleteCart,checkoutPayment}}>
        {props.children}
    </CartContext.Provider>
}
