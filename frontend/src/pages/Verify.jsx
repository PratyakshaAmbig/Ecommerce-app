import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const Verify = () => {
    const {navigate, token, setCartItems, backendURL} = useContext(ShopContext);

    const [searchParam, setSearchParam] = useSearchParams();
    
    const success = searchParam.get('success')
    const orderId = searchParam.get('orderId')

    const verifyPayment = async()=>{
        try {
            if(!token) return null;
            const response = await axios.post(`${backendURL}/api/order/verifyStripe`,{success,orderId},{headers:{token}})

            if(response.data.success){
                setCartItems({});
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[token])
  return (
    <div></div>
  )
}

export default Verify