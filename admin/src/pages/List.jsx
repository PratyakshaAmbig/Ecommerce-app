import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [listItems, setListItem] = useState([]);

  const fecthList = async()=>{
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if(response.data.success){
        setListItem(response.data.products);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const removeProduct = async (productId)=>{
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${productId}`,{headers:{token}},);
      if(response.data.success){
        toast.success(response.data.message);
        await fecthList();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(()=>{
    fecthList();
  },[])

  return (
   <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* ---------List Table Title-------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ---------------Products List------------ */}

        {
          listItems.map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm border-gray-100'>
              <img className='w-12' src={item.image[0]} alt=''/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }

      </div>
   </>
  )
}

export default List