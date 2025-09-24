import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const {token, setToken, navigate, backendURL} = useContext(ShopContext);

  const [currentState, setCurrentState] = useState('Login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(`${backendURL}/api/user/register`,{name,email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('user_token', response.data.token);
          toast.success('Sign Up Successfully.');
        }
      }else{
        const response = await axios.post(`${backendURL}/api/user/login`,{email,password});
        if(response.data.success){
          setToken(response.data.token);
          console.log(response.data)
          localStorage.setItem('user_token', response.data.token);
          toast.success(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {
        currentState === 'Sign Up' && <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>
      }
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password</p>
        {
          currentState === 'Login'?
          <p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create account</p>
         :<p className='cursor-pointer' onClick={()=>setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login'? 'Sign In' :'Sign Up'}</button>
    </form>
  )
}

export default Login