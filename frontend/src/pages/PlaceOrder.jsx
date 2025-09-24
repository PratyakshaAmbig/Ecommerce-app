import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {navigate,backendURL,token, cartItems, setCartItems, getCartAmout,getCartAmount, delivery_fee, products} = useContext(ShopContext)
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

    setFormData(prev =>({
      ...prev,
      [name]:value
    }));
    console.log(formData)
  }

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    try {

      let orderItems = [];

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] >0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo){
              itemInfo.size =item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address:formData,
        items:orderItems,
        // amount:getCartAmout() + delivery_fee,
        amount:getCartAmout()
      }

      switch(paymentMethod){

        // API call for COD
        case 'cod' :
          const response = await axios.post(`${backendURL}/api/order/place`, orderData, {headers:{token}});

          if(response.data.success){
            toast.success(response.data.message);
            setCartItems({});
            navigate('/orders')
          }else{
            toast.error(response.data.message);
          }
          break;
        
        default :
          break;

        case 'stripe':
          const  responseStripe = await axios.post(`${backendURL}/api/order/stripe`,orderData,{headers:{token}})
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data;
            window.location.replace(session_url)
          }
          break;

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* -------------Left Side---------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY "} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email address"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            placeholder="Zipcode"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* ------------Right Side----------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* --------------Payment Method Selection-------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* <div onClick={()=>setPaymentMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-300">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${paymentMethod === 'stripe' ?'bg-green-400':''}`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div> */}
            {/* <div onClick={()=>setPaymentMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-300">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${paymentMethod === 'razorpay'?'bg-green-400':''}`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div> */}
            <div onClick={()=>setPaymentMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-300">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${paymentMethod === 'cod'?'bg-green-400':''}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 texts-sm cursor-pointer">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
